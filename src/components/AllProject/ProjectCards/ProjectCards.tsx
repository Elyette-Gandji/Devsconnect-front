import './style.scss';

type CardProps = {
  title: string;
  description: string;
};

function Card({ title, description }: CardProps): JSX.Element {
  return (
    <div className="Card">
      <h2 className="Card--title">{title}</h2>
      <p className="Card--descrption">{description}</p>
    </div>
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
