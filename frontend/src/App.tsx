import React, { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useRoutesConfig } from './routes/routes-config';

const App: React.FC = () => {
  const routesConfig = useRoutesConfig();
  const router = useMemo(() => {
    console.log('routesConfig', routesConfig);
    return createBrowserRouter(routesConfig);
  }, [routesConfig]);
  return <RouterProvider router={router} />;
};

export default App;
