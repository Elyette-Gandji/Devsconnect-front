import { useParams } from 'react-router-dom';

import cardData from '../ProjectCards/ProjectCards';
import ProjectCards from '../ProjectCards/ProjectCards';

function CardPage() {
  return (
    <div>
      <ProjectCards title={cardData.title} description={cardData.description} />
    </div>
  );
}

export default CardPage;
