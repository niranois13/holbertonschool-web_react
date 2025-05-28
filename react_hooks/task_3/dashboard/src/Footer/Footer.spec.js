// Footer.spec.js
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import newContext from '../Context/context';

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByText(/holberton school/i)).toBeInTheDocument();
  });

  it('does not render Contact us when user is logged out', () => {
    const ContextProvider = newContext.Provider;
    const user = { email: '', password: '', isLoggedIn: false };
    render(
      <ContextProvider value={{ user }}>
        <Footer />
      </ContextProvider>
    );
    expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
  });

  it('renders Contact us when user is logged in', () => {
    const ContextProvider = newContext.Provider;
    const user = { email: 'test@test.com', password: 'password123', isLoggedIn: true };
    render(
      <ContextProvider value={{ user }}>
        <Footer />
      </ContextProvider>
    );
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
