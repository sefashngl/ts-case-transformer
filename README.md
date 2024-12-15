# ts-case-transformer

A TypeScript utility for transforming object keys between different case styles with full type safety.

## Installation

```bash
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

```typescript
import { transformKeys } from 'ts-case-transformer';

const input = {
  user_name: "John",
  "user-age": 30,
  nested_object: {
    first_name: "John",
    "last-name": "Doe",
    nested_object: {
      nested_object: "nested-object"
    }
  },
  some_array: [{ item_id: 1 }, { item_id: 2 }]
};

// To camelCase (default)
const camelCase = transformKeys(input, 'camelCase');
// {
//   userName: "John",
//   userAge: 30,
//   nestedObject: {
//     firstName: "John",
//     lastName: "Doe",
//     nestedObject: {
//       nestedObject: "nested-object"
//     }
//   },
//   someArray: [{ itemId: 1 }, { itemId: 2 }]
// }

// To snake_case
const snakeCase = transformKeys(input, 'snake_case');
// {
//   user_name: "John",
//   user_age: 30,
//   nested_object: {
//     first_name: "John",
//     last_name: "Doe",
//     nested_object: {
//       nested_object: "nested-object"
//     }
//   },
//   some_array: [{ item_id: 1 }, { item_id: 2 }]
// }

// To kebab-case
const kebabCase = transformKeys(input, 'kebab-case');
// {
//   "user-name": "John",
//   "user-age": 30,
//   "nested-object": {
//     "first-name": "John",
//     "last-name": "Doe",
//     "nested-object": {
//       "nested-object": "nested-object"
//     }
//   },
//   "some-array": [{ "item-id": 1 }, { "item-id": 2 }]
// }

// To PascalCase
const pascalCase = transformKeys(input, 'PascalCase');
// {
//   UserName: "John",
//   UserAge: 30,
//   NestedObject: {
//     FirstName: "John",
//     LastName: "Doe",
//     NestedObject: {
//       NestedObject: "nested-object"
//     }
//   },
//   SomeArray: [{ ItemId: 1 }, { ItemId: 2 }]
// }

// To flatcase
const flatCase = transformKeys(input, 'flatcase');
// {
//   username: "John",
//   userage: 30,
//   nestedobject: {
//     firstname: "John",
//     lastname: "Doe",
//     nestedobject: {
//       nestedobject: "nested-object"
//     }
//   },
//   somearray: [{ itemid: 1 }, { itemid: 2 }]
// }

// To UPPERFLATCASE
const upperFlatCase = transformKeys(input, 'UPPERFLATCASE');
// {
//   USERNAME: "John",
//   USERAGE: 30,
//   NESTEDOBJECT: {
//     FIRSTNAME: "John",
//     LASTNAME: "Doe",
//     NESTEDOBJECT: {
//       NESTEDOBJECT: "nested-object"
//     }
//   },
//   SOMEARRAY: [{ ITEMID: 1 }, { ITEMID: 2 }]
// }

// To Pascal_Snake_Case
const pascalSnakeCase = transformKeys(input, 'Pascal_Snake_Case');
// {
//   User_Name: "John",
//   User_Age: 30,
//   Nested_Object: {
//     First_Name: "John",
//     Last_Name: "Doe",
//     Nested_Object: {
//       Nested_Object: "nested-object"
//     }
//   },
//   Some_Array: [{ Item_Id: 1 }, { Item_Id: 2 }]
// }

// To camel_Snake_Case
const camelSnakeCase = transformKeys(input, 'camel_Snake_Case');
// {
//   user_Name: "John",
//   user_Age: 30,
//   nested_Object: {
//     first_Name: "John",
//     last_Name: "Doe",
//     nested_Object: {
//       nested_Object: "nested-object"
//     }
//   },
//   some_Array: [{ item_Id: 1 }, { item_Id: 2 }]
// }

// To SCREAMING_SNAKE_CASE
const screamingSnakeCase = transformKeys(input, 'SCREAMING_SNAKE_CASE');
// {
//   USER_NAME: "John",
//   USER_AGE: 30,
//   NESTED_OBJECT: {
//     FIRST_NAME: "John",
//     LAST_NAME: "Doe",
//     NESTED_OBJECT: {
//       NESTED_OBJECT: "nested-object"
//     }
//   },
//   SOME_ARRAY: [{ ITEM_ID: 1 }, { ITEM_ID: 2 }]
// }
```

## Type Safety

The transformer maintains full type safety. The transformed object's type will reflect the case transformation:

```typescript
const input = {
  user_name: "John",
  user_age: 30
};

const result = transformKeys(input, "camelCase");
// Type of result is:
// {
//   userName: string;
//   userAge: number;
// }
```

## Features

- Full TypeScript support with accurate type transformations
- Handles nested objects and arrays
- Preserves original values, only transforms keys
- Supports multiple case styles
- Zero dependencies
- Works with any valid object key format

## License

MIT