import './style.scss';
import Card from '../ProjectCards/ProjectCards';

function ProjectsPage() {
  function renderCards() {
    const cardData = [
      {
        id: 1,
        title: 'Titre carte 1',
        description: 'Description carte ',
      },
      {
        id: 2,
        title: 'Titre carte 2',
        description: 'Description carte ',
      },
      {
        id: 3,
        title: 'Titre carte 3',
        description: 'Description carte ',
      },
      {
        id: 4,
        title: 'Titre carte 4',
        description: 'Description carte ',
      },
      {
        id: 5,
        title: 'Titre carte 5',
        description: 'Description carte ',
      },
      {
        id: 6,
        title: 'Titre carte 6',
        description: 'Description carte ',
      },
      {
        id: 7,
        title: 'Titre carte 7',
        description: 'Description carte ',
      },
    ];

    return cardData.map((card) => (
      <Card key={card.id} title={card.title} description={card.description} />
    ));
  }

  return <div className="Render--Card">{renderCards()}</div>;
}

export default ProjectsPage;
