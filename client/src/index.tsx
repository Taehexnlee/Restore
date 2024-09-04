import { StrictMode } from 'react'
import App from './app/layout/App.tsx'
import './app/layout/styles.css'
import ReactDOM from 'react-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';


ReactDOM.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
  document.getElementById('root')
);
