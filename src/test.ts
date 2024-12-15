import { transformKeys } from ".";

// Example usage:
const input = {
  user_name: "John",
  "user-age": 30,
  nested_object: {
    first_name: "John",
    last_name: "Doe",
    nested_object: {
      nested_object: "nested-object",
      one_more_nested_object: {
        one_more_nested_object: "one-more-nested-object",
      },
    },
  },
  some_array: [{ item_id: 1 }, { item_id: 2 }],
};

// To camelCase (default)
const camelCase = transformKeys(input);

// To snakeCase
const snakeCase = transformKeys(input, "snake");

// To kebabCase
const kebabCase = transformKeys(input, "kebab");

// To PascalCase
const pascalCase = transformKeys(input, "pascal");

console.log(JSON.stringify({ camelCase, snakeCase, kebabCase, pascalCase }, null, 1));