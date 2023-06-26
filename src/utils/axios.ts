import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour la gestion des erreurs
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

// Add the interceptors to the axios instance
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      return axiosInstance
        .post(`http://localhost:3000/refresh-token`, {
          refreshToken: localStorage.getItem('refreshToken'),
        })
        .then((response) => {
          // Check if the token refresh request is successful
          if (response.status === 200) {
            const newAccessToken = response.data.data.accessToken;
            const { refreshToken } = response.data.data;
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('refreshToken', refreshToken);
            console.log('Access token refreshed!');

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
          // Handle token refresh error here
          // You can redirect to the login page or perform any other necessary action
          console.log('Error refreshing token');
        })
        .catch((error) => {
          // Handle token refresh error (e.g., user logout)
          // You can redirect to the login page or perform any other necessary action
          console.log(error);
        });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
