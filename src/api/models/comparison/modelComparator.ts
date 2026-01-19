interface Mismatch {
  field: string;
  expected: unknown;
  actual: unknown;
  toString(): string;
}

interface ComparisonResult {
  success: boolean;
  mismatches: Mismatch[];
}

const getNestedField = (obj: unknown, path: string): unknown =>
  path.split('.').reduce((acc: unknown, key: string) => (acc as Record<string, unknown>)?.[key], obj);

const compareModels = (request: unknown, response: unknown, fieldMap: Record<string, string>): ComparisonResult => {
  const mismatches: Mismatch[] = [];

  Object.entries(fieldMap).forEach(([reqField, resField]) => {
    const reqValue = getNestedField(request, reqField);
    const resValue = getNestedField(response, resField);

    if (String(reqValue) !== String(resValue)) {
      mismatches.push({
        field: `${reqField} → ${resField}`,
        expected: reqValue,
        actual: resValue,
        toString() {
          return `[${this.field}] Expected: ${this.expected}, Actual: ${this.actual}`;
        },
      });
    }
  });

  return {
    success: mismatches.length === 0,
    mismatches,
  };
};

export { compareModels };
export type { ComparisonResult, Mismatch };
