import { compareModels } from './modelComparator.js';
import { loadComparisonRules, getRuleFor, type ParsedRule } from './modelComparisonConfig.js';
import type BaseModel from '../BaseModel.js';

const DEFAULT_CONFIG_PATH = 'src/api/models/comparison/modelRules.json';

class ModelAssertions {
  private request: BaseModel;

  private response: unknown;

  private customMappings: Record<string, string> | null = null;

  private configPath: string = DEFAULT_CONFIG_PATH;

  constructor(request: BaseModel, response: unknown) {
    this.request = request;
    this.response = response;
  }

  withMappings(mappings: Record<string, string>): this {
    this.customMappings = mappings;
    return this;
  }

  useConfig(path: string): this {
    this.configPath = path;
    return this;
  }

  async match(): Promise<void> {
    let rules: Map<string, ParsedRule> | undefined;
    if (this.configPath) {
      rules = await loadComparisonRules(this.configPath);
    }

    let fieldMappings: Record<string, string>;
    if (this.customMappings) {
      fieldMappings = this.customMappings;
    } else if (rules) {
      const rule = getRuleFor(rules, this.request.constructor?.name || 'default');
      if (!rule) {
        throw new Error(`No comparison rule found for model: ${this.request.constructor?.name}`);
      }
      fieldMappings = rule.fieldMappings;
    } else {
      throw new Error('Neither mappings nor config provided');
    }

    const result = compareModels(this.request, this.response, fieldMappings);

    if (!result.success) {
      const errorMsg = ['Model comparison failed:', ...result.mismatches.map((m) => `- ${m}`)].join('\n');
      throw new Error(errorMsg);
    }
  }
}

const assertThatModels = (request: BaseModel, response: unknown): ModelAssertions =>
  new ModelAssertions(request, response);

export { assertThatModels };
