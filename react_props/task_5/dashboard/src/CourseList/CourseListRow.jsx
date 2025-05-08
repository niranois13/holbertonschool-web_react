import React from "react";

export default function CourseListRow({ isHeader=false, textFirstCell="", textSecondCell=null }) {
return (
	<tr>
		{isHeader ? (
			textSecondCell === null ? (
				<th colSpan="2">{textFirstCell}</th>
			) : (
				<>
					<th style={{ width: '70%'}}>{textFirstCell}</th>
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