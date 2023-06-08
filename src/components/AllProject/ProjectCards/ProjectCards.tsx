import './style.scss';
import { Link } from 'react-router-dom';

type CardProps = {
  title: string;
  description: string;
};

function Card({ title, description }: CardProps): JSX.Element {
  return (
    <Link to={`/projects/${title}`}>
      <div className="Card">
        <h2 className="Card--title">{title}</h2>
        <p className="Card--description">{description}</p>
      </div>
    </Link>
  );
}

function ProjectCards() {
  return (
    <div>
      <Card title="titre de la carte" description="description de la carte" />
    </div>
  );
}

export default ProjectCards;
