import { render, screen } from "@testing-library/react";
import CourseListRow from "./CourseListRow";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('When isHeader is true', () => {
  test('Check whether the component renders one columnheader that has the attribute colspan = 2', () => {
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
  });

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
  });

  test.skip('Check that header row with one cell has correct background color', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header One Cell" />
        </tbody>
      </table>
    );

    const row = screen.getByRole('row');
    const bgColor = window.getComputedStyle(row).backgroundColor;
    expect(bgColor).toBe('rgba(222, 181, 181, 0.271)');
  });

  test.skip('Check that header row with two cells has correct background color', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={true} textFirstCell="Header 1" textSecondCell="Header 2" />
        </tbody>
      </table>
    );

    const row = screen.getByRole('row');
    const bgColor = window.getComputedStyle(row).backgroundColor;
    expect(bgColor).toBe('rgba(222, 181, 181, 0.271)');
  });

  test.skip('Check that non-header row has correct background color', () => {
    render(
      <table>
        <tbody>
          <CourseListRow isHeader={false} textFirstCell="Body 1" textSecondCell="Body 2" />
        </tbody>
      </table>
    );

    const row = screen.getByRole('row');
    const bgColor = window.getComputedStyle(row).backgroundColor;
    expect(bgColor).toBe('rgba(245, 245, 245, 0.671)');
  });
});
