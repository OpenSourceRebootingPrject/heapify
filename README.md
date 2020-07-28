
![Heapify](logo.png)

[![codecov](https://img.shields.io/codecov/c/github/luciopaiva/heapify)](https://codecov.io/gh/luciopaiva/heapify)
[![travis](https://api.travis-ci.com/luciopaiva/heapify.svg?branch=master)](https://travis-ci.com/luciopaiva/heapify) 
[![version](https://img.shields.io/npm/v/heapify?color=brightgreen&label=version)](https://www.npmjs.com/package/heapify)

🚑 🚴 🚌 🚕 🚗 🚚 🚛

A very fast JavaScript priority queue, implemented using a binary heap, which in turn is implemented using two underlying parallel [typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray). No dependencies whatsoever; just plain, vanilla JS.

It's the fastest publicly available JavaScript library implementation of a priority queue. Here's an average benchmark comparing Heapify with [TinyQueue](https://github.com/mourner/tinyqueue/) and [FlatQueue](https://github.com/mourner/flatqueue), running for 1 million elements:

```
              build     push       pop     push+pop
TinyQueue     110ms    110ms     624ms        205ms
FlatQueue      85ms     85ms     157ms        112ms
Heapify        32ms     41ms     150ms        112ms 
```

*Host machine: 2.4 GHz Dual-Core Intel Core i7, 16 GB RAM.*

*Note: the build operation doesn't actually exist in TinyQueue and FlatQueue, so it has to be replaced with a manual push operation. That's why build times for those two cases are the same as for push.*

# Table of contents

- [Features](#features)
- [How to install](#how-to-install)
- [Basic usage](#basic-usage)
- [Contributing](#contributing)
- [API](#api)
  - [new Heapify()](#new-heapifycapacity--64-keys---priorities---keysbackingarraytype--uint32array-prioritiesbackingarraytype--uint32array)
  - [capacity](#capacity)
  - [clear()](#clear)
  - [peek()](#peek)
  - [peekPriority()](#peekpriority)
  - [pop()](#pop)
  - [push(key, priority)](#pushkey-priority)
  - [size](#size)

## Features

Supported queue operations:

- push: O(log n)
- pop: O(log n)
- peek: O(1)
- creation with pre-existing list of priorities: O(n)

Other features:

- runs on browser and Node.js with support to ES6 modules
- tiny code base (under 200 LoC)
- no dependencies
- supports several types of priorities and keys

## How to install

```sh
npm i heapify
```

Or if you're a yarn person:

```sh
yarn add heapify
```

If you're on a browser, there's also the option of using a CDN:

```js
import Heapify from "https://unpkg.com/heapify"
```

And to import a specific version:

```js
import Heapify from "https://unpkg.com/heapify@0.2.1"
```

## Basic usage

```js
import Heapify from "heapify";

const queue = new Heapify();
queue.push(1, 10);
queue.push(2, 5);
queue.pop();  // 2
queue.peek();  // 1
queue.clear();
queue.pop();  // undefined
```

See the API section below for more details.

## Contributing

You are welcome to contribute, but please take the time to read and follow [these guidelines](CONTRIBUTING.md).

## API

### new Heapify(capacity = 64, keys = [], priorities = [], KeysBackingArrayType = Uint32Array, PrioritiesBackingArrayType = Uint32Array)

Creates a new priority queue. Parameters are:

- `capacity`: the size of the underlying typed arrays backing the heap;
- `keys`: an optional array of pre-existing keys. Provide `[]` to skip this field;
- `priorities`: an optional array of pre-existing priorities. Must match number of keys above. Provide `[]` to skip this field;
- `KeysBackingArrayType`: the array type to be used for keys;
- `PrioritiesBackingArrayType`: the array type to be used for priorities.

Example:

```js
const queue1 = new Heapify(32);
const queue2 = new Heapify(16, [], [], Uint16Array, Uint32Array);
```

### capacity

A read-only property that returns the maximum capacity of the queue. Example:

```js
const queue = new Heapify(32);
queue.capacity;  // 32
```

### clear()

Effectively empties the queue. The heap capacity is not changed, nor its elements get erased in any way; it's just the variable that tracks the length that gets cleared to zero, so it's a very cheap operation.

Example:

```js
const queue = new Heapify();
queue.push(1, 10);
console.info(queue.size);  // 1
queue.clear();
console.info(queue.size);  // 0
```

### peek()

Gets the key with the smallest priority, but does not remove it from the queue.

Example:

```js
const queue = new Heapify();
queue.push(1, 10);
queue.peek();  // 1
```

### peekPriority()

Gets the _priority_ of the key with the smallest priority, but does not remove the item from the queue.

Example:

```js
const queue = new Heapify();
queue.push(1, 10);
queue.peekPriority();  // 10
```

### pop()

Removes the smallest priority item from the queue, returning its key. Returns `undefined` if the queue is empty. 

Example:

```js
const queue = new Heapify();
queue.push(1, 10);
queue.pop();  // 1
```

### push(key, priority)

Adds a new item to the queue with a given `key` and `priority`. Will throw an error if the queue is already at its capacity.

Example:

```js
const queue = new Heapify();
queue.push(1, 10);
queue.size;  // 1
queue.peek();  // 1
queue.peekPriority();  // 10
```

### size

A read-only property that returns the current size of the queue.

Example:

```js
const queue = new Heapify();
queue.size;  // 0
queue.push(1, 10);
queue.size;  // 1
queue.pop();
queue.size;  // 0
```
