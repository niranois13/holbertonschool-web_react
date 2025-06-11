// import { StyleSheet, css } from 'aphrodite';
import logo from '../../assets/holberton-logo.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

// const styles = StyleSheet.create({
//   header: {
//     display: 'inline-flex',
//     alignItems: 'center',
//     fontSize: '20px',
//     fontFamily: 'sans-serif',
//   },
//   title: {
//     color: '#e1003c',
//     fontFamily: "'Roboto', sans-serif",
//     fontWeight: 'bold',
//     fontSize: '2.5rem',
//     margin: 0,
//   },
//   logo: {
//     height: '30vmin',
//     pointerEvents: 'none',
//   },
//   logoutSection: {
//     marginLeft: 'auto',
//     fontSize: '1rem',
//   },
// });

export default function Header() {
  const { user, isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div>
      <img src={logo} alt="holberton logo" />
      <h1>School Dashboard</h1>
      {isLoggedIn && (
        <div id="logoutSection">
          Welcome <b>{user.email}</b>{' '}
          <a href="#" onClick={handleLogOut}>
            (logout)
          </a>
        </div>
      )}
    </div>
  );
}
