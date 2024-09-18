import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'; // Importa Provider de Redux
import { store } from './redux/store'; // Importa el store de Redux


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Provider de Redux */}
      <RouterProvider router={router} /> {/* Provider de React Router */}
    </Provider>
  </StrictMode>
);

