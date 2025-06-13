import { css } from 'aphrodite';

function CourseListRow({
  id,
  isHeader,
  textFirstCell,
  textSecondCell,
  style,
  isChecked,
  onChange,
}) {
  if (isHeader) {
    if (textSecondCell === null || textSecondCell === undefined) {
      return (
        <tr>
          <th className={css(style)} colSpan="2">{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th className={css(style)}>{textFirstCell}</th>
          <th className={css(style)}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr>
        <td className={css(style)}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onChange?.(id, e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          {textFirstCell}
        </td>
        <td className={css(style)}>{textSecondCell}</td>
      </tr>
    );
  }
}

export default CourseListRow;
