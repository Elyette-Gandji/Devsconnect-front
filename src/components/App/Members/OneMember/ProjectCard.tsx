import { technos } from '../../../../utils/technosPath';

import './style.scss';

function ProjectCard() {
  return (
    <div className="ProjectCard">
      <div className="ProjectCard--firstField">
        <h4 className="ProjectCard--firstField--title">Projet 1</h4>
        <div className="ProjectCard--firstField--technos">
          {/* //! On importe toutes les données depuis data, on map dessus en dur et limite à 5 l'affichage */}
          {technos.slice(0, 4).map((techno) => (
            <img
              src={techno.path}
              alt={techno.label}
              title={techno.label}
              key={techno.id}
            />
          ))}
        </div>
      </div>
      <div className="ProjectCard--secondField">
        <div className="ProjectCard--secondField--description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam
          culpa labore, voluptas neque fugiat deleniti aliquam fugit. Labore
          nesciunt quod sunt tempora provident ratione in voluptatem, sed eius
          commodi dolorum minus animi consequatur optio ut ducimus nihil
          expedita ipsum excepturi rem possimus voluptatibus. Vero consequatur
          recusandae ad delectus assumenda, corrupti unde quisquam voluptatem
          tempora architecto accusantium velit minus sit ullam tenetur veniam id
          rem facilis voluptas atque, voluptate aspernatur amet dignissimos!
          Laudantium earum possimus ipsam accusamus quos error provident, nisi
          animi maiores dolore veniam libero enim corrupti labore consectetur
          nihil hic laboriosam expedita in quam tempora odit. Laboriosam, unde
          expedita.
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
