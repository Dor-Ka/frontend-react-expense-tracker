export class CategorizerStrategy {
  constructor(name, priority = 0) {
    this.name = name;
    this.priority = priority;
    this.enabled = true;
  }

  async categorize(title, categories) {
    throw new Error('Method "categorize" must be implemented');
  }

  canCategorize(title) {
    return true;
  }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  isEnabled() {
    return this.enabled;
  }

  learn(title, category) {
  }
}
