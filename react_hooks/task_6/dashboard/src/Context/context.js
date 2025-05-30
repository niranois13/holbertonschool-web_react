import React from 'react';

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const defaultLogOut = () => {};

const newContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export default newContext;
