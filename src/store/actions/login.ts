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

      // Stockez le rafraîchissement du jeton dans le localStorage
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('accessToken', data.data.accessToken);

      console.log('data1', data.data);
      console.log('localStorage', localStorage);
      // ! Pour des raisons de sécurité, on le supprime de `data`
      delete data.data.accessToken;
      delete data.data.refreshToken;
      console.log('data2', data.data);
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
