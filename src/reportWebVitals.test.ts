import reportWebVitals from './reportWebVitals';

// Create mocks for web-vitals package
jest.mock('web-vitals', () => ({
  getCLS: jest.fn(cb => setTimeout(() => cb({ name: 'CLS', value: 0.1, delta: 0.1 }), 0)),
  getFID: jest.fn(cb => setTimeout(() => cb({ name: 'FID', value: 200, delta: 200 }), 0)),
  getFCP: jest.fn(cb => setTimeout(() => cb({ name: 'FCP', value: 500, delta: 500 }), 0)),
  getLCP: jest.fn(cb => setTimeout(() => cb({ name: 'LCP', value: 1000, delta: 1000 }), 0)),
  getTTFB: jest.fn(cb => setTimeout(() => cb({ name: 'TTFB', value: 300, delta: 300 }), 0)),
}));

describe('reportWebVitals', () => {
  test('does not call the onPerfEntry function if not provided', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  test('does not call anything when input is not a function', () => {
    // @ts-ignore - deliberately testing with invalid input
    expect(() => reportWebVitals('not a function')).not.toThrow();
  });

  test('calls the onPerfEntry function if provided', async () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    // Wait for the async import and setTimeout in our mock to execute
    await new Promise(resolve => setTimeout(resolve, 10));
    // It should be called once for each metric (CLS, FID, FCP, LCP, TTFB)
    expect(mockFn).toHaveBeenCalledTimes(5);
  });

  test('provides metric values to the callback function', async () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    // Wait for the async import and setTimeout in our mock to execute
    await new Promise(resolve => setTimeout(resolve, 10));
    // Check if the metric name is included in at least one call
    expect(mockFn).toHaveBeenCalledWith(expect.objectContaining({
      name: expect.stringMatching(/CLS|FID|FCP|LCP|TTFB/)
    }));
  });
});