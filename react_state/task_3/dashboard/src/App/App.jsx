import React, { Component } from 'react';
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
import newContext from '../Context/context';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);
const ContextProvider = newContext.Provider;

const generateId = () => Math.floor(Math.random() * Date.now());

const coursesList = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
];

const notificationsList = [
    { id: generateId(), type: 'default', value: 'New course available' },
    { id: generateId(), type: 'urgent', value: 'New resume available' },
    { id: generateId(), type: 'urgent', html: { __html: getLatestNotification() } },
];

class App extends Component {
    state = {
        user: {
            email: '',
            password: '',
            isLoggedIn: false,
        },
        displayDrawer: false,
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.body.className = css(styles.body);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (e) => {
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            alert('Logging you out');
            this.logOut();
        }
    };

    handleDisplayDrawer = () => this.setState({ displayDrawer: true });
    handleHideDrawer = () => this.setState({ displayDrawer: false });

    logIn = (email, password) => {
        this.setState({
            user: {
                email,
                password,
                isLoggedIn: true,
            },
        });
    };

    logOut = () => {
        this.setState({
            user: {
                email: '',
                password: '',
                isLoggedIn: false,
            },
        });
    };

    renderMainContent() {
        const { user } = this.state;
        return user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
                <CourseListWithLogging courses={coursesList} />
            </BodySectionWithMarginBottom>
        ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
                <LoginWithLogging
                    logIn={this.logIn}
                    email={user.email}
                    password={user.password}
                />
            </BodySectionWithMarginBottom>
        );
    }

    render() {
        const { user, displayDrawer } = this.state;
        const { logOut } = this;

        return (
            <ContextProvider value={({ user, logOut })}>
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
                        {this.renderMainContent()}
                        <BodySection title="News from the School">
                            <p>Holberton School News goes here</p>
                        </BodySection>
                    </div>

                    <Footer />
                </div>
            </ContextProvider>
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
    rootNotifications: {
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        maxWidth: '500px',
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

export default App;
