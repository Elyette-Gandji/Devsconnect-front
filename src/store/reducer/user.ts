// ? Librairies
import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

//* message est utilisé pour afficher un message pop-up. On importe son typage.
import { FlashI } from '../../@types/interface';

// ? Instance Axios
import axiosInstance from '../../utils/axios';

// ? Typage local
interface UserState {
  signin: {
    id: number | null;
    children?: string | null;
    message: FlashI | null;
    status?: string | null;
  };
  login: {
    id: number | null;
    logged: boolean;
    pseudo: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    status?: string | null;
    message?: FlashI | null;
  };
}

// ? InitialState
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
    accessToken: null,
    refreshToken: null,
    status: null,
    message: null,
  },
};

// ? Fonctions synchrones
//* Déconnexion
export const logout = createAction('user/logout');

//* Réinitialisation du message
export const resetMessage = createAction('user/resetMessage');

// ? Fonctions asynchrones
//* Authentification
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (formData: FormData) => {
    try {
      // Object.fromEntries() transforme une liste de paires clé-valeur en un objet
      const objData = Object.fromEntries(formData);

      const { data } = await axiosInstance.post('/login', objData);

      // ! A la connexion, j'ajoute le token à mon instance Axios
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;

      // ! Pour des raisons de sécurité, on le supprime de `data`
      // delete data.data.accessToken;

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
      // Object.fromEntries() transforme une liste de paires clé-valeur en un objet
      const objData = Object.fromEntries(formData);

      const { data } = await axiosInstance.post('/signin', objData);
      // ? On retourne le state
      return data;
    } catch (error) {
      // Gérez les erreurs potentielles ici
      console.error('Error during signin:', error);
      throw error;
    }
  }
);

const userReducer = createReducer(initialState, (builder) => {
  builder
    //* Cas de la connexion réussie
    .addCase(loginUser.fulfilled, (state, action) => {
      const { logged, pseudo, userId, accessToken, refreshToken } =
        action.payload.data; // On récupère les données de l'api, qu'on distribue dans le state
      state.login.logged = logged;
      state.login.pseudo = pseudo;
      state.login.accessToken = accessToken;
      state.login.refreshToken = refreshToken;
      state.login.id = userId;
      state.login.message = {
        type: 'success',
        children: `Bienvenue ${pseudo} !`,
        duration: 5000,
      };
    })

    //* Cas de la connexion échouée
    .addCase(loginUser.rejected, (state, action) => {
      state.login.logged = false;
      state.login.pseudo = null;
      state.login.id = null;
      state.login.message = {
        type: 'error',
        children: 'Pseudo ou mot de passe incorrect',
        duration: 5000,
      };
    })
    //* Cas de la connexion en cours
    .addCase(loginUser.pending, (state) => {
      state.login.logged = false;
      state.login.pseudo = null;
      state.login.id = null;
    })

    //* Cas de l'inscription réussie
    .addCase(signinUser.fulfilled, (state) => {
      state.signin.message = {
        type: 'success',
        children: 'Vous êtes bien inscrit, merci de vous connecter maintenant',
      };
    })

    //* Cas de l'inscription échouée
    .addCase(signinUser.rejected, (state, action) => {
      state.signin.message = {
        type: 'error',
        children: action.error.code || 'UNKNOWN_ERROR',
        duration: 5000,
      };
    })

    //* Cas de la déconnexion
    .addCase(logout, (state) => {
      state.login.logged = false;
      state.login.pseudo = null;
      state.login.message = null;

      //! à la déconnexion, on supprime le token
      // delete axiosInstance.defaults.headers.common.Authorization;
    });

  //* Cas de la réinitialisation du message
  builder.addCase(resetMessage, (state) => {
    state.login.message = null;
    state.signin.message = null;
  });
});

export default userReducer;
