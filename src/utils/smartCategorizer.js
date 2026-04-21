import { CATEGORY_KEYWORDS } from "../constants/categoryKeywords";
import { CATEGORY_OPTIONS } from "../constants/categories";

const STORAGE_KEY = "expense-tracker-category-history";
const MAX_HISTORY_ITEMS = 100;

let categoryHistory = null;

const loadHistory = () => {
  if (categoryHistory !== null) return categoryHistory;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      categoryHistory = JSON.parse(stored);
    } else {
      categoryHistory = {};
    }
  } catch (error) {
    console.error("Failed to load category history:", error);
    categoryHistory = {};
  }
  
  return categoryHistory;
};

const saveHistory = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categoryHistory));
  } catch (error) {
    console.error("Failed to save category history:", error);
  }
};

const cleanOldHistory = () => {
  const history = loadHistory();
  const entries = Object.entries(history);
  
  if (entries.length <= MAX_HISTORY_ITEMS) return;
  
  entries.sort((a, b) => b[1].count - a[1].count);
  const keptEntries = entries.slice(0, MAX_HISTORY_ITEMS);
  
  categoryHistory = {};
  keptEntries.forEach(([key, value]) => {
    categoryHistory[key] = value;
  });
  
  saveHistory();
};

export const learnCategory = (title, category) => {
  if (!title || title.trim() === "") return;
  
  const history = loadHistory();
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
  
  cleanOldHistory();
  saveHistory();
};

export const getLearnedCategory = (title) => {
  if (!title || title.trim() === "") return null;
  
  const history = loadHistory();
  const normalizedTitle = title.toLowerCase().trim();
  
  if (history[normalizedTitle]) {
    return history[normalizedTitle].category;
  }
  
  return null;
};

const calculateSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
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
};

export const findSimilarCategory = (title, threshold = 0.6) => {
  if (!title || title.trim() === "") return null;
  
  const history = loadHistory();
  const normalizedTitle = title.toLowerCase().trim();
  
  let bestMatch = null;
  let bestScore = 0;
  
  for (const [storedTitle, data] of Object.entries(history)) {
    const similarity = calculateSimilarity(normalizedTitle, storedTitle);
    
    if (similarity > threshold && similarity > bestScore) {
      bestScore = similarity;
      bestMatch = data.category;
    }
  }
  
  return bestMatch;
};

export const keywordCategorize = (title) => {
  if (!title || title.trim() === "") {
    return "Other";
  }

  const lowerTitle = title.toLowerCase();

  for (const category of CATEGORY_OPTIONS) {
    if (category === "Other") continue;

    const keywords = CATEGORY_KEYWORDS[category] || [];
    for (const keyword of keywords) {
      if (lowerTitle.includes(keyword.toLowerCase())) {
        return category;
      }
    }
  }

  return "Other";
};

export const smartCategorize = (title) => {
  const learnedCategory = getLearnedCategory(title);
  if (learnedCategory) {
    return learnedCategory;
  }
  
  const similarCategory = findSimilarCategory(title);
  if (similarCategory) {
    return similarCategory;
  }
  
  return keywordCategorize(title);
};

export const clearCategoryHistory = () => {
  categoryHistory = {};
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear category history:", error);
  }
};

export const getCategoryHistory = () => {
  return { ...loadHistory() };
};
