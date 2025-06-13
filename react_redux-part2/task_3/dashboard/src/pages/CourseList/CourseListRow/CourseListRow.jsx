import './CourseListRow.css';

function CourseListRow({
  id,
  isHeader,
  textFirstCell,
  textSecondCell,
  style,
  isChecked,
  onChange,
}) {
  const cellClass = style?.className || 'course-cell';

  if (isHeader) {
    if (textSecondCell === null || textSecondCell === undefined) {
      return (
        <tr>
          <th className={cellClass} colSpan="2">{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th className={cellClass}>{textFirstCell}</th>
          <th className={cellClass}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr>
        <td className={cellClass}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onChange?.(id, e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          {textFirstCell}
        </td>
        <td className={cellClass}>{textSecondCell}</td>
      </tr>
    );
  }
}

export default CourseListRow;
