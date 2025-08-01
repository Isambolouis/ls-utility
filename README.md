
---

## 🧾 `ls-utility` – Utility Toolkit for Leistrap

A powerful collection of utility functions used across the Leistrap ecosystem. This module provides general-purpose helpers (arrays, objects, types, DOM, randomness, code generation, etc.), including core utilities powering key Leistrap mechanisms such as class generation and custom event management.

---

### 📦 Installation

```bash
npm install ls-utility
```

> Or clone directly:

```bash
git clone https://github.com/Leistrap/ls-utility
```

---

### 🧠 Usage

```js
import { isArray, generateId, loopObject } from "ls-utility";

console.log(isArray([])); // true
console.log(generateId(3, 5)); // 'L3aZ...'
```

---

### 📚 API Reference

The following functions are available from the root `index.js` entry point:

---

#### ✅ Type Checking

| Function                | Description                                |
| ----------------------- | ------------------------------------------ |
| `isArray(obj)`          | Returns `true` if `obj` is an array        |
| `isObject(obj)`         | Returns `true` if `obj` is an object       |
| `isString(obj)`         | Returns `true` if `obj` is a string        |
| `isNumber(obj)`         | Returns `true` if `obj` is a number        |
| `isFunction(obj)`       | Returns `true` if `obj` is a function      |
| `isNone(obj)`           | Returns `true` if `obj` is an empty string |
| `isUndefined(obj)`      | Returns `true` if `obj` is undefined       |
| `isEmpty(obj)`          | Returns `true` if array or object is empty |
| `isTypeOf(value, Type)` | Checks if value is an instance of `Type`   |

---

---
---

### 🛠 Highlighted: Core Utilities for Leistrap

Some functions are at the heart of Leistrap’s internal logic:

| Function          | Purpose                                                                             |
| ----------------- | ----------------------------------------------------------------------------------- |
| `uuid()`          | Unique identifier generator used across Leistrap components.                        |
| `leisCode`        | Core module providing tools for Leistrap's internal code generation and evaluation. |
| `_EventEmitter()` | Returns an instance of the internal Leistrap EventEmitter with contextual helpers.  |
| `genXClass()`     | Generates unique CSS-like class names (used in dynamic styling system).             |

---


## ✅ Type Checking Utilities

These functions help identify the type or characteristics of a given value. They are frequently used for validation or branching logic in Leistrap’s internal systems.

---

### `isArray(obj)`

Checks if a value is an array.

```js
isArray([1, 2, 3]); // true
isArray("hello");   // false
```

> Internally uses the constructor string check for compatibility.

---

### `isObject(obj)`

Checks if a value is a plain JavaScript object.

```js
isObject({ a: 1 });   // true
isObject([1, 2, 3]);  // false
```

> Arrays and null are excluded.

---

### `isString(obj)`

Returns `true` if the value is a string (primitive or `String` object).

```js
isString("hello");              // true
isString(new String("world"));  // true
isString(123);                  // false
```

---

### `isNumber(obj)`

Returns `true` if the value is a number and not `NaN`.

```js
isNumber(42);        // true
isNumber("42");      // false
isNumber(NaN);       // false
```

---

### `isFunction(obj)`

Checks if a value is a function.

```js
isFunction(() => {});     // true
isFunction("not a fn");   // false
```

---

### `isNone(obj)`

Returns `true` if the value is a string and is empty (`""`).

```js
isNone("");        // true
isNone("hello");   // false
isNone(null);      // false
```

---

### `isUndefined(obj)`

Returns `true` if the value is `undefined` or falsy.

```js
let x;
isUndefined(x);          // true
isUndefined(null);       // false
isUndefined("");         // true
isUndefined(false);      // true
```

> ⚠️ This implementation considers all falsy values as “undefined”. You may want to use a stricter version if necessary.

---

### `isEmpty(obj)`

Checks whether an array or object is empty.

```js
isEmpty([]);             // true
isEmpty({});             // true
isEmpty([1]);            // false
isEmpty({ key: "value" })// false
```

---

### `isTypeOf(value, Type)`

Returns `true` if the value is an instance of the given constructor or class.

```js
isTypeOf([], Array);         // true
isTypeOf({}, Object);        // true
isTypeOf("abc", String);     // false
```



## 🧩 Array and Object Manipulation

These functions provide flexible tools to manipulate arrays and objects. They are useful in many transformation and data handling scenarios within Leistrap.

---

### `setEmptyArray(arr)`

Clears all elements of the given array in place.

```js
const a = [1, 2, 3];
setEmptyArray(a);
console.log(a); // []
```

---

### `copyObject(source, target, overwrite = false, ...excludedKeys)`

Copies properties from `source` to `target`. If `overwrite` is `false`, existing keys in `target` are not replaced. You can exclude specific keys.

```js
const source = { a: 1, b: 2 };
const target = { a: 100 };
copyObject(source, target, false);
console.log(target); // { a: 100, b: 2 }
```

