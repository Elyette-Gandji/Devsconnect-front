// ? Librairies
import { createAsyncThunk } from '@reduxjs/toolkit';

// ? Instance Axios
import axiosInstance from '../../utils/axios';

const signinUser = createAsyncThunk(
  'user/signinUser',
  async (formData: FormData) => {
    try {
      // Object.fromEntries() transforme une liste de paires clé-valeur en un objet
      const objData = Object.fromEntries(formData);
      const { data } = await axiosInstance.post('/signin', objData);

      // ? On retourne le state
      return data;
    } catch (error) {
      console.error();
      error;
      // throw new Error("Une erreur s'est produite lors de l'inscription'.");

      // console.error('Error during signin:', error);
      throw error;
    }
  }
);

export default signinUser;
