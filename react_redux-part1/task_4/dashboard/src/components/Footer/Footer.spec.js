import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';
import { StyleSheetTestUtils } from "aphrodite";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import coursesReducer from '../../features/courses/coursesSlice';
import notificationsReducer from '../../features/notifications/notificationsSlice';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});


export function renderWithProvider(ui, preloadedState = {}) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      courses: coursesReducer,
      notifications: notificationsReducer,
    },
    preloadedState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe('Footer Component', () => {
  describe('Basic Rendering', () => {
    test('Renders without crashing', () => {
      renderWithProvider(<Footer />);
      const footerParagraph = screen.getByText(`Copyright ${getCurrentYear()} - ${getFooterCopy(true)}`);
      expect(footerParagraph).toHaveTextContent(/copyright \d{4} - holberton school/i);
    });

    test('Does not render contact link when user is not logged in', () => {
      renderWithProvider(<Footer />);
      const link = screen.queryByRole('link', { name: /contact us/i });
      expect(link).not.toBeInTheDocument();
    });

    test('Renders contact link when user is logged in', () => {
      const preloadedState = {
        auth: { user: { email: 'test@testing.tst', password: '12345678' }, isLoggedIn: true },
      };
      renderWithProvider(<Footer />, preloadedState);
      const link = screen.getByRole('link', { name: /contact us/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe('Edge Scenarios', () => {
    test('does not render contact link when user email is null', () => {
      const preloadedState = {
        auth: { user: { email: null }, isLoggedIn: false },
      };
      renderWithProvider(<Footer />, preloadedState);
      const link = screen.queryByRole('link', { name: /contact us/i });
      expect(link).not.toBeInTheDocument();
    });

    test('Does not render contact link when user email is invalid', () => {
      const preloadedState = {
        auth: { isLoggedIn: false },
      };

      renderWithProvider(<Footer />, preloadedState);

      const link = screen.queryByRole('link', { name: /contact us/i });
      expect(link).not.toBeInTheDocument();
    });
  });

  test('Should confirm Footer is a functional component', () => {
    const FooterPrototype = Object.getOwnPropertyNames(Footer.prototype);
    expect(FooterPrototype).toEqual(expect.arrayContaining(['constructor']));
    expect(FooterPrototype).toHaveLength(1);
    expect(Footer.prototype.__proto__).toEqual({});
  });
});
