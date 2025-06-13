import './Header.css';
import logo from '../../assets/holberton-logo.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

export default function Header() {
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className="header">
      <img src={logo} className="logo" alt="holberton logo" />
      <h1 className="title">School Dashboard</h1>
      {isLoggedIn && (
        <div className="logout-section" id="logoutSection">
          Welcome <b>{user.email}</b>{' '}
          <a href="#" onClick={handleLogOut}>
            (logout)
          </a>
        </div>
      )}
    </div>
  );
}