---

### `copyArray(source, target, overwrite = false)`

Copies items from one array to another. If `overwrite` is false, duplicates are avoided.

```js
const a = [1, 2];
const b = [2, 3];
copyArray(a, b);
console.log(b); // [2, 3, 1]
```

---

### `reverse(obj)`

Reverses arrays, objects, or strings.

* Arrays → reversed
* Objects → reversed key order
* Strings → reversed string

```js
reverse([1, 2, 3]); // [3, 2, 1]
reverse("abc");     // "cba"
reverse({ a: 1, b: 2 }); // { b: 2, a: 1 }
```

---

### `arrayRemove(index, arr)`

Removes the element at the given index from the array.

```js
const arr = [10, 20, 30];
arrayRemove(1, arr);
console.log(arr); // [10, 30]
```

---

### `arrayReplace(index, value, arr)`

Replaces the element at the given index with a new value.

```js
const arr = [10, 20, 30];
arrayReplace(1, 99, arr);
console.log(arr); // [10, 99, 30]
```

---

### `arrayInsert(index, arr, value)`

Inserts a new value into the array at the given index.

```js
const arr = [10, 30];
arrayInsert(1, arr, 20);
console.log(arr); // [10, 20, 30]
```

---

### `loopObject(obj, callback)`

Loops over an object’s keys and applies a callback `(value, key, index, isLast)`. Also returns an array of values.

```js
loopObject({ a: 1, b: 2 }, (value, key, index, isLast) => {
  console.log(key, value, isLast);
});
// "a", 1, false
// "b", 2, true
```

---

### `initObj(obj, fallback)`

Initializes `obj` with `fallback` if it's undefined or falsy.

```js
let value = null;
value = initObj(value, "default");
console.log(value); // "default"
```

---

### `objKeysToLowerCase(obj)`

Returns a new object with all keys converted to lowercase.

```js
objKeysToLowerCase({ Name: "John", AGE: 30 });
// { name: "John", age: 30 }
```

---

### `filter(obj, callback)`

Filters an object using a custom callback `(value, key)`.

```js
filter({ a: 1, b: 2, c: 3 }, (v) => v % 2 === 1);
// { a: 1, c: 3 }
```

---

### `defineObj(obj, propName, value, writable = false)`

Defines a property with a fixed or writable value using `Object.defineProperty`.

```js
const user = {};
defineObj(user, "id", 123);
console.log(user.id); // 123
```

---


## 🎲 Random & ID Generation

Functions that help with randomness, random selection, or generating unique identifiers. These are often used in Leistrap for naming, styling, or generating unique states.

---

### `generateId(min = 0, max = 1)`

Generates a random string ID using letters, numbers, and symbols. The length of the string is random between `min` and `max`.

```js
generateId(3, 5); // Example: "3AjKX8"
```

---

### `choice(obj)`

Selects a random element from various types:

* **String** → Returns a random character
* **Number** → Returns a number from `0` to `n - 1`
* **Object** → Returns a random value from object properties
* **Array** → *Not handled directly – use `choice([...])`*

```js
choice("hello");        // 'l'
choice(5);              // 0–4
choice({ a: 1, b: 2 }); // 1 or 2
```

> ❗ Throws an error for unsupported types like `function`, `boolean`, `undefined`, etc.

---

### `randint(min, max)`

Returns a random integer between `min` (inclusive) and `max` (exclusive).

```js
randint(1, 10); // 1 to 9
```

---

### `uuid()`

**\[💡 Highlighted Utility]**

Generates a universally unique identifier. This is a key function in Leistrap for uniquely identifying components, events, or generated elements.

```js
uuid(); // Example: "f9a8e7d6-..."
```

> This function is essential to Leistrap’s internal logic and structure. Used heavily in component IDs.

---



## 📊 Math Utilities

These utilities provide basic mathematical operations commonly needed for looping, measurement, and dynamic behaviors inside Leistrap.

---

### `maxArray(array = [])`

Returns the maximum value in an array of numbers.

```js
maxArray([10, 5, 22, 8]); // 22
```

> Throws an error if the input is not an array-like object.

---

### `minArray(array = [])`

Returns the minimum value in an array of numbers.

```js
minArray([10, 5, 22, 8]); // 5
```

> Throws an error if the input is not an array-like object.

---

### `rangeList(num, offset = 0, step = 1)`

Returns an array of numbers starting from `offset` up to `num`, incremented by `step`.

```js
rangeList(10);             // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
rangeList(10, 2);          // [2, 3, 4, 5, 6, 7, 8, 9]
rangeList(10, 0, 2);       // [0, 2, 4, 6, 8]
```

---

### `countArray(arr, offset)`

Creates a circular counter function over an array. Each call returns the next element, and loops back to the beginning when reaching the end.

```js
const next = countArray(["a", "b", "c"], 0);
next(); // "a"
next(); // "b"
next(); // "c"
next(); // "a"
```

