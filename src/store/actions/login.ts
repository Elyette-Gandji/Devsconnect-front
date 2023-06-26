// ? Librairies
import { createAsyncThunk } from '@reduxjs/toolkit';

// ? Instance Axios
// eslint-disable-next-line import/no-cycle
import axiosInstance from '../../utils/axios';

//* Authentification
const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData: FormData) => {
    try {
      // Object.fromEntries() transforme une liste de paires clé-valeur en un objet
      const objData = Object.fromEntries(formData);

      const { data } = await axiosInstance.post('/login', objData);

      // ! A la connexion, j'ajoute le token à mon instance Axios
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;

      // ! Pour des raisons de sécurité, on le supprime de `data`
      delete data.data.accessToken;

      // Stockez le rafraîchissement du jeton dans le localStorage
      localStorage.setItem('refreshToken', data.data.refreshToken);
      delete data.data.refreshToken;
      // ? On retourne le state
      return data;
    } catch (error) {
      // Gérez les erreurs potentielles ici
      // console.error('Error during login:', error);
      throw new Error("Une erreur s'est produite lors de la connexion.");
      // throw error;
    }
  }
);

export default loginUser;
