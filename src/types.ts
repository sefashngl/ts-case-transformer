// src/types.ts
export type CaseType = 
  | 'camelCase' 
  | 'snake_case' 
  | 'kebab-case' 
  | 'PascalCase'
  | 'flatcase'
  | 'UPPERFLATCASE'
  | 'Pascal_Snake_Case'
  | 'camel_Snake_Case'
  | 'SCREAMING_SNAKE_CASE';

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

// Add new case transformation utilities
type ToFlatWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Lowercase<First>}${ToFlatWords<Rest>}`
  : '';

type ToUpperFlatWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Uppercase<First>}${ToUpperFlatWords<Rest>}`
  : '';

type ToPascalSnakeWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Capitalize<Lowercase<First>>}${Rest extends [] ? '' : `_${ToPascalSnakeWords<Rest>}`}`
  : '';

type ToCamelSnakeWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Lowercase<First>}${Rest extends [] ? '' : `_${ToPascalSnakeWords<Rest>}`}`
  : '';

type ToScreamingSnakeWords<Words extends string[]> = Words extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? `${Uppercase<First>}${Rest extends [] ? '' : `_${ToScreamingSnakeWords<Rest>}`}`
  : '';

// Main case transformation types
export type ToCamelCase<S extends string> = ToCamelWords<SplitWords<S>>;
export type ToSnakeCase<S extends string> = ToSnakeWords<SplitWords<S>>;
export type ToKebabCase<S extends string> = ToKebabWords<SplitWords<S>>;
export type ToPascalCase<S extends string> = ToPascalWords<SplitWords<S>>;
export type ToFlatCase<S extends string> = ToFlatWords<SplitWords<S>>;
export type ToUpperFlatCase<S extends string> = ToUpperFlatWords<SplitWords<S>>;
export type ToPascalSnakeCase<S extends string> = ToPascalSnakeWords<SplitWords<S>>;
export type ToCamelSnakeCase<S extends string> = ToCamelSnakeWords<SplitWords<S>>;
export type ToScreamingSnakeCase<S extends string> = ToScreamingSnakeWords<SplitWords<S>>;

type CaseMapping<S extends string, C extends CaseType> = C extends 'camelCase'
  ? ToCamelCase<S>
  : C extends 'snake_case'
  ? ToSnakeCase<S>
  : C extends 'kebab-case'
  ? ToKebabCase<S>
  : C extends 'PascalCase'
  ? ToPascalCase<S>
  : C extends 'flatcase'
  ? ToFlatCase<S>
  : C extends 'UPPERFLATCASE'
  ? ToUpperFlatCase<S>
  : C extends 'Pascal_Snake_Case'
  ? ToPascalSnakeCase<S>
  : C extends 'camel_Snake_Case'
  ? ToCamelSnakeCase<S>
  : C extends 'SCREAMING_SNAKE_CASE'
  ? ToScreamingSnakeCase<S>
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