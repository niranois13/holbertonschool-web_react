# React Redux

This guide provides a quick and simple introduction to using **Redux Toolkit** with **React**.

## 🔧 What is Redux Toolkit?

Redux Toolkit (RTK) is the official, recommended way to write Redux logic. It simplifies store setup and reduces boilerplate code.

> RTK helps you write cleaner and more efficient Redux code.

## 📦 Installation

Make sure you have `react`, `react-redux`, and `@reduxjs/toolkit` installed:

```
npm install @reduxjs/toolkit react-redux
````

## 📁 Project Structure (example)

```
src/
├── app/
│   └── store.js
├── features/
│   └── counter/
│       ├── counterSlice.js
│       └── Counter.jsx
└── App.jsx
```

---

## 🛠️ Step-by-Step Setup

### 1. **Create the Redux store**

```
// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

---

### 2. **Create a slice**

```
// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

---

### 3. **Connect Redux to React**

```
// src/main.jsx or src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

### 4. **Use the slice in a component**

```
// src/features/counter/Counter.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
}
```

---

## ✅ Why Redux Toolkit?

* 🚀 Simplifies Redux setup
* ✨ Built-in Immer for immutability
* 🧪 Great for scaling applications

---

## 📚 Documentation

* [Redux Toolkit Docs](https://redux-toolkit.js.org/)
* [React Redux Docs](https://react-redux.js.org/)
