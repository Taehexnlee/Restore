import { StrictMode } from 'react'
import './app/layout/styles.css'
import ReactDOM from 'react-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { StoreProvider } from './app/context/StoreContext.tsx';


ReactDOM.render(
  <StrictMode>
    <StoreProvider>
    <RouterProvider router={router}/>
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root')
);
