import './style.scss';
import Project from './Project';
import { list } from '../../../assets/projects-list';

function Projects() {
  const handleReturn = () => {
    window.history.back();
  };

  return (
    <div>
      <button className="return" type="button" onClick={handleReturn}>
        Retour
      </button>
      <div className="projects-flex">
        {list.map((project, i) => (
          <Project project={project} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
