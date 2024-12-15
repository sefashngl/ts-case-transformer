// src/types.ts
export type CaseType = 'camel' | 'snake' | 'kebab' | 'pascal';

// First normalize the string by converting it to words
type WordSeparators = '-' | '_' | ' ' | '.';
type UpperChar<C extends string> = Uppercase<C> extends C ? true : false;

type SplitWords<
  S extends string,
  Acc extends string = ''
> = S extends `${infer First}${infer Rest}`
  ? First extends WordSeparators
    ? [Acc, ...SplitWords<Rest>]
    : UpperChar<First> extends true
    ? Acc extends ''
      ? SplitWords<Rest, First>
      : [Acc, ...SplitWords<`${First}${Rest}`>]
    : SplitWords<Rest, `${Acc}${First}`>
  : Acc extends ''
  ? []
  : [Acc];

// Case transformation utilities
type ToCamelWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Lowercase<First>}${Rest extends []
      ? ''
      : `${Capitalize<ToCamelWords<Rest>>}`}`
  : '';

type ToSnakeWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Lowercase<First>}${Rest extends [] ? '' : `_${ToSnakeWords<Rest>}`}`
  : '';

type ToKebabWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Lowercase<First>}${Rest extends [] ? '' : `-${ToKebabWords<Rest>}`}`
  : '';

type ToPascalWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Capitalize<Lowercase<First>>}${ToPascalWords<Rest>}`
  : '';

// Main case transformation types
export type ToCamelCase<S extends string> = ToCamelWords<SplitWords<S>>;
export type ToSnakeCase<S extends string> = ToSnakeWords<SplitWords<S>>;
export type ToKebabCase<S extends string> = ToKebabWords<SplitWords<S>>;
export type ToPascalCase<S extends string> = ToPascalWords<SplitWords<S>>;

type CaseMapping<S extends string, C extends CaseType> = C extends 'camel'
  ? ToCamelCase<S>
  : C extends 'snake'
  ? ToSnakeCase<S>
  : C extends 'kebab'
  ? ToKebabCase<S>
  : C extends 'pascal'
  ? ToPascalCase<S>
  : never;

export type Transformers = {
  [K in CaseType]: (str: string) => string;
};

export type TransformObjectKeys<T, Case extends CaseType> = T extends Array<infer U>
  ? Array<U extends object ? TransformObjectKeys<U, Case> : U>
  : T extends object
  ? {
      [K in keyof T as CaseMapping<K & string, Case>]: T[K] extends object
        ? TransformObjectKeys<T[K], Case>
        : T[K];
    }
  : T;