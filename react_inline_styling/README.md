# 📘 React Inline Styling

React allows you to style components directly using JavaScript objects. This method is called **inline styling**. It's useful for applying dynamic styles or keeping styles scoped to a specific component.

## ✍️ Basic Syntax

In React, you pass a style object to the `style` prop:

```
const MyComponent = () => {
  return (
    <div style={{ color: 'blue', fontSize: '20px' }}>
      Hello, world!
    </div>
  );
};
```

> ⚠️ Note: Style keys are written in **camelCase**, not with hyphens.

## 🧠 Example

```
const boxStyle = {
  backgroundColor: 'lightgray',
  padding: '10px',
  borderRadius: '8px',
};

const Box = () => {
  return <div style={boxStyle}>This is a styled box.</div>;
};
```

## 🔄 Dynamic Styling

You can compute styles based on props or state:

```
const Button = ({ primary }) => {
  const style = {
    backgroundColor: primary ? 'blue' : 'gray',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
  };

  return <button style={style}>Click Me</button>;
};
```

## ✅ Pros

* Easy to use for small, component-scoped styles
* Dynamic styling is simple with JavaScript

## ❌ Cons

* No support for pseudo-classes (like `:hover`)
* Harder to manage for large stylesheets
* Cannot define media queries or animations

## ✅ When to Use

* Quick styling for small components
* Styling that depends on props or state
* Prototyping
