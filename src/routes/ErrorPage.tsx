// ? Librairies
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// ? Composants
import NotFound from '../components/NotFound/NotFound';

// ? Fonction principale
function ErrorPage() {
  // useRouteError() est un hook qui permet de récupérer l'erreur de la route
  const error = useRouteError();
  console.log('ErrorPage error', error);

  // On gère le message d'erreur
  function getErrorMessage(e: unknown): string {
    // On récupère le message d'erreur
    if (isRouteErrorResponse(e)) {
      return e.statusText;
    }

    // Si on l'a pas, on recherche si l'erreur est une instance de la class Error
    if (e instanceof Error) {
      return e.message;
    }

    // Si on l'a pas on récupère le type de l'erreur
    if (typeof e === 'string') {
      return e;
    }

    // Si vraiment on a rien, on affiche un texte générique
    return 'Unknown error';
  }

  //* Même procédure pour le status
  function getStatus(e: unknown): number | string {
    if (isRouteErrorResponse(e)) {
      return e.status.toString();
    }
    if (e instanceof Error) {
      return e.name;
    }
    if (typeof e === 'string') {
      return e;
    }
    return 'Unknown error';
  }

  // ? Rendu JSX
  return (
    // On retourne les props à un composant crée à part qui s'occupera du style et de l'integration dans notre appli
    <NotFound
      errorMessage={getErrorMessage(error)}
      errorStatus={getStatus(error)}
    />
  );
}

export default ErrorPage;
