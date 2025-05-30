import '@testing-library/jest-dom';
import { StyleSheetTestUtils } from 'aphrodite';

// Disable style injection before each test
beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Re-enable after each test
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
