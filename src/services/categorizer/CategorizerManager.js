import { CategorizerStrategy } from './strategies/CategorizerStrategy';
import { HistoryStrategy } from './strategies/HistoryStrategy';
import { KeywordStrategy } from './strategies/KeywordStrategy';
import { LLMStrategy } from './strategies/LLMStrategy';
import { CATEGORY_OPTIONS } from '../../constants/categories';

export class CategorizerManager {
  constructor(options = {}) {
    this.strategies = [];
    this.defaultCategory = options.defaultCategory || 'Other';
    this.categories = options.categories || CATEGORY_OPTIONS;
    this._initialized = false;
  }

  initialize() {
    if (this._initialized) return;

    this.addStrategy(new HistoryStrategy());
    this.addStrategy(new KeywordStrategy());
    
    const llmStrategy = LLMStrategy.fromSavedConfig();
    if (llmStrategy.isEnabled()) {
      this.addStrategy(llmStrategy);
    }

    this._initialized = true;
  }

  addStrategy(strategy) {
    if (!(strategy instanceof CategorizerStrategy)) {
      throw new Error('Strategy must extend CategorizerStrategy');
    }
    
    const existingIndex = this.strategies.findIndex(s => s.name === strategy.name);
    if (existingIndex >= 0) {
      this.strategies[existingIndex] = strategy;
    } else {
      this.strategies.push(strategy);
    }
    
    this.strategies.sort((a, b) => b.priority - a.priority);
  }

  getStrategy(name) {
    return this.strategies.find(s => s.name === name);
  }

  removeStrategy(name) {
    const index = this.strategies.findIndex(s => s.name === name);
    if (index >= 0) {
      this.strategies.splice(index, 1);
    }
  }

  enableStrategy(name) {
    const strategy = this.getStrategy(name);
    if (strategy) {
      strategy.enable();
    }
  }

  disableStrategy(name) {
    const strategy = this.getStrategy(name);
    if (strategy) {
      strategy.disable();
    }
  }

  getEnabledStrategies() {
    return this.strategies.filter(s => s.isEnabled());
  }

  async categorize(title) {
    if (!title || title.trim() === '') {
      return {
        category: this.defaultCategory,
        confidence: 0,
        strategy: 'default'
      };
    }

    const enabledStrategies = this.getEnabledStrategies();
    
    for (const strategy of enabledStrategies) {
      if (strategy.canCategorize(title)) {
        try {
          const result = await strategy.categorize(title, this.categories);
          if (result && this.categories.includes(result.category)) {
            return result;
          }
        } catch (error) {
          console.error(`Strategy ${strategy.name} failed:`, error);
        }
      }
    }

    return {
      category: this.defaultCategory,
      confidence: 0,
      strategy: 'fallback'
    };
  }

  learn(title, category) {
    if (!title || !category || !this.categories.includes(category)) {
      return;
    }

    const enabledStrategies = this.getEnabledStrategies();
    
    for (const strategy of enabledStrategies) {
      strategy.learn(title, category);
    }
  }

  configureLLM(config) {
    let llmStrategy = this.getStrategy('llm');
    
    if (!llmStrategy) {
      llmStrategy = new LLMStrategy(config);
      this.addStrategy(llmStrategy);
    } else {
      llmStrategy.configure(config);
    }

    return llmStrategy;
  }

  getLLMConfig() {
    const llmStrategy = this.getStrategy('llm');
    if (llmStrategy) {
      return llmStrategy.getConfig();
    }
    return null;
  }

  isLLMEnabled() {
    const llmStrategy = this.getStrategy('llm');
    return llmStrategy && llmStrategy.isEnabled();
  }

  clearHistory() {
    const historyStrategy = this.getStrategy('history');
    if (historyStrategy && historyStrategy.clearHistory) {
      historyStrategy.clearHistory();
    }
  }

  getHistory() {
    const historyStrategy = this.getStrategy('history');
    if (historyStrategy && historyStrategy.getHistory) {
      return historyStrategy.getHistory();
    }
    return {};
  }
}

let globalCategorizer = null;

export function getCategorizer() {
  if (!globalCategorizer) {
    globalCategorizer = new CategorizerManager();
    globalCategorizer.initialize();
  }
  return globalCategorizer;
}

export function configureLLM(config) {
  const categorizer = getCategorizer();
  return categorizer.configureLLM(config);
}

export function isLLMEnabled() {
  const categorizer = getCategorizer();
  return categorizer.isLLMEnabled();
}
