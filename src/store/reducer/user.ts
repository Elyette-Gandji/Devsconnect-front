// ? Librairies
import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

//* message est utilisé pour afficher un message pop-up. On importe son typage.
import { FlashI } from '../../@types/interface';

// ? fonctions maison pour l'instance Axios
import axiosInstance from '../../utils/axios';

// ? Typage
interface UserState {
  signin: {
    id: number | null;
    message: FlashI | null;
    status?: string | null;
  };
  login: {
    id: number | null;
    logged: boolean;
    pseudo: string | null;
    message: FlashI | null;
    status?: string | null;
  };
}

// ? Initialisation
export const initialState: UserState = {
  signin: {
    id: null,
    message: null,
    status: null,
  },
  login: {
    id: null,
    logged: false,
    pseudo: null,
    message: null,
    status: null,
  },
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

      const { data } = await axiosInstance.post('/login', objData);
      // ! A la connexion, j'ajoute le token à mon instance Axios
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      // ! Pour des raisons de sécurité, on le supprime de `data`
      // delete data.token;

      // ? On retourne le state
      return data;
    } catch (error) {
      // Gérez les erreurs potentielles ici
      console.error('Error during login:', error);
      throw error;
    }
  }
);

export const signinUser = createAsyncThunk(
  'user/signinUser',
  async (formData: FormData) => {
    try {
      // ! Object.fromEntries() transforme une liste de paires clé-valeur en un objet
      const objData = Object.fromEntries(formData);

      const { data } = await axiosInstance.post('/signin', objData);
      // ? On retourne le state
      console.log('data', data);
      return data;
    } catch (error) {
      // Gérez les erreurs potentielles ici
      console.error('Error during signin:', error);
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
      state.login.logged = false;
      state.login.pseudo = null;
      state.login.message = null;
      state.login.id = null;
    })

    //* Cas de la connexion échouée
    .addCase(loginUser.rejected, (state, action) => {
      state.login.logged = false;
      state.login.pseudo = null;
      state.login.id = null;
      state.login.message = {
        type: 'error',
        children: action.error.code || 'UNKNOWN_ERROR',
        duration: 5000,
      };
    })

    //* Cas de la connexion réussie
    .addCase(loginUser.fulfilled, (state, action) => {
      const { logged, pseudo, userID } = action.payload.data;
      state.login.logged = logged;
      state.login.pseudo = pseudo;
      state.login.id = userID;
      state.login.message = {
        type: 'success',
        children: `Bienvenue ${pseudo} !`,
      };
    })
    //* Cas de l'inscription en cours
    .addCase(signinUser.pending, (state) => {
      state.signin.message = null;
    })

    //* Cas de l'inscription échouée
    .addCase(signinUser.rejected, (state, action) => {
      state.signin.message = {
        type: 'error',
        children: action.error.code || 'UNKNOWN_ERROR',
        duration: 5000,
      };
    })

    //* Cas de l'inscription réussie
    .addCase(signinUser.fulfilled, (state, action) => {
      const { status } = action.payload;
      console.log('payload', action.payload);
      state.signin.message = {
        type: 'success',
        children: status,
      };
    })

    //* Cas de la déconnexion
    .addCase(logout, (state) => {
      state.login.logged = false;
      state.login.pseudo = null;

      //! à la déconnexion, on supprime le token
      // delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default userReducer;
