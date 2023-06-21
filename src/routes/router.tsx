import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  useParams,
} from 'react-router-dom';
import Root from './Root';

import ErrorPage from './ErrorPage';
import Home from '../components/App/Home/Home';

import Members from '../components/App/Members/Members';
import Projects from '../components/App/Projetcs/Projects';
import ProjectDetail from '../components/App/Projetcs/ProjectDetail/ProjectDetail';
import OneMember from '../components/App/Members/OneMember/OneMember';
import MyProfile from '../components/App/Members/OneMember/MyProfile/MyProfile';
import FormProject from '../components/App/Projetcs/FormProject/FormProject';

import ModifyProject from '../components/App/Projetcs/ModifyProject/ModifyProject';

import { useAppSelector } from '../hook/redux';

//! Fonction pour gérer l'affichage du profil ou de la page membre
function ProfileCondition() {
  const { id } = useParams(); // Récupère l'ID de l'URL
  const userId = useAppSelector((state) => state.user.login.id); // Récupère l'ID du membre connecté

  if (userId === Number(id)) {
    return <MyProfile />; // Affiche MyProfile si les IDs correspondent
  }
  return <OneMember />; // Affiche OneMember si les IDs sont différents
}

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Home />} /> {/* Remplacer App par le contenu */}
        <Route path="/users" element={<Members />} />
        <Route path="/users/:id" element={<ProfileCondition />} />
        <Route path="/create-my-project" element={<FormProject />} />
        {/* <Route path="/users/profil/:id" element={<MyProfile />} /> */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        {/* <Route path="/modify-project/:id" element={<ModifyProject />} /> */}
        {/* Autres routes... */}
      </Route>
    </Route>
  )
);

export default Router;
