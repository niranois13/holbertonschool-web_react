# TypeScript

![TypeScript]()

TypeScript is a **strongly typed** programming language that builds on JavaScript, giving you better tooling at any scale. It’s developed and maintained by Microsoft and is often used to catch errors early through a type system and to make JavaScript code more predictable and easier to debug.

---

## 🔧 Why Use TypeScript?

- **Optional Static Typing**: Catch common bugs at compile time instead of runtime.
- **Better IDE Support**: Autocomplete, type checking, and more helpful hints.
- **Improved Code Readability**: Types make the intent of code clearer.
- **Large Scale Development**: Great for teams and big codebases.

---

## 🚀 Getting Started

### 1. Install TypeScript

```
npm install -g typescript
```

### 2. Compile a TypeScript File

```
tsc your-file.ts
```

This creates a `your-file.js` file.

### 3. Initialize a Project

```
tsc --init
```

This creates a `tsconfig.json` to configure your TypeScript project.

---

## 🧠 Basic Syntax

### Types

```
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;
```

### Functions

```
function greet(user: string): string {
  return `Hello, ${user}!`;
}
```

### Interfaces

```
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Bob",
  age: 25,
};
```

### Classes

```
class Person {
  constructor(public name: string, public age: number) {}

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}
```

---

## 📦 Useful Tools

- **ts-node**: Run TypeScript files directly.
- **ESLint + TypeScript Plugin**: Linting for better code quality.
- **Prettier**: Auto-formats your code.

---

## 📚 Resources

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [TS Playground](https://www.typescriptlang.org/play)

---

## ✅ Conclusion

TypeScript makes JavaScript development more reliable and scalable. Whether you're building a small project or a large application, TypeScript helps you write safer and cleaner code.

---
