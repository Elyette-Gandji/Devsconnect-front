import { Link } from 'react-router-dom';

function Title() {
  return (
    <Link to="/" className="Header--brand">
      <h1>DevsConnect</h1>
    </Link>
  );
}

export default Title;
