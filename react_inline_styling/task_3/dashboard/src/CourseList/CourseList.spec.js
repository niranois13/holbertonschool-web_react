import CourseList from "./CourseList";
import { render, screen } from "@testing-library/react";
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('CourseList', () => {
  test('Check that it renders 5 different rows when it receive an array of courses objects', () => {
    render(<CourseList courses={[
      { id: Math.floor(Math.random() * Date.now()), name: 'ES6', credit: '60' },
      { id: Math.floor(Math.random() * Date.now()), name: 'Webpack', credit: '20' },
      { id: Math.floor(Math.random() * Date.now()), name: 'React', credit: '40' },
    ]} />);

    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(5);
  })
  test('Check that it renders 1 row whenever it receive an empty array', () => {
    render(<CourseList courses={[]} />);

    const rows = screen.getAllByRole('row');

    expect(rows).toHaveLength(1);
  })
})
