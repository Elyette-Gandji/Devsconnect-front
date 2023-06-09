import './style.scss';

function Project({ project }) {
  return (
    <div className="project">
      <div className="project-title">
        <h1>{project.title}</h1>
      </div>
      <div className="project-description">
        <p>{project.description}</p>
        <div className="project-technos">
          <p>{project.technos}</p>
        </div>
        <div className="project-open">
          <p>{project.open} </p>
        </div>
      </div>
    </div>
  );
}

export default Project;
