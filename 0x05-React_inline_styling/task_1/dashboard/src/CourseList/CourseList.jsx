import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from './CourseListRow';

export default function CourseList({ courses = [] }) {
	return (
		<table className={css(styles.courseList)}>
			{courses.length > 0 ? (
				<>
					<thead>
						<CourseListRow isHeader={true} textFirstCell="Available courses" />
						<CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
					</thead>
					<tbody>
						{courses.map((course) => (
							<CourseListRow
								key={course.id}
								textFirstCell={course.name}
								textSecondCell={course.credit}
							/>
						))}
					</tbody>
				</>
			) : (
				<tbody>
					<CourseListRow isHeader={true} textFirstCell="No course available yet" />
				</tbody>
			)}
		</table>
	);
}

CourseList.propTypes = {
	courses: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
			credit: PropTypes.number,
		})
	),
};

const styles = StyleSheet.create({
	courseList: {
		width: '100%',
		border: '1px solid gray',
		borderCollapse: 'collapse',

		'th': {
			border: '1px solid gray',
			padding: '8px',
		},
		'td': {
			border: '1px solid gray',
			padding: '8px',
		},
	},
});
