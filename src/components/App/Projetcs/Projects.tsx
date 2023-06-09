import './style.scss';
import Project from './Project';
import { list } from '../../../assets/projects-list';

function Projects() {
  return (
    <div className="projects-flex">
      {list.map((project, i) => (
        <Project project={project} key={i} />
      ))}
    </div>
  );
}

export default Projects;
