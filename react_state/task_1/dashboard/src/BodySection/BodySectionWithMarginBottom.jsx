import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import BodySection from './BodySection';

const BodySectionWithMarginBottom = ({ title, children }) => {
    return (
        <div className={`${css(styles.bodySectionWithMargin)} bodySectionWithMargin`}>
            <BodySection title={title}>{children}</BodySection>
        </div>
    );
};

const styles = StyleSheet.create({
    bodySectionWithMargin: {
        marginBottom: '40px',
    },
});

BodySectionWithMarginBottom.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default BodySectionWithMarginBottom;
