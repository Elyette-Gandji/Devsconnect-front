// ? Librairies
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../hook/redux';

// ? Fonctions externes
import { fetchOneMember } from '../../../../store/reducer/members';

// ? Composants
import ProjectCard from './ProjectCard';
import ErrorPage from '../../../../routes/ErrorPage';

// ? Styles
import './style.scss';

// ? Fonction principale
function OneMember() {
  // ? State
  // Store
  const member = useAppSelector((state) => state.members.member.data); // On récupère les données du membre
  const loading = useAppSelector((state) => state.members.member.loading); // On récupère le loading

  // ? Navigate
  const navigate = useNavigate(); // Permet de naviguer entre les pages

  // ? Params
  const { id } = useParams(); // On récupère l'id du membre dans l'url

  // ? Dispatch
  const dispatch = useAppDispatch();

  // ? useEffect
  useEffect(() => {
    if (id) dispatch(fetchOneMember(id)); // On récupère les infos du membre avec l'id en url
  }, [dispatch, id]); // On met à jour le useEffect si l'id change

  // En cas de chargement des membres, on affiche un indicateur de chargement
  if (loading) {
    return <p>Loading...</p>;
  }

  // Si le membre n'existe pas, on affiche une erreur 404 au composant NotFound
  if (!member) {
    return <ErrorPage />;
  }

  // ? Rendu JSX
  return (
    <>
      <div className="OneMember--return">
        {/** //! Retour
         * @param {Function} navigate - Permet de naviguer entre les pages
         * On envoie au composant la fonction navigate
         * A chaque clic sur le bouton, on retourne à la page précédente
         */}
        <button type="button" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
      <div className="OneMember">
        <h2 className="OneMember--title">
          {member.firstname} {member.name}
        </h2>
        <div className="OneMember--content">
          <div className="OneMember--firstField">
            <img
              src="/images/profil/profil.svg"
              alt="profil"
              className="OneMember--firstField--image"
            />
            <h2 className="OneMember--firstField--title">
              {member.firstname} {member.name}
            </h2>

            <a
              href={`mailto:${member.email}`}
              className="OneMember--firstField--contact"
            >
              Me contacter
            </a>

            <div className="OneMember--firstField--availability">
              <p className={member.availability ? 'open' : 'close'}>
                {/* On ajoute une classe pour css en fonction de availability */}{' '}
                {member.availability ? 'Disponible' : 'Indisponible'}
                {/* On affiche un texte en fonction de availability */}
              </p>
            </div>
            <div className="OneMember--firstField--technos">
              <h4 className="OneMember--firstField--technos--title">
                Technos maitrisées
              </h4>
              <div className="OneMember--firstField--technos--technos">
                {/** //! Affichage des technos
                 * Si member.tags existe et si les tags sont sous forme de tableau
                 * On map sur la liste des technos
                 * On affiche l'image de la techno avec le nom en alt et title
                 *
                 * Et on affiche le nom de la techno
                 */}
                {member.tags &&
                  Array.isArray(member.tags) &&
                  member.tags.map((tag) => (
                    <div
                      className="OneMember--firstField--technos--technos--group"
                      key={tag.id}
                    >
                      <img
                        src={`/images/technos/${tag.name.toLowerCase()}.svg`}
                        alt={tag.name}
                        title={tag.name}
                      />
                      <p>{tag.name}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="OneMember--secondField">
            <div className="OneMember--secondField--description">
              {member.description}
            </div>
            {/** //! Affichage des projets
             * @param {Array} member.projects - Liste des projets
             * Si member.projects existe et qu'il y a au moins un projet
             * On map sur la liste des projets
             */}
            {member.projects && member.projects.length > 0 && (
              <div className="OneMember--secondField--projects">
                <h4 className="OneMember--secondField--projects--title">
                  Projets réalisés
                </h4>
                {/** //! ProjectCard.tsx
                 * @param {Object} projectID - Données du projet
                 * @param {Number} key - Clé unique pour chaque projet
                 * On envoie au composant ProjectCard les données de chaque projet
                 * et une clé unique
                 */}
                {member.projects.map((project) => (
                  <ProjectCard key={project.id} projectID={project} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default OneMember;
