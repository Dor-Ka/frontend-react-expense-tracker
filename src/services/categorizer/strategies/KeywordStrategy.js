import { CategorizerStrategy } from './CategorizerStrategy';
import { CATEGORY_KEYWORDS } from '../../../constants/categoryKeywords';
import { CATEGORY_OPTIONS } from '../../../constants/categories';

export class KeywordStrategy extends CategorizerStrategy {
  constructor() {
    super('keyword', 10);
    this.keywords = CATEGORY_KEYWORDS;
    this.categories = CATEGORY_OPTIONS;
  }

  canCategorize(title) {
    return title && title.trim().length > 0;
  }

  async categorize(title) {
    if (!title || title.trim() === '') {
      return null;
    }

    const lowerTitle = title.toLowerCase();

    for (const category of this.categories) {
      if (category === 'Other') continue;

      const keywords = this.keywords[category] || [];
      for (const keyword of keywords) {
        if (lowerTitle.includes(keyword.toLowerCase())) {
          return {
            category: category,
            confidence: 0.7,
            strategy: this.name,
            matchedKeyword: keyword
          };
        }
      }
    }

    return null;
  }
}
