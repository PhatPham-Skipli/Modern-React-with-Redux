import { createBrowserRouter } from 'react-router-dom';
import HomePageRoutes from './MainRoutes';
import RegistryRoutes from './RegistryRoutes';
import VideoRoutes from './VideoRoutes';

const routes = [
    ...HomePageRoutes,
    ...RegistryRoutes,
    ...VideoRoutes,  

    // {
    //     path: '*',
    //     element: <NotFoundPage />
    // }
];

const router = createBrowserRouter(routes);

export default router;
