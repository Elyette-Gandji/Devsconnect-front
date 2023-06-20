// ? Fonction simple pour créer une instance d'Axios
// ? On entre l'url principal de l'appel API
//! L'instance d'Axios est exportée et pourra être utilisée pour stocker le token par exemple

import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000',
});

// import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// import jwt from 'jsonwebtoken';

// // Constants
// const JWT_SECRET = 'DGmCXdsaXKnjBeY1AR0e10roPUcyBeW4';

// // Create an Axios instance
// const instance: AxiosInstance = axios.create({
//   baseURL: 'https://api.example.com/', // Set your API base URL
// });

// // Add a request interceptor
// instance.interceptors.request.use((config: AxiosRequestConfig) => {
//   // Check if the access token is valid
//   const accessToken = AxiosInstance.defaults.headers.common.Authorization.split('Bearer ')[1];
//   if (isAccessTokenExpired(accessToken)) {
//     // If the access token has expired, refresh the token or perform any other necessary actions
//     // For example, you can redirect to the login page or request a new token using the refresh token
//   }

//   // Add the access token to the request headers
//   config.headers['Authorization'] = Bearer ${accessToken};

//   return config;
// });

// // Helper function to check if the access token is expired
// function isAccessTokenExpired(accessToken: string): boolean {
//   // Verify and decode the access token
//   try {
//     const decodedToken = jwt.verify(accessToken, JWT_SECRET);
//     const expirationTime = new Date(decodedToken.exp * 1000); // Convert expiration time to milliseconds

//     return Date.now() >= expirationTime.getTime();
//   } catch (error) {
//     return true; // Token verification failed or expired
//   }
// }

// export default instance;
