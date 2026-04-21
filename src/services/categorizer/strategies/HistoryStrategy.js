import { CategorizerStrategy } from './CategorizerStrategy';

const STORAGE_KEY = "expense-tracker-category-history";
const MAX_HISTORY_ITEMS = 100;
const SIMILARITY_THRESHOLD = 0.6;

export class HistoryStrategy extends CategorizerStrategy {
  constructor() {
    super('history', 100);
    this.history = null;
  }

  loadHistory() {
    if (this.history !== null) return this.history;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.history = JSON.parse(stored);
      } else {
        this.history = {};
      }
    } catch (error) {
      console.error("Failed to load category history:", error);
      this.history = {};
    }
    
    return this.history;
  }

  saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history));
    } catch (error) {
      console.error("Failed to save category history:", error);
    }
  }

  cleanOldHistory() {
    const history = this.loadHistory();
    const entries = Object.entries(history);
    
    if (entries.length <= MAX_HISTORY_ITEMS) return;
    
    entries.sort((a, b) => b[1].count - a[1].count);
    const keptEntries = entries.slice(0, MAX_HISTORY_ITEMS);
    
    this.history = {};
    keptEntries.forEach(([key, value]) => {
      this.history[key] = value;
    });
    
    this.saveHistory();
  }

  calculateSimilarity(str1, str2) {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();
    
    if (s1 === s2) return 1.0;
    if (s1.includes(s2) || s2.includes(s1)) return 0.85;
    
    let matches = 0;
    const minLength = Math.min(s1.length, s2.length);
    
    for (let i = 0; i < minLength; i++) {
      if (s1[i] === s2[i]) matches++;
    }
    
    for (let i = 0; i < s1.length - 1; i++) {
      const bigram = s1.substring(i, i + 2);
      if (s2.includes(bigram)) matches += 0.5;
    }
    
    return matches / Math.max(s1.length, s2.length);
  }

  canCategorize(title) {
    return title && title.trim().length > 0;
  }

  async categorize(title) {
    if (!title || title.trim() === '') {
      return null;
    }

    const history = this.loadHistory();
    const normalizedTitle = title.toLowerCase().trim();
    
    if (history[normalizedTitle]) {
      return {
        category: history[normalizedTitle].category,
        confidence: 0.95,
        strategy: this.name,
        matchType: 'exact',
        count: history[normalizedTitle].count
      };
    }
    
    let bestMatch = null;
    let bestScore = 0;
    
    for (const [storedTitle, data] of Object.entries(history)) {
      const similarity = this.calculateSimilarity(normalizedTitle, storedTitle);
      
      if (similarity > SIMILARITY_THRESHOLD && similarity > bestScore) {
        bestScore = similarity;
        bestMatch = {
          category: data.category,
          confidence: similarity * 0.8,
          strategy: this.name,
          matchType: 'similar',
          matchedTitle: storedTitle,
          similarity: similarity
        };
      }
    }
    
    return bestMatch;
  }

  learn(title, category) {
    if (!title || title.trim() === '') return;
    
    const history = this.loadHistory();
    const normalizedTitle = title.toLowerCase().trim();
    
    if (history[normalizedTitle]) {
      history[normalizedTitle].count++;
      history[normalizedTitle].lastUsed = Date.now();
      
      if (history[normalizedTitle].category !== category) {
        if (!history[normalizedTitle].alternatives) {
          history[normalizedTitle].alternatives = {};
        }
        
        const oldCategory = history[normalizedTitle].category;
        history[normalizedTitle].alternatives[oldCategory] = 
          (history[normalizedTitle].alternatives[oldCategory] || 0) + 
          (history[normalizedTitle].count - 1);
        
        history[normalizedTitle].category = category;
        history[normalizedTitle].count = 1;
      }
    } else {
      history[normalizedTitle] = {
        category: category,
        count: 1,
        lastUsed: Date.now(),
        alternatives: {}
      };
    }
    
    this.cleanOldHistory();
    this.saveHistory();
  }

  clearHistory() {
    this.history = {};
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear category history:", error);
    }
  }

  getHistory() {
    return { ...this.loadHistory() };
  }
}
