import './App.css'
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import { getLatestNotification } from '../utils/utils'

function App() {
  const randomId = Math.floor(Math.random() * Date.now());
  const notificationsList = [
    { id: randomId, type: 'default', value: 'New course available' },
    { id: randomId, type: 'urgent', value: 'New resume available' },
    { id: randomId, type: 'urgent', html: { __html: getLatestNotification() } },
  ];
  return (
    <>
      <div className="root-notifications">
        <Notifications notifications={notificationsList} />
      </div>

      <Header />
      <Login />
      <Footer />
    </>
  )
}

export default App
