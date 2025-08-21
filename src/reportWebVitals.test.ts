import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  test('calls the onPerfEntry function if provided', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });

  test('does not call the onPerfEntry function if not provided', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  // New tests for reportWebVitals.ts
  test('calls web-vitals functions when onPerfEntry is provided', async () => {
    const mockFn = jest.fn();
    await reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled(); // Ensure it calls the provided function
  });
});