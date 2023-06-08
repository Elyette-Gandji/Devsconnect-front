import './style.scss';
import ProjectCards from '../ProjectCards/ProjectCards';

function ProjectsPage() {
  const cardData = [
    {
      id: 1,
      title: 'Titre carte 1',
      description: 'Description carte 1',
    },
    {
      id: 2,
      title: 'Titre carte 2',
      description: 'Description carte 2',
    },
    {
      id: 3,
      title: 'Titre carte 3',
      description: 'Description carte 3',
    },
    {
      id: 4,
      title: 'Titre carte 4',
      description: 'Description carte 4',
    },
    {
      id: 5,
      title: 'Titre carte 5',
      description: 'Description carte 5',
    },
    {
      id: 6,
      title: 'Titre carte 6',
      description: 'Description carte 6',
    },
    {
      id: 7,
      title: 'Titre carte 7',
      description: 'Description carte 7',
    },
  ];

  return (
    <div className="Render--Card">
      <ProjectCards cardData={cardData} />
    </div>
  );
}

export default ProjectsPage;
