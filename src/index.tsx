import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  );
} else {
  console.error("Element with id 'root' not found");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
