import reportWebVitals from './reportWebVitals';

// Mock web-vitals module
jest.mock('web-vitals', () => ({
  getCLS: jest.fn((cb) => cb({ name: 'CLS', value: 0.1, delta: 0.1 })),
  getFID: jest.fn((cb) => cb({ name: 'FID', value: 100, delta: 100 })),
  getFCP: jest.fn((cb) => cb({ name: 'FCP', value: 800, delta: 800 })),
  getLCP: jest.fn((cb) => cb({ name: 'LCP', value: 1200, delta: 1200 })),
  getTTFB: jest.fn((cb) => cb({ name: 'TTFB', value: 300, delta: 300 }))
}));

describe('reportWebVitals', () => {
  test('calls the onPerfEntry function if provided', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    // Using setTimeout to allow for the async import to resolve
    return new Promise(resolve => {
      setTimeout(() => {
        expect(mockFn).toHaveBeenCalled();
        resolve(undefined);
      }, 0);
    });
  });

  test('does not call the onPerfEntry function if not provided', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });
});
