// ? Librairies
import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

//* message est utilisé pour afficher un message pop-up. On importe son typage.
import { Flash } from '../../@types/interface';

// ? fonctions maison pour l'instance Axios
import axiosInstance from '../../utils/axios';

// ? Typage
interface UserState {
  logged: boolean;
  pseudo: string | null;
  message: Flash | null;
}

// ? Initialisation
export const initialState: UserState = {
  logged: false,
  pseudo: null,
  message: null,
};

// ? Fonctions synchrones
//* Déconnexion
export const logout = createAction('user/logout');

// ? Fonctions asynchrones
//* Authentification
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData: FormData) => {
    try {
      // ! Object.fromEntries() transforme une liste de paires clé-valeur en un objet
      const objData = Object.fromEntries(formData);

      const { data } = await axiosInstance.post('/api/users', objData);
      // ! A la connexion, j'ajoute le token à mon instance Axios
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      // ! Pour des raisons de sécurité, on le supprime de `data`
      // delete data.token;

      // ? On retourne le state
      return data as {
        logged: boolean;
        pseudo: string;
      };
    } catch (error) {
      // Gérez les erreurs potentielles ici
      console.error('Error during login:', error);
      throw error;
    }
  }
);

// ? Construction du reducer user avec builder qui utilise les actions pour modifier le state initial
const userReducer = createReducer(initialState, (builder) => {
  // ? On retourne le state selon les cas de figure suivants :
  builder
    //* Cas de la connexion en cours
    .addCase(loginUser.pending, (state) => {
      state.logged = false;
      state.pseudo = null;
      state.message = null;
    })

    //* Cas de la connexion échouée
    .addCase(loginUser.rejected, (state, action) => {
      state.logged = false;
      state.pseudo = null;
      state.message = {
        type: 'error',
        children: action.error.code || 'UNKNOWN_ERROR',
        duration: 5000,
      };
    })

    //* Cas de la connexion réussie
    .addCase(loginUser.fulfilled, (state, action) => {
      const { logged, pseudo } = action.payload;
      state.logged = logged;
      state.pseudo = pseudo;
      state.message = {
        type: 'success',
        children: `Bienvenue ${pseudo} !`,
      };
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.pseudo = null;

      //! à la déconnexion, on supprime le token
      // delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default userReducer;
