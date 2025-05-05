import './App.css'
import logo from '../src/assets/holberton-logo.jpg';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import Notifications from '../Notifications/Notifications';

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

        <div className='Appy-body-login'>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email"/>
          
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password"/>

          <button>OK</button>
        </div>
      </div>

      <div className="App-footer">
        <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      </div>
    </>
  )
}

export default App
