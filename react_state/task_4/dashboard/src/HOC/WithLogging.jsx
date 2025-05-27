import React from 'react';

const WithLogging = (WrappedComponent) => {
    const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    class HOC extends React.Component {
        componentDidMount() {
            console.log(`Component ${wrappedName} is mounted`);
        }
        componentWillUnmount() {
            console.log(`Component ${wrappedName} is going to unmount`);
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
    HOC.displayName = `WithLogging(${wrappedName})`;

    return HOC;
};

export default WithLogging;
