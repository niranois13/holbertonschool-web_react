# React Hooks - Quick Overview

React Hooks are functions that let you use state and other React features in functional components.

## 📌 Why Hooks?

Before Hooks, state and lifecycle features were only available in class components. Hooks let you use them in functional components, making your code cleaner and easier to reuse.

## 🔧 Common Hooks

### 1. `useState`
Used to manage local component state.

```
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};
````

### 2. `useEffect`

Runs side effects (like data fetching, subscriptions, etc).

```
import { useEffect } from 'react';

useEffect(() => {
  console.log('Component mounted');

  return () => {
    console.log('Component unmounted');
  };
}, []);
```

### 3. `useContext`

Accesses values from React Context.

```
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemedComponent = () => {
  const theme = useContext(ThemeContext);
  return <div style={{ background: theme.background }}>Hello</div>;
};
```

## 📘 Other Useful Hooks

* `useRef` – Mutable ref container
* `useReducer` – Alternative to `useState` for complex state logic
* `useMemo` – Memoizes expensive calculations
* `useCallback` – Memoizes functions

## 📦 Custom Hooks

You can create your own hooks to reuse logic:

```
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};
```

## 🚀 Summary

Hooks let you:

* Use state and lifecycle methods in functional components
* Share logic easily with custom hooks
* Write cleaner, reusable code

---

📖 Learn more at [reactjs.org/docs/hooks-intro.html](https://reactjs.org/docs/hooks-intro.html)
