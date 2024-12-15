# ts-case-transformer

A TypeScript utility for transforming object keys between different case styles with full type safety.

## Features

- Full TypeScript support with accurate type transformations
- Type-only usage available for type transformations
- Handles nested objects and arrays
- Preserves original values, only transforms keys
- Supports multiple case styles
- Zero dependencies
- Works with any valid object key format

## Installation

```sh
npm install ts-case-transformer
```

## Supported Cases
- `camelCase`: userName, firstName
- `snake_case`: user_name, first_name
- `kebab-case`: user-name, first-name
- `PascalCase`: UserName, FirstName
- `flatcase`: username, firstname
- `UPPERFLATCASE`: USERNAME, FIRSTNAME
- `Pascal_Snake_Case`: User_Name, First_Name
- `camel_Snake_Case`: user_Name, first_Name
- `SCREAMING_SNAKE_CASE`: USER_NAME, FIRST_NAME

## Usage

### Function Usage

```typescript
import { transformKeys } from 'ts-case-transformer';

const input = {
  user_name: "John",
  "user-age": 30,
  nested_object: {
    first_name: "John"
  }
};

// Different case transformations
const camelCase = transformKeys(input, 'camelCase');
// { userName: "John", userAge: 30, nestedObject: { firstName: "John" } }

const snakeCase = transformKeys(input, 'snake_case');
// { user_name: "John", user_age: 30, nested_object: { first_name: "John" } }

const kebabCase = transformKeys(input, 'kebab-case');
// { "user-name": "John", "user-age": 30, "nested-object": { "first-name": "John" } }

const pascalCase = transformKeys(input, 'PascalCase');
// { UserName: "John", UserAge: 30, NestedObject: { FirstName: "John" } }

const flatCase = transformKeys(input, 'flatcase');
// { username: "John", userage: 30, nestedobject: { firstname: "John" } }

const upperFlatCase = transformKeys(input, 'UPPERFLATCASE');
// { USERNAME: "John", USERAGE: 30, NESTEDOBJECT: { FIRSTNAME: "John" } }

const pascalSnakeCase = transformKeys(input, 'Pascal_Snake_Case');
// { User_Name: "John", User_Age: 30, Nested_Object: { First_Name: "John" } }

const camelSnakeCase = transformKeys(input, 'camel_Snake_Case');
// { user_Name: "John", user_Age: 30, nested_Object: { first_Name: "John" } }

const screamingSnakeCase = transformKeys(input, 'SCREAMING_SNAKE_CASE');
// { USER_NAME: "John", USER_AGE: 30, NESTED_OBJECT: { FIRST_NAME: "John" } }
```

### Type Usage

You can also use the type transformer directly in your TypeScript code:

```typescript
import { TransformObjectKeys } from 'ts-case-transformer';

type UserInput = {
  user_name: string;
  nested_object: {
    first_name: string;
  }
};

// Transform to different cases
type CamelCase = TransformObjectKeys<UserInput, 'camelCase'>;
// { userName: string; nestedObject: { firstName: string } }

type SnakeCase = TransformObjectKeys<UserInput, 'snake_case'>;
// { user_name: string; nested_object: { first_name: string } }

type ScreamingSnake = TransformObjectKeys<UserInput, 'SCREAMING_SNAKE_CASE'>;
// { USER_NAME: string; NESTED_OBJECT: { FIRST_NAME: string } }
```

## Type Safety

The transformer maintains full type safety:

```typescript
import { transformKeys, TransformObjectKeys } from 'ts-case-transformer';

// Runtime transformation with automatic type inference
const input = { user_name: "John" };
const result = transformKeys(input, "camelCase");
// result type: { userName: string }

// Type-only transformation
type Input = typeof input;
type Result = TransformObjectKeys<Input, "camelCase">;
// { userName: string }
```

## License

MIT