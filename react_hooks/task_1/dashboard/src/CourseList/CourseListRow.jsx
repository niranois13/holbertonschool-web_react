import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
    const rowClass = isHeader ? styles.headerRow : styles.defaultRow;
    const thFirstClass = css(styles.thFirstCell);
    const thSecondClass = css(styles.thSecondCell);

    return (
        <tr className={css(rowClass)}>
            {isHeader ? (
                textSecondCell === null ? (
                    <th colSpan="2" className={thFirstClass}>{textFirstCell}</th>
                ) : (
                    <>
                        <th className={thFirstClass}>{textFirstCell}</th>
                        <th className={thSecondClass}>{textSecondCell}</th>
                    </>
                )
            ) : (
                <>
                    <td>{textFirstCell}</td>
                    <td>{textSecondCell}</td>
                </>
            )}
        </tr>
    );
}

CourseListRow.propTypes = {
    isHeader: PropTypes.bool,
    textFirstCell: PropTypes.string.isRequired,
    textSecondCell: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

const styles = StyleSheet.create({
    defaultRow: {
        backgroundColor: '#f5f5f5ab',
    },
    headerRow: {
        backgroundColor: '#deb5b545',
    },
    thFirstCell: {
        textAlign: 'left',
        width: '70%',
        borderBottom: '1px solid #ccc',
    },
    thSecondCell: {
        textAlign: 'left',
        borderBottom: '1px solid #ccc',
    },
});
