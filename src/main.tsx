import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Slide, ToastContainer } from 'react-toastify';


const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient()


root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer 
      autoClose={2000}
      hideProgressBar
      transition={Slide}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);