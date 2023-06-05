import './style.scss';

function NotFound(
  { errorMessage }: { errorMessage: string },
  { errorStatut }: { errorStatut: number }
) {
  // Je ne sais pas comment les typer sur un markdown, à tester en réel si cela fonctionne
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
