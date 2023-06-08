import './style.scss';
import Card from '../ProjectCards/ProjectCards';

function ProjectsPage() {
  function renderCards() {
    const cardData = [
      {
        title: 'Titre carte 1',
        description: 'Description carte ',
      },
      {
        title: 'Titre carte 2',
        description: 'Description carte ',
      },
      {
        title: 'Titre carte 3',
        description: 'Description carte ',
      },
      {
        title: 'Titre carte 4',
        description: 'Description carte ',
      },
      {
        title: 'Titre carte 5',
        description: 'Description carte ',
      },
      {
        title: 'Titre carte 6',
        description: 'Description carte ',
      },
      {
        title: 'Titre carte 7',
        description: 'Description carte ',
      },
    ];

    return cardData.map((card, index) => (
      <Card key={index} title={card.title} description={card.description} />
    ));
  }

  return <div className="Render--Card">{renderCards()}</div>;
}

export default ProjectsPage;
