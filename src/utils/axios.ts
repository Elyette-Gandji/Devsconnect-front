import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour la gestion des erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // La requête a reçu une réponse avec un code d'erreur (4xx, 5xx)
      console.log('error response', error.response);
      return Promise.reject(error.response.data);
    }
    if (error.request) {
      console.log('error request', error.request);
      // La requête n'a pas reçu de réponse (pas de connexion réseau, par exemple)
      return Promise.reject({ message: 'No response received' });
    }
    // Une erreur s'est produite lors de la configuration de la requête
    console.log('error unknown', error.message);
    return Promise.reject({ message: 'Error setting up the request' });
  }
);

// ? Intercepteur pour gérer le rafraîchissement du jeton
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Vérifier si la réponse a un code d'état 401 et si l'URL n'est pas déjà '/refresh-token'
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;

      try {
        // Récupérer le rafraîchissement du jeton du localStorage
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Utiliser le rafraîchissement du jeton pour obtenir un nouveau jeton d'accès
        const { data } = await axiosInstance.post('/refresh-token', {
          refreshToken,
        });

        // Mettre à jour le jeton d'accès dans les en-têtes
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;
        // Stockez le nouveau rafraîchissement du jeton dans le localStorage
        localStorage.setItem('refreshToken', data.data.refreshToken);

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
