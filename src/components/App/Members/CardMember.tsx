// ? Librairies
import { Link } from 'react-router-dom'; // Sert à gérer les liens

// ? Styles
import './style.scss';

// ? Typage
import { MemberI } from '../../../@types/interface';

// ? Interface globale
interface CardMemberI {
  member: MemberI;
}

// ? Fonction principale
function CardMember({ member }: CardMemberI) {
  // On récupère les données de member depuis Members.tsx
  const { id, firstname, name, availability, description } = member;

  // ? Rendu JSX
  return (
    <div className="CardMember">
      <section className="CardMember--card">
        {/** //! Link
         * @param {String} to - Lien vers la page du membre en fonction de son id
         * @param {String} key - Clé unique pour chaque membre (id)
         * On utilise Link sur le header uniquement pour garder les projets cliquables
         */}
        <Link to={`/users/${id}`} key={id}>
          <div className="CardMember--card--header">
            <div className="CardMember--card--header--text">
              <h3>
                {firstname} {name}
              </h3>
              <p className={availability ? 'open' : 'close'}>
                {/* On ajoute une classe pour css en fonction de availability */}{' '}
                {availability ? 'Disponible' : 'Indisponible'}{' '}
                {/* On affiche un texte en fonction de availability */}
              </p>
            </div>
            <img
              src="/images/profil/profil.svg"
              alt="profil"
              title={member.pseudo}
            />
          </div>
        </Link>
        <div className="CardMember--card--body">
          <p className="CardMember--card--body--text">{description}</p>
          <div className="CardMember--card--body--technos">
            {/** //! Affichage des technos
             * Si member.tags existe et qu'il y a au moins une techno
             * On map sur la liste des technos
             * On affiche l'image de la techno avec le nom en alt et title
             *
             * Sinon on affiche un message pour dire qu'il n'y a pas de techno
             */}
            {member.tags && member.tags.length > 0 ? (
              member.tags.map((tag) => (
                <img
                  src={`/images/technos/${tag.name.toLowerCase()}.svg`}
                  alt={tag.name}
                  title={tag.name}
                  key={tag.id}
                />
              ))
            ) : (
              <p>Aucune techno</p>
            )}
          </div>
        </div>
        <div className="CardMember--card--footer">
          <h4>Projets :</h4>
          {/* //! On map dessus en dur et limite à 3 l'affichage */}
          <ul className="CardMember--card--footer--list">
            {/** //! Affichage des projets
             * Si member.projects existe et qu'il y a au moins un projet
             * On map sur la liste des projets
             * On limite à 3 l'affichage
             *
             *  Sinon on affiche un message pour dire qu'il n'y a pas de projet
             */}
            {member.projects && member.projects.length > 0 ? (
              member.projects.slice(0, 3).map((project) => (
                /** //! Link
                 * @param {String} to - Lien vers la page du projet en fonction de son id
                 * @param {String} key - Clé unique pour chaque projet (id)
                 * Pendant la boucle, on génère un lien pour chaque projet
                 * en lui donnant une clé unique et le titre du projet
                 */
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <li key={project.id}>- {project.title}</li>
                </Link>
              ))
            ) : (
              <li>Aucun projet</li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default CardMember;
