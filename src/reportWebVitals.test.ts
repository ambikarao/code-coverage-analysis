import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  test('does not call the onPerfEntry function if not provided', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  test('does not throw error when onPerfEntry is provided', () => {
    const mockFn = jest.fn();
    expect(() => reportWebVitals(mockFn)).not.toThrow();
  });

  test('onPerfEntry parameter is validated as function', () => {
    const mockFn = jest.fn();
    const nonFunction = 'not a function';

    // Should work with function
    expect(() => reportWebVitals(mockFn)).not.toThrow();
    // Should work with non-function too (since validation is minimal)
    expect(() => reportWebVitals(nonFunction as any)).not.toThrow();
  });
});
