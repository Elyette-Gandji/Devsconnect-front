import { useParams } from 'react-router-dom';
import { list } from '../../../../assets/projects-list';

function ProjectDetail() {
  const { id } = useParams();

  const project = list.find((p) => p.id === parseInt(id));

  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectDetail;
