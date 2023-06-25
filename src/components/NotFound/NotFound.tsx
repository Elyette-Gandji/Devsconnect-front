// ? Librairies
import { useEffect } from 'react';

// ? Instance Axios
import axiosInstance from '../../utils/axios';

// ? Style
import './style.scss';

// ? Interface locale
interface NotFoundI {
  errorMessage: string;
  errorStatus: number | string;
}

// ? Fonction principale
function NotFound({ errorMessage, errorStatus }: NotFoundI) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Traitez les données de réponse normalement
      } catch (error) {
        if (error.response) {
          error.response.data = {
            errorMessage: error.response.data.message,
            errorStatus: error.response.status,
          };
          // Une réponse avec un code d'erreur a été reçue
          console.log('Erreur de réponse :', error.response);
          console.log("Message d'erreur :", error.message);
          console.log('Données de réponse associées :', error.data);
          // Autres traitements spécifiques aux erreurs de réponse
        } else if (error.request) {
          // Pas de réponse reçue
          console.log('Erreur de requête :', error.request);
          console.log("Message d'erreur :", error.message);
          // Autres traitements spécifiques aux erreurs de requête
        } else {
          // Erreur inconnue lors de la configuration de la requête
          console.log('Erreur inconnue :', error.message);
          console.log(
            'Configuration de la requête ayant échoué :',
            error.config
          );
          console.log("Message d'erreur :", error);
          // Autres traitements spécifiques aux erreurs inconnues
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="not-found">
      <h1>Error {errorStatus}</h1>
      <p>{errorMessage}</p>
    </div>
  );
}

export default NotFound;
