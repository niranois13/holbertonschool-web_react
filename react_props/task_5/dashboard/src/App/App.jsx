import './App.css'
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils'
import React from 'react';

function App() {
  const isLoggedIn = false;

  const notificationsList = [
    { id: Math.floor(Math.random() * Date.now()), type: 'default', value: 'New course available' },
    { id: Math.floor(Math.random() * Date.now()), type: 'urgent', value: 'New resume available' },
    { id: Math.floor(Math.random() * Date.now()), type: 'urgent', html: { __html: getLatestNotification() } },
  ];

  const coursesList = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  return (
    <React.Fragment>
      <div className="root-notifications">
        <Notifications notifications={notificationsList} displayDrawer={false}/>
      </div>

      <Header />
      {isLoggedIn ? <CourseList courses={coursesList} /> : <Login />}
      <Footer />
    </React.Fragment>
  )
}

export default App
