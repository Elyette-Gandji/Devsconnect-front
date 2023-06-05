import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './Root';
import ErrorPage from './ErrorPage';
import App from '../components/App/App';

const Router = createBrowserRouter(
  // On crée un tableau de route à partir d'éléments React
  createRoutesFromElements(
    // Route principale
    // Gestion de l'erreur sur toutes les routes
    // Route index
    // Autres routes

    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<App />} /> {/* Remplacer App par le contenu */}
        {/* Autres routes... */}
      </Route>
    </Route>
  )
);

export default Router;
