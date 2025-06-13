import WithLogging from '../../components/HOC/WithLogging';
import useLogin from '../../hooks/useLogin';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import './Login.css';

function Login() {
  const dispatch = useDispatch();

  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  } = useLogin({
    onLogin: (email, password) => dispatch(login({ email, password })),
  });

  return (
    <form aria-label="form" onSubmit={handleLoginSubmit}>
      <div className="login-body">
        <p className="login-paragraph">Login to access the full dashboard</p>
        <div className="login-form">
          <label htmlFor="email" className="login-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleChangeEmail}
            className="login-input"
          />
          <label htmlFor="password" className="login-label">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChangePassword}
            className="login-input"
          />
          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
            className="login-button"
          />
        </div>
      </div>
    </form>
  );
}

export default WithLogging(Login);
