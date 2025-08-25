import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

// Test cases for reportWebVitals

describe('reportWebVitals', () => {
  test('calls the performance metrics functions', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });
});