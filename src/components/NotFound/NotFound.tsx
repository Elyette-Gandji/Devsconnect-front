import './style.scss';

interface NotFoundI {
  errorMessage: string;
  errorStatut: number | string;
}

function NotFound({ errorMessage, errorStatut }: NotFoundI) {
  return (
    <div className="not-found">
      <h1>{errorStatut}</h1>
      <p>Désolé, une erreur inattendue est survenue.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}

export default NotFound;
