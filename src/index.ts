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

const transformers: Transformers = {
  camel: toCamelCase,
  snake: toSnakeCase,
  kebab: toKebabCase,
  pascal: toPascalCase,
} as const;

export function transformKeys<
  T extends object | Array<any>,
  C extends CaseType = "camel"
>(obj: T, caseType: C = "camel" as C): TransformObjectKeys<T, C> {
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
