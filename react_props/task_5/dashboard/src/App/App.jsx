import './App.css'
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils'
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
    <>
      <div className="root-notifications">
        <Notifications notifications={notificationsList} displayDrawer={true}/>
      </div>

      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn ? <CourseList courses={coursesList} /> : <Login />}
      <Footer />
    </>
  )
}

export default App
