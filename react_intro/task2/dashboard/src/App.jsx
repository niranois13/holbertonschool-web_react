import './App.css'
import logo from './assets/holberton-logo.jpg';
import { getCurrentYear, getFooterCopy } from './utils';
import Notifications from './Notifications';

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>

      <div className="App-header">
        <img alt="holberton logo" src={logo}></img>
        <h1>School dashboard</h1>
      </div>

      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">email</label>
          <input type="email" id="email"></input>
          
          <label htmlFor="password">password</label>
          <input type="password" id="password"></input>
          <button type="submit">OK</button>
        </form>
      </div>

      <div className="App-footer">
        <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      </div>
    </>
  )
}

export default App
