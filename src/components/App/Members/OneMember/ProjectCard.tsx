// ? Librairies
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../hook/redux';

// ? Fonctions externes
import { fetchAllProjects } from '../../../../store/reducer/projects';

// ? Styles
import './style.scss';

// ? Typage global
import { ProjectI } from '../../../../@types/interface';

// ? Fonction principale
function ProjectCard({ projectID }: { projectID: ProjectI }) {
  // On récupère l'ID du projet dans les props
  // ? State
  // Store
  const project = useAppSelector(
    /** //! Projet
     * @param {Function} state - On récupère le state
     *  On filtre le projet correspondant dans la liste complète des projets (state.projects.list.data)
     * en utilisant l'ID du projet fourni dans les props (projectID.id).
     */
    (state) =>
      state.projects.list.data.find(
        (projectFromApi) => projectFromApi.id === projectID.id
      )
  );

  // ? Dispatch
  const dispatch = useAppDispatch();

  // ? useEffect
  useEffect(() => {
    dispatch(fetchAllProjects()); // On récupère tous les projets
  }, [dispatch]);

  // Si le projet n'existe pas, on retourne null
  if (!project) {
    return null;
  }

  // ? Rendu JSX
  return (
    /** //! Lien vers le projet
     * @param {Function} Link - Permet de naviguer entre les pages
     * @param {string} to - On envoie l'ID du projet dans l'url
     * @param {string} project.id - On récupère l'ID du projet
     * Permet de naviguer vers la page du projet correspondant a l'id récupéré en state
     */
    <Link to={`/projects/${project.id}`}>
      <div className="ProjectCard" key={project.id}>
        <div className="ProjectCard--firstField">
          <h4 className="ProjectCard--firstField--title">{project.title}</h4>
          <div className="ProjectCard--firstField--technos">
            {/** //! Affichage des technos
             * @param {Array} project.tags - On récupère la liste des tags du projet
             * On map sur la liste des tags du projet
             * On limite à 4 l'affichage
             * On affiche l'image de la techno avec le nom en alt et title
             */}
            {project.tags.slice(0, 4).map((tag) => (
              <img
                key={`${project.id}-${tag.id}`}
                src={`/images/technos/${tag.name.toLowerCase()}.svg`}
                alt={tag.name}
                title={tag.name}
              />
            ))}
          </div>
        </div>
        <div className="ProjectCard--secondField">
          <div className="ProjectCard--secondField--description">
            {project.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProjectCard;
