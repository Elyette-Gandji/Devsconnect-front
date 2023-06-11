// On importe depuis `react-router-dom`
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';

// On crée notre fonction de gestion d'erreur
function ErrorPage() {
  const error = useRouteError();
  console.log(error);

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

  // Même procédure pour le status
  function getStatus(e: unknown): number | string {
    if (isRouteErrorResponse(e)) {
      return e.status;
    }
    if (e instanceof Error) {
      return e.name;
    }
    if (typeof e === 'string') {
      return e;
    }
    return 'Unknown error';
  }

  // On retourne les props à un composant crée à part qui s'occupera du style et de l'integration dans notre appli
  return (
    <NotFound
      errorMessage={getErrorMessage(error)}
      errorStatut={getStatus(error)}
    />
  );
}

export default ErrorPage;