---



## 🧪 Testing and Matching Utilities

These functions help with checks, membership tests, and type assertions used throughout Leistrap.

---

### `has(prop, obj)`

Checks if `obj` contains the property or element `prop`.

* If `obj` has `indexOf` (like array or string), uses it.
* Otherwise, uses `hasOwnProperty`.

```js
has("key", { key: 1, x: 2 }); // true
has("a", ["a", "b", "c"]);    // true
has("d", ["a", "b", "c"]);    // false
```

---

### `isElementOf(item, list)`

Returns `true` if `item` exists in the `list` array.

```js
isElementOf(3, [1, 2, 3]); // true
isElementOf(4, [1, 2, 3]); // false
```

---

### `isTypeOf(prop, obj)`

Checks if `prop` is an instance of `obj`.

```js
isTypeOf([], Array);      // true
isTypeOf({}, Object);     // true
isTypeOf("abc", String);  // false
```

---



# 📡 `lsEmitter` – Leistrap’s Core EventEmitter

> A lightweight, channel-based communication system for component interaction and dynamic event management in Leistrap.

---

## 🔍 Overview

`lsEmitter` is a fundamental utility in Leistrap designed to enable reactive, decoupled communication between logic units, components, or services. It allows the definition of **named channels** that can be dynamically created, triggered, or removed, with full lifecycle control.

This tool is ideal for scenarios requiring event delegation, inter-component messaging, or asynchronous callback coordination.

---

## 🧠 Concept Highlights

* **Channel-Based Communication**: Every event is identified by a unique string key (the channel name).
* **Asynchronous & Queue-Aware**: `invoke` waits and queues events if the channel is not yet defined.
* **Decoupling**: Promotes logic separation between event producers and consumers.
* **Lifecycle Control**: Define `writable` and `removable` options for each channel.
* **Safe & Robust**: Built-in validation and destruction awareness prevent misuse.

---

## ✨ Key API Methods

### 🛠 `handle(channel, listener, removable = true, writable = true)`

Registers a named channel with a handler function.

* `channel` *(string)* – Unique name of the channel.
* `listener(event, ...args)` *(function)* – Called when the channel is triggered. Can use `event.send(data)` to send back data.
* `removable` *(boolean)* – If `false`, the channel cannot be removed.
* `writable` *(boolean)* – If `false`, the channel cannot be overwritten.

```js
emitter.handle("fetchUser", (event, userId) => {
  event.send({ id: userId, name: "Alice" });
});
```

---

### 🚀 `invoke(channel, callback = null, ...args)`

Triggers a channel with arguments.

* If `callback` is provided, it receives the result passed via `event.send(data)`.
* If the channel doesn't exist yet, it waits for it to be registered.

```js
emitter.invoke("fetchUser", (data) => {
  console.log("User received:", data);
}, 42);
```

---

### ❌ `removeEvent(channel)`

Removes a registered channel if it's marked as removable.

```js
emitter.removeEvent("fetchUser");
```

---

### 🧼 `clear()`

Completely destroys the emitter instance. All operations afterward will throw an error.

```js
emitter.clear();
```

---

### 📋 `eventsList(): string[]`

Returns the list of currently registered channels.

```js
console.log(emitter.eventsList()); // ["fetchUser", "onLogin"]
```

---

### ❓ `hasEvent(channel): boolean`

Checks if a channel is currently registered.

```js
if (emitter.hasEvent("fetchUser")) {
  // Do something...
}
```

---

## ⚠️ Error Handling

`lsEmitter` throws contextual errors via a custom `EventEmitterError` class, with codes such as:

* `INVALID_CHANNEL_NAME`
* `EVENT_DESTROYED`
* `NON_WRITABLE_CHANNEL`
* `NON_REMOVABLE_CHANNEL`
* `CHANNEL_NOT_FOUND`

---

## 🧪 Example Use Case: Component-to-Component Messaging

```js
// Component A
emitter.handle("themeChanged", (event, newTheme) => {
  applyTheme(newTheme);
  event.send("Theme applied");
});

// Component B
emitter.invoke("themeChanged", (res) => {
  console.log(res); // "Theme applied"
}, "dark");
```

---

## 🧩 Integration Note

`lsEmitter` requires utility functions from `ls-utility` such as:

* `has` → for object membership
* `after` → for async timing

Be sure to import it as follows:

```js
import { lsEmitter } from "ls-utility";
```







### 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

### 🙌 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repository and submit a pull request.

---

### 💬 Feedback & Contact

If you have any questions or suggestions, feel free to open an issue on the [GitHub repository](https://github.com/Leistrap/ls-utility).
You can also reach out via the official Leistrap channels.

---

### 🧠 About Leistrap

`ls-utility` is a core part of the Leistrap ecosystem — a modular interface builder with deep extensibility and a smart internal event system (`lsEmitter`).
This package powers many dynamic features by offering lightweight, fast, and reusable utility functions across Leistrap.

---


