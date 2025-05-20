# React State

## 🧠 What is React State?

**React state** is a built-in object that stores property values that belong to a component. When the state of a component changes, React automatically re-renders the component to reflect the new data.

In functional components, state is managed using the `useState` hook:

```
const [count, setCount] = useState(0);
```

In class components, it's managed with `this.state` and updated with `this.setState()`:

```
this.state = { count: 0 };
this.setState({ count: this.state.count + 1 });
```

State is used to handle **dynamic data**, such as user input, toggles, fetched data, and more.

---

## 📚 Resources

Make sure to read/watch the following:

* [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
* [setState and Callback](https://reactjs.org/docs/react-component.html#setstate)
* [Passing Data with Context](https://reactjs.org/docs/context.html)
* [Context API on Class Components](https://reactjs.org/docs/context.html#classcontexttype)
* [Forms and Controlled Components](https://reactjs.org/docs/forms.html)
* [Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)
* [State Hook](https://reactjs.org/docs/hooks-state.html)

---

## 🎯 Learning Objectives

By the end of this project, you should be able to:

* ✅ Explain what **component state** and **container state** are
* 🔄 Describe the **lifecycle of a React component**
* ⚙️ Update state and run code in the correct order using `setState`
* 📝 Create and manage **controlled components** in forms
* 🧩 Reuse small, **pure components** and **lift state** to parent containers
* 🔧 Use the **React State Hook** (`useState`) and build custom hooks
* 🌐 Pass data deeply using the **Context API**

---

## ✅ Best Practices

* Use **functional components** with hooks where applicable
* Keep components **pure and reusable**
* Use **state wisely** – lift when necessary
* Handle **form inputs** with controlled components
* Manage **side effects** with lifecycle methods or `useEffect`
* Use **context** for deep prop sharing without prop drilling
