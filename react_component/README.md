# React Components

This guide provides a simple introduction to React components — the building blocks of any React application.

## 📦 What is a React Component?

A **React component** is a reusable piece of UI. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

There are two main types:
- **Functional Components** (preferred in modern React)
- **Class Components** (older, but still used in some codebases)

## 🧱 Functional Component Example

```
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
````

Usage:
```
<Welcome name="Alice" />
```

## ⚙️ Class Component Example

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

## 🧠 State in Components

Use `useState` in functional components to handle state:

```
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## 🧩 Component Composition

Components can contain other components:

```
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
```

## ✅ Best Practices

* Keep components small and focused.
* Use functional components with hooks.
* Name components with PascalCase (`MyComponent`).
* Reuse and organize components into folders.

## 📚 Learn More

* [React Docs](https://reactjs.org/docs/getting-started.html)
* [Hooks Overview](https://reactjs.org/docs/hooks-overview.html)
