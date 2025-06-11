import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';
import { StyleSheetTestUtils } from "aphrodite";
import authReducer from '../../features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

let store;

beforeEach(() => {
  store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: {
          email: 'user@example.com',
          password: 'password123'
        },
        isLoggedIn: true
      }
    }
  });

  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  jest.restoreAllMocks();
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

function renderWithProvider(ui) {
  return render(<Provider store={store}>{ui}</Provider>);
}

export const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '');
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    console.log({ hex })
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
};

test('Should contain a <p/> element with specific text, <h1/>, and an <img/>', () => {
  renderWithProvider(<Header />);
  const headingElement = screen.getByRole('heading', { name: /school Dashboard/i });
  const imgElement = screen.getByAltText('holberton logo')
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveStyle({ color: convertHexToRGBA('#e1003c') })
  expect(imgElement).toBeInTheDocument();
});

test('Should confirm Header is a functional component', () => {
  const HeaderPrototype = Object.getOwnPropertyNames(Header.prototype);
  expect(HeaderPrototype).toEqual(expect.arrayContaining(["constructor"]))
  expect(HeaderPrototype).toHaveLength(1)
  expect(Header.prototype.__proto__).toEqual({})
});

jest.mock('../assets/holberton-logo.jpg', () => 'mocked-path.jpg');

describe('Header Component', () => {
  describe('When user is logged out', () => {
    beforeEach(() => {
      renderWithProvider(<Header />);
    });

    test('Renders basic header elements', () => {
      expect(screen.getByRole('img')).toHaveAttribute('src', 'mocked-path.jpg');
      expect(screen.getByRole('heading')).toHaveTextContent('School Dashboard');
    });

    test('Does not render logout section', () => {
      expect(screen.queryByTestId('logoutSection')).not.toBeInTheDocument();
    });
  });

  describe('When user is logged in', () => {
    beforeEach(() => {
      renderWithProvider(<Header />);
    });

    test('Renders welcome message with user email', () => {
      expect(screen.getByText('Welcome')).toBeInTheDocument();
      expect(screen.getByText('user@example.com')).toBeInTheDocument();
    });

    test('Renders logout link', () => {
      expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
    });

    test('Clicking logout removes logout section', () => {
      expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
      expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();

      fireEvent.click(screen.getByRole('link', { name: /logout/i }));

      expect(screen.queryByRole('link', { name: /logout/i })).not.toBeInTheDocument();
      expect(screen.queryByText(/user@example.com/i)).not.toBeInTheDocument();
    });

    test('Displays logoutSection when user is logged in', () => {
      const { container } = renderWithProvider(<Header />);
      const logoutSection = container.querySelector('div#logoutSection');
      expect(logoutSection).toBeInTheDocument();
    });
  });
});
