import { promises as fs } from 'fs';

interface RuleConfig {
  target: string;
  fields: string[];
}

interface RawConfig {
  [requestClass: string]: RuleConfig;
}

interface ParsedRule {
  target: string;
  fieldMappings: Record<string, string>;
  toString(): string;
}

const configCache = new Map<string, Map<string, ParsedRule>>();

const parseConfig = (rawConfig: RawConfig): Map<string, ParsedRule> => {
  const rules = new Map<string, ParsedRule>();

  Object.entries(rawConfig).forEach(([requestClass, ruleConfig]) => {
    if (!ruleConfig?.target || !ruleConfig?.fields) {
      return;
    }

    const fieldMappings = ruleConfig.fields.reduce((map: Record<string, string>, fieldRule: string) => {
      const [reqField, resField = reqField] = fieldRule.split('=').map((s) => s.trim());
      return { ...map, [reqField]: resField };
    }, {});

    rules.set(requestClass, {
      target: ruleConfig.target,
      fieldMappings,
      toString() {
        return `Rule for ${requestClass} → ${this.target}`;
      },
    });
  });

  return Object.freeze(rules) as Map<string, ParsedRule>;
};

const loadComparisonRules = async (filePath: string): Promise<Map<string, ParsedRule>> => {
  if (configCache.has(filePath)) {
    return configCache.get(filePath)!;
  }

  let rawData: string;
  try {
    rawData = await fs.readFile(filePath, 'utf-8');
  } catch (err) {
    throw new Error(`Config file not found: ${filePath}`);
  }

  const rules = parseConfig(JSON.parse(rawData) as RawConfig);

  configCache.set(filePath, rules);
  return rules;
};

const getRuleFor = (rules: Map<string, ParsedRule>, requestClassName: string): ParsedRule | null =>
  rules.get(requestClassName) ?? null;

export { loadComparisonRules, getRuleFor };
export type { ParsedRule, RuleConfig, RawConfig };
