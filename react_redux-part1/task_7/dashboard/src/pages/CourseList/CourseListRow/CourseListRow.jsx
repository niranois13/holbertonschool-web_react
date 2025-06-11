function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  if (isHeader) {
    if (textSecondCell === null || textSecondCell === undefined) {
      return (
        <tr>
          <th>{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>{textFirstCell}</th>
          <th>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr>
        <td>{textFirstCell}</td>
        <td>{textSecondCell}</td>
      </tr>
    );
  }
}

export default CourseListRow;
