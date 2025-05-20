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
      displayDrawer: false,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
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

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  render() {
    let {
      isLoggedIn
    } = this.props || false;

    let {
      displayDrawer
    } = this.state;

    let notificationsList = [
      { 
        id: Math.floor(Math.random() * Date.now()), 
        type: 'default', 
        value: 'New course available' 
      },
      { 
        id: Math.floor(Math.random() * Date.now()), 
        type: 'urgent', 
        value: 'New resume available' },
      { 
        id: Math.floor(Math.random() * Date.now()), 
        type: 'urgent', 
        html: { __html: getLatestNotification() } },
    ];

    let coursesList = [
      { 
        id: 1, 
        name: 'ES6', 
        credit: 60 
      },
      { 
        id: 2, 
        name: 'Webpack', 
        credit: 20 
      },
      { 
        id: 3, 
        name: 'React', 
        credit: 40 
      },
    ];

    return (
      <div className={css(styles.app)}>
        <div className={css(styles.rootNotifications)}>
          <Notifications
            notifications={notificationsList}
            displayDrawer={displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
          />
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
  body: {
    margin: 0,
    padding: 0,
  },
  app: {
    height: '100%',
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif',
  },
  appBody: {
    maxHeight: '75vh',
  },
  appFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: `3px solid ${hbtnRed}`,
    height: '2dvh',
    fontStyle: 'italic',
    fontSize: '0.9rem',
  },
});

App.propTypes = {
  logOut: PropTypes.func,
};

App.defaultProps = {
  logOut: () => {},
  isLoggedIn: false,
};

export default App;
