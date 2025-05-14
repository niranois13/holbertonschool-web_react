import React from "react";

const rowStyle = { backgroundColor: '#f5f5f5ab' };
const headerStyle = { backgroundColor: '#deb5b545' };

export default function CourseListRow({ isHeader = false, textFirstCell = "", textSecondCell = null }) {
    return (
        <tr style={isHeader ? headerStyle : rowStyle}>
            {isHeader ? (
                textSecondCell === null ? (
                    <th colSpan="2">{textFirstCell}</th>
                ) : (
                    <>
                        <th style={{ width: '70%' }}>{textFirstCell}</th>
                        <th>{textSecondCell}</th>
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
