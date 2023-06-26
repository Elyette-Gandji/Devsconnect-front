/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';

// ? Fonctions externes
import logout from '../store/actions/logout';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Intercepteur pour la gestion des erreurs
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // La requête a reçu une réponse avec un code d'erreur (4xx, 5xx)
//       console.log('error response', error.response);
//       const { status, data } = error.response;
//       let errorMessage = 'Une erreur est survenue';

//       if (status === 404) {
//         errorMessage = 'La ressource demandée est introuvable';
//       } else if (status === 500) {
//         errorMessage = 'Erreur interne du serveur';
//       }

//       return Promise.reject({ message: errorMessage, data });
//     }
//     if (error.request) {
//       console.log('error request', error.request);
//       // La requête n'a pas reçu de réponse (pas de connexion réseau, par exemple)
//       return Promise.reject({
//         message: 'No response received',
//         request: error.request,
//       });
//     }
//     // Une erreur s'est produite lors de la configuration de la requête
//     console.log('error unknown', error.message);
//     return Promise.reject({
//       message: 'Error setting up the request',
//       config: error.config,
//     });
//   }
// );

// ? Intercepteur pour gérer le rafraîchissement du jeton
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('response ok', response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status !== 401) {
      return Promise.reject(originalRequest);
    }
    // Vérifier si la réponse a un code d'état 401 et si l'URL n'est pas déjà '/refresh-token'
    if (
      // Pass all non 401s back to the caller.
      error.response &&
      error.response.status === 401 &&
      !originalRequest.retry
    ) {
      console.log('error.response', error.response);
      console.log('originalRequest.retry', originalRequest.retry);
      originalRequest.retry = true;

      try {
        // Récupérer le rafraîchissement du jeton du localStorage
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('refreshToken', refreshToken);
        if (!refreshToken) {
          console.log('No refresh token available');
          throw new Error('No refresh token available');
        }

        // Utiliser le rafraîchissement du jeton pour obtenir un nouveau jeton d'accès
        const { data } = await axiosInstance.post('/refresh-token', {
          refreshToken,
        });
        console.log('data', data);
        // Mettre à jour le jeton d'accès dans les en-têtes
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        // Stockez le nouveau rafraîchissement du jeton dans le localStorage
        localStorage.setItem('refreshToken', data.data.refreshToken);
        console.log('Access token refreshed!');
        console.log(
          'axiosInstance.defaults.headers.common.Authorization',
          axiosInstance.defaults.headers.common.Authorization
        );
        console.log('loaclStorage', localStorage);
        // Réessayer la requête d'origine avec le nouveau jeton d'accès
        return await axiosInstance(originalRequest);
      } catch (refreshError) {
        // Gérer les erreurs lors du rafraîchissement du jeton (par exemple, déconnexion de l'utilisateur)
        // Vous pouvez rediriger vers la page de connexion ou effectuer d'autres actions nécessaires
        console.error(
          'Erreur lors du rafraîchissement du jeton:',
          refreshError
        );

        logout();
        // Rejeter l'erreur pour que l'appelant d'origine puisse également la gérer
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;