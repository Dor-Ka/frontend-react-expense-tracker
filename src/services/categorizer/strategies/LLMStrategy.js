import { CategorizerStrategy } from './CategorizerStrategy';

export const LLM_PROVIDERS = {
  OPENAI: 'openai',
  ANTHROPIC: 'anthropic',
  QIANWEN: 'qianwen',
  DOUBAO: 'doubao',
  CUSTOM: 'custom'
};

const DEFAULT_PROMPT_TEMPLATE = `你是一个支出分类助手。请根据用户的支出标题，将其分类到以下类别之一：

可用类别：
{categories}

请分析以下支出标题："{title}"

请直接返回一个JSON对象，格式如下：
{{"category": "类别名称", "reason": "简短的分类理由"}}

注意：
1. 只返回JSON，不要有其他内容
2. category必须是上面列出的类别之一
3. 如果无法确定，请返回"Other"`;

export class LLMStrategy extends CategorizerStrategy {
  constructor(config = {}) {
    super('llm', 50);
    this.config = {
      provider: config.provider || LLM_PROVIDERS.OPENAI,
      apiKey: config.apiKey || '',
      model: config.model || '',
      baseUrl: config.baseUrl || '',
      promptTemplate: config.promptTemplate || DEFAULT_PROMPT_TEMPLATE,
      timeout: config.timeout || 10000,
      enabled: config.enabled !== undefined ? config.enabled : false,
      fallbackOnError: config.fallbackOnError !== undefined ? config.fallbackOnError : true
    };
    
    this.enabled = this.config.enabled;
  }

  configure(config) {
    this.config = { ...this.config, ...config };
    this.enabled = this.config.enabled;
    
    if (this.config.apiKey) {
      try {
        localStorage.setItem('llm_api_key', this.config.apiKey);
      } catch (e) {
        console.warn('Could not save API key to localStorage');
      }
    }
  }

  getConfig() {
    return { ...this.config };
  }

  isConfigured() {
    return this.config.apiKey && this.config.apiKey.trim().length > 0;
  }

  canCategorize(title) {
    return this.enabled && 
           this.isConfigured() && 
           title && 
           title.trim().length > 0;
  }

  buildPrompt(title, categories) {
    let prompt = this.config.promptTemplate;
    prompt = prompt.replace('{title}', title);
    prompt = prompt.replace('{categories}', categories.join(', '));
    return prompt;
  }

  async callOpenAI(prompt) {
    const url = this.config.baseUrl || 'https://api.openai.com/v1/chat/completions';
    const model = this.config.model || 'gpt-3.5-turbo';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 100
      }),
      signal: AbortSignal.timeout(this.config.timeout)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async callAnthropic(prompt) {
    const url = this.config.baseUrl || 'https://api.anthropic.com/v1/messages';
    const model = this.config.model || 'claude-3-sonnet-20240229';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      }),
      signal: AbortSignal.timeout(this.config.timeout)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Anthropic API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  async callQianwen(prompt) {
    const url = this.config.baseUrl || 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';
    const model = this.config.model || 'qwen-turbo';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3
      }),
      signal: AbortSignal.timeout(this.config.timeout)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Qianwen API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async callDoubao(prompt) {
    const url = this.config.baseUrl || 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
    const model = this.config.model || 'doubao-seed-1-8-251228';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3
      }),
      signal: AbortSignal.timeout(this.config.timeout)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Doubao API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  async callCustom(prompt) {
    if (!this.config.baseUrl) {
      throw new Error('Custom provider requires baseUrl');
    }
    
    const response = await fetch(this.config.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
      },
      body: JSON.stringify({
        prompt: prompt,
        model: this.config.model
      }),
      signal: AbortSignal.timeout(this.config.timeout)
    });

    if (!response.ok) {
      throw new Error(`Custom API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || data.content || data.text || data;
  }

  async callLLM(prompt) {
    switch (this.config.provider) {
      case LLM_PROVIDERS.OPENAI:
        return await this.callOpenAI(prompt);
      case LLM_PROVIDERS.ANTHROPIC:
        return await this.callAnthropic(prompt);
      case LLM_PROVIDERS.QIANWEN:
        return await this.callQianwen(prompt);
      case LLM_PROVIDERS.DOUBAO:
        return await this.callDoubao(prompt);
      case LLM_PROVIDERS.CUSTOM:
        return await this.callCustom(prompt);
      default:
        return await this.callOpenAI(prompt);
    }
  }

  parseResponse(response, categories) {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.category && categories.includes(parsed.category)) {
          return {
            category: parsed.category,
            reason: parsed.reason || 'Classified by LLM'
          };
        }
      }
      
      for (const category of categories) {
        if (response.includes(category)) {
          return {
            category: category,
            reason: 'Extracted from LLM response'
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error('Failed to parse LLM response:', error);
      return null;
    }
  }

  async categorize(title, categories = []) {
    if (!this.canCategorize(title)) {
      return null;
    }

    try {
      const prompt = this.buildPrompt(title, categories);
      const response = await this.callLLM(prompt);
      const result = this.parseResponse(response, categories);
      
      if (result) {
        return {
          category: result.category,
          confidence: 0.85,
          strategy: this.name,
          reason: result.reason,
          provider: this.config.provider
        };
      }
      
      return null;
    } catch (error) {
      console.error('LLM categorization failed:', error);
      
      if (this.config.fallbackOnError) {
        return null;
      }
      
      throw error;
    }
  }

  static loadSavedConfig() {
    try {
      const apiKey = localStorage.getItem('llm_api_key');
      const configStr = localStorage.getItem('llm_config');
      
      if (configStr) {
        const savedConfig = JSON.parse(configStr);
        if (apiKey) {
          savedConfig.apiKey = apiKey;
        }
        return savedConfig;
      }
      
      if (apiKey) {
        return { apiKey, enabled: true };
      }
    } catch (e) {
      console.warn('Could not load saved LLM config');
    }
    
    return null;
  }

  static fromSavedConfig() {
    const savedConfig = LLMStrategy.loadSavedConfig();
    if (savedConfig) {
      return new LLMStrategy(savedConfig);
    }
    return new LLMStrategy();
  }
}
