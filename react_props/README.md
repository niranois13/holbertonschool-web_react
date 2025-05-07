# React Props Explained


Props (short for "properties") are a way to pass data from one component to another in React. They allow components to be **reusable** and **dynamic**.

## 🧠 What Are Props?

Props are inputs to a React component. They are passed as attributes when a component is used, and they are received as an object in the component function.

```
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
````

## 📦 How to Use Props

1. **Pass props to a component:**

```
<Greeting name="Alice" />
```

2. **Access props in the component:**

```
function Greeting(props) {
  return <p>Hi, {props.name}!</p>;
}
```

You can also use **destructuring** for cleaner code:

```
function Greeting({ name }) {
  return <p>Hi, {name}!</p>;
}
```

## 💡 Why Use Props?

* Make components reusable
* Customize content
* Pass dynamic data between components

## 🛠️ Example

```
function WelcomeMessage({ user }) {
  return <h2>Welcome, {user}!</h2>;
}

function App() {
  return (
    <div>
      <WelcomeMessage user="John" />
      <WelcomeMessage user="Jane" />
    </div>
  );
}
```

### Output:

```
Welcome, John!
Welcome, Jane!
```

## 📌 Key Points

* Props are **read-only**
* You pass them like HTML attributes
* Use them to make components flexible

## 📚 Learn More

* [React Docs - Props](https://reactjs.org/docs/components-and-props.html)

