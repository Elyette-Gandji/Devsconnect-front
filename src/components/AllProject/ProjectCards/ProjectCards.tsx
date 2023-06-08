import './style.scss';
import { Link } from 'react-router-dom';

type CardProps = {
  id: number;
  title: string;
  description: string;
};

function Card({ id, title, description }: CardProps): JSX.Element {
  return (
    <Link to={`/projects/${id}`}>
      <div className="Card">
        <h2 className="Card--title">{title}</h2>
        <p className="Card--description">{description}</p>
      </div>
    </Link>
  );
}

type ProjectCardsProps = {
  cardData: CardProps[];
};

function ProjectCards({ cardData }: ProjectCardsProps) {
  return (
    <div>
      {cardData.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
}

export default ProjectCards;
