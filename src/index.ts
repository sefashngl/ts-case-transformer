// src/index.ts
import { CaseType, TransformObjectKeys, Transformers } from "./types";

function toCamelCase(str: string): string {
  return str
    .replace(/[-_](\w)/g, (_, c) => c.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
}

function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .replace(/[-]/g, "_")
    .replace(/^_/, "")
    .toLowerCase();
}

function toKebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, "-$1")
    .replace(/[_]/g, "-")
    .replace(/^-/, "")
    .toLowerCase();
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function toFlatCase(str: string): string {
  return str
    .replace(/[-_\s]+/g, '')
    .replace(/([A-Z])/g, (m) => m.toLowerCase());
}

function toUpperFlatCase(str: string): string {
  return str
    .replace(/[-_\s]+/g, '')
    .toUpperCase();
}

function toPascalSnakeCase(str: string): string {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('_');
}

function toCamelSnakeCase(str: string): string {
  const words = str.split(/[-_\s]+/);
  return [
    words[0].toLowerCase(),
    ...words.slice(1).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
  ].join('_');
}

function toScreamingSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1')
    .replace(/[-\s]+/g, '_')
    .replace(/^_/, '')
    .toUpperCase();
}

const transformers: Transformers = {
  camelCase: toCamelCase,
  snake_case: toSnakeCase,
  'kebab-case': toKebabCase,
  PascalCase: toPascalCase,
  flatcase: toFlatCase,
  UPPERFLATCASE: toUpperFlatCase,
  Pascal_Snake_Case: toPascalSnakeCase,
  camel_Snake_Case: toCamelSnakeCase,
  SCREAMING_SNAKE_CASE: toScreamingSnakeCase,
} as const;

function transformKeys<
  T extends object | Array<any>,
  C extends CaseType = "camelCase"
>(obj: T, caseType: C = "camelCase" as C): TransformObjectKeys<T, C> {
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      typeof item === "object" && item !== null
        ? transformKeys(item, caseType)
        : item
    ) as TransformObjectKeys<T, C>;
  }

  const transformer = transformers[caseType];
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const transformedKey = transformer(key);
    const transformedValue =
      value && typeof value === "object"
        ? transformKeys(value, caseType)
        : value;

    return {
      ...acc,
      [transformedKey]: transformedValue,
    };
  }, {}) as TransformObjectKeys<T, C>;
}

export { transformKeys };
export type { TransformObjectKeys } from "./types";