// Librairies
// Link pour rediriger vers la page du membre
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../hook/redux';

// Fonctions asynchrones
import { fetchOneMember } from '../../../../store/reducer/members';

// Composants
import ProjectCard from './ProjectCard';
import ErrorPage from '../../../../routes/ErrorPage';

import './style.scss';

function OneMember() {
  const navigate = useNavigate();
  const { id } = useParams();

  const member = useAppSelector((state) => state.members.member.data);
  const loading = useAppSelector((state) => state.members.member.loading);

  const dispatch = useAppDispatch();

  // On recupere les infos du membre avec l'id en url
  useEffect(() => {
    if (id) dispatch(fetchOneMember(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>; // Afficher un indicateur de chargement si les membres sont en cours de chargement
  }

  if (!member) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="OneMember--return">
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
              {' '}
              Me contacter
            </a>

            <div className="OneMember--firstField--availability">
              <p className={member.availability ? 'open' : 'close'}>
                {member.availability ? 'Disponible' : 'Indisponible'}
              </p>
            </div>
            <div className="OneMember--firstField--technos">
              <h4 className="OneMember--firstField--technos--title">
                Technos maitrisées
              </h4>
              <div className="OneMember--firstField--technos--technos">
                {/* Si le membre à des tags, et si les tags sont sous la forme d'un tableau */}
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
            {member.projects && member.projects.length > 0 && (
              <div className="OneMember--secondField--projects">
                <h4 className="OneMember--secondField--projects--title">
                  Projets réalisés
                </h4>
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
