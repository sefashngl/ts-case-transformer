// src/test.ts
import { transformKeys } from ".";

// Example usage:
const input = {
  user_name: "John",
  "user-age": 30,
  nested_object: {
    first_name: "John",
    "last-name": "Doe",
    nested_object: {
      nested_object: "nested-object",
      one_more_nested_object: {
        one_more_nested_object: "one-more-nested-object",
      },
    },
  },
  some_array: [{ item_id: 1 }, { item_id: 2 }],
};

const test = transformKeys([{ sefa: 'sefa' }, { test: 123}], 'UPPERFLATCASE');
console.log(JSON.stringify(test, null, 2));
