import { render, screen } from "@testing-library/react";
import CourseListRow from "./CourseListRow";

describe('When isHeader is true', () => {
  test('Check whether the component renders one columnheader that has the attributecolspan = 2', () => {
    render(
      <table>
        <tbody>
        <CourseListRow isHeader={true} textFirstCell="test OnlyOneCell" />
        </tbody>
      </table>
  );

    const cols = screen.getAllByRole('columnheader');

    expect(cols).toHaveLength(1);
    expect(cols[0]).toHaveAttribute('colspan', '2');
  })
  test('Check whether the component renders 2 <th> cells', () => {
    render(
      <table>
        <tbody>
        <CourseListRow isHeader={true} textFirstCell="test firstCell" textSecondCell="testSecondCell" />
        </tbody>
      </table>
  );

    const cols = screen.getAllByRole('columnheader');

    expect(cols).toHaveLength(2);
  })
});

describe('When isHeader is false', () => {
  test('Check to test the component renders correctly two td elements within a tr element', () => {
    render(
      <table>
        <tbody>
        <CourseListRow isHeader={false} textFirstCell="test firstCell" textSecondCell="testSecondCell" />
        </tbody>
      </table>
  );
  const row = screen.getByRole('row');
  const cells = screen.getAllByRole('cell');

  expect(row).toBeInTheDocument();
  expect(cells).toHaveLength(2);

  expect(cells[0]).toHaveTextContent("test firstCell");
  expect(cells[1]).toHaveTextContent("testSecondCell");
  })
})
