import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import WithLogging from '../HOC/WithLogging';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn || false,
      notificationsList: [
        { id: Math.floor(Math.random() * Date.now()), type: 'default', value: 'New course available' },
        { id: Math.floor(Math.random() * Date.now()), type: 'urgent', value: 'New resume available' },
        { id: Math.floor(Math.random() * Date.now()), type: 'urgent', html: { __html: getLatestNotification() } },
      ],
      coursesList: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ],
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  }

  render() {
    const { isLoggedIn, notificationsList, coursesList } = this.state;

    return (
      <div className={css(styles.app)}>
        <div className={css(styles.rootNotifications)}>
          <Notifications notifications={notificationsList} displayDrawer={true} />
        </div>

        <Header />

        <div className={css(styles.appBody)}>
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseListWithLogging courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <LoginWithLogging />
            </BodySectionWithMarginBottom>
          )}

          <BodySection title="News from the School">
            <p>Holberton School News goes here</p>
          </BodySection>
        </div>

        <Footer />
      </div>
    );
  }
}

const hbtnRed = '#e1003c';

const styles = StyleSheet.create({
  app: {
    height: '100%',
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif',
  },
  rootNotifications: {
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    maxWidth: '500px',
  },
  appBody: {
    minHeight: '55vh',
  },
  appFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `3px solid ${hbtnRed}`,
    minHeight: '5vh',
    fontStyle: 'italic',
    fontSize: '0.9rem',
  },
});

App.propTypes = {
  logOut: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  logOut: () => {},
  isLoggedIn: false,
};

export default App;
