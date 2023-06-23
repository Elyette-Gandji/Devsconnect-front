// ? Style
import './style.scss';

// ? Interface locale
interface NotFoundI {
  errorMessage: string;
  errorStatus: number | string;
}

// ? Fonction principale
function NotFound({ errorMessage, errorStatus }: NotFoundI) {
  return (
    <div className="not-found">
      <h1>{errorStatus}</h1>
      <p>Désolé, une erreur inattendue est survenue.</p>
      <p>{errorMessage}</p>
    </div>
  );
}

export default NotFound;
