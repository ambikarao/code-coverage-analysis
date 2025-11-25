import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Tests have been moved to App.test.tsx to avoid duplication
describe('Index File', () => {

  test('reportWebVitals function is called', () => {
    const mockFn = jest.fn();
    reportWebVitals(mockFn);
    expect(mockFn).toHaveBeenCalled();
  });
});
