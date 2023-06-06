import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './Root';
import ErrorPage from './ErrorPage';
import Home from '../components/App/Home/Home';

const Router = createBrowserRouter(
  // On crée un tableau de route à partir d'éléments React
  createRoutesFromElements(
    // Route principale
    // Gestion de l'erreur sur toutes les routes
    // Route index
    // Autres routes

    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Home />} /> {/* Remplacer App par le contenu */}
        {/* Autres routes... */}
      </Route>
    </Route>
  )
);

export default Router;
