// Librairies
import { useNavigate } from 'react-router-dom';

import { technos } from '../../../../data/technosPath';
import ProjectCard from './ProjectCard';

import './style.scss';

function OneMember() {
  const navigate = useNavigate();
  return (
    <>
      <div className="OneMember--return">
        <button type="button" onClick={() => navigate(-1)}>
          Retour
        </button>
      </div>
      <div className="OneMember">
        <h2 className="OneMember--title">Lorraine Ipsum</h2>
        <div className="OneMember--content">
          <div className="OneMember--firstField">
            <img
              src="/images/profil/profil.svg"
              alt="profil"
              className="OneMember--firstField--image"
            />
            <h2 className="OneMember--firstField--title">Lorraine Ipsum</h2>
            <a href="mailto:">
              <button
                type="button"
                // value="Contactez-moi"
                className="OneMember--firstField--contact"
              >
                {' '}
                Me contacter
              </button>
            </a>
            <p className="OneMember--firstField--availability">Disponible</p>
            <div className="OneMember--firstField--technos">
              <h4 className="OneMember--firstField--technos--title">
                Technos maitrisées
              </h4>
              <div className="OneMember--firstField--technos--technos">
                {/* //! On importe toutes les données depuis data, on map dessus en dur et limite à 8 l'affichage */}
                {technos.slice(0, 8).map((techno) => (
                  <>
                    <img
                      src={techno.path}
                      alt={techno.label}
                      title={techno.label}
                      key={techno.id}
                    />
                    <p>{techno.label}</p>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="OneMember--secondField">
            <div className="OneMember--secondField--description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Laboriosam culpa labore, voluptas neque fugiat deleniti aliquam
              fugit. Labore nesciunt quod sunt tempora provident ratione in
              voluptatem, sed eius commodi dolorum minus animi consequatur optio
              ut ducimus nihil expedita ipsum excepturi rem possimus
              voluptatibus. Vero consequatur recusandae ad delectus assumenda,
              corrupti unde quisquam voluptatem tempora architecto accusantium
              velit minus sit ullam tenetur veniam id rem facilis voluptas
              atque, voluptate aspernatur amet dignissimos! Laudantium earum
              possimus ipsam accusamus quos error provident, nisi animi maiores
              dolore veniam libero enim corrupti labore consectetur nihil hic
              laboriosam expedita in quam tempora odit. Laboriosam, unde
              expedita.
            </div>
            <div className="OneMember--secondField--projects">
              <h4 className="OneMember--secondField--projects--title">
                Projets réalisés
              </h4>
              <ProjectCard />
              <ProjectCard />
              <ProjectCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneMember;
