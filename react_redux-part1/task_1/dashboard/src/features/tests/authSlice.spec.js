import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  };

  it('should return the initial state by default', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should hanle login action', () => {
    const action = login({email: 'test@testing.test', password: '12345678'});
    const state = authReducer(initialState, action);

    expect(state.user.email).toBe('test@testing.test');
    expect(state.user.password).toBe('12345678');
    expect(state.isLoggedIn).toBe(true);
  });

  it('should handle logout action', () => {
    const stateLoggedIn = {
      user: {
        email: 'test@testing.test',
        password: '12345678',
      },
      isLoggedIn: true,
    };

    const state = authReducer(stateLoggedIn, logout());

    expect(state.user.email).toBe('');
    expect(state.user.password).toBe('');
    expect(state.isLoggedIn).toBe(false);
  });
});
