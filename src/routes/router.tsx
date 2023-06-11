import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './Root';
import ErrorPage from './ErrorPage';
import Home from '../components/App/Home/Home';

import Members from '../components/App/Members/Members';
import Projects from '../components/App/Projetcs/Projects';
import OneMember from '../components/App/Members/OneMember/OneMember';
import MyProfile from '../components/App/Members/OneMember/MyProfile/MyProfile';

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
        <Route path="/users" element={<Members />} />
        <Route path="/users/:id" element={<OneMember />} />
        <Route path="/profil" element={<MyProfile />} />
        <Route path="/projects" element={<Projects />} />
        {/* Autres routes... */}
      </Route>
    </Route>
  )
);

export default Router;
