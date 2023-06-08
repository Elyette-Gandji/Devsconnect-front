// ? Librairies
import {
  createAction,
  createReducer,
  createAsyncThunk,
} from '@reduxjs/toolkit';

//* message est utilisé pour afficher un message pop-up. On importe son typage.
import { Flash } from '../../@types/interface';

// ? fonctions maison
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
  pseudo: 'jean',
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
      //     // Vérifiez les informations d'identification
      //     const hardcodedEmail = 'bob@bob.com';
      //     const hardcodedPassword = 'bob';
      //     // Récupérez les informations d'identification du formulaire
      //     const email = formData.get('email');
      //     const password = formData.get('password');

      //     if (email === hardcodedEmail && password === hardcodedPassword) {
      //       return {
      //         logged: true,
      //         message: `Bienvenue !`,
      //         pseudo: 'bob',
      //       };
      //     }
      //     return { logged: false, pseudo: 'raté' };
      //   } catch (error) {
      //     console.error('Error during login:', error);
      //     throw error;
      //   }
      // }
      // ___________________________________________________________________________

      const objData = Object.fromEntries(formData);
      // ! Object.fromEntries() transforme une liste de paires clé-valeur en un objet

      const { data } = await axiosInstance.post('/api/users', objData);

      // ! A la connexion, j'ajoute le token à mon instance Axios
      // axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

      // ! Pour des raisons de sécurité, on le supprime de `data`
      // delete data.token;

      // Ici, vous pouvez traiter la réponse de la connexion, mettre à jour votre Redux store, etc.
      const { success, message } = data;

      if (success) {
        // return { success: true, message: 'Login successful' };
        // ? On retourne le state
        return data as {
          logged: boolean;
          pseudo: string;
        };
      }
      return { success: false, message };
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
      console.log('loginUser.pending');
      // state.logged = false;
      // state.pseudo = null;
      // state.message = null;
    })

    //* Cas de la connexion échouée
    .addCase(loginUser.rejected, (state, action) => {
      console.log('loginUser.rejected');
      // state.logged = false;
      // state.pseudo = 'rene';
      // state.message = {
      //   type: 'error',
      //   children: action.error.code || 'UNKNOWN_ERROR',
      //   duration: 5000,
      // };
    })

    //* Cas de la connexion réussie
    .addCase(loginUser.fulfilled, (state, action) => {
      console.log('loginUser.fulfilled');
      const { logged, pseudo, message } = action.payload;
      state.logged = logged;
      state.pseudo = pseudo;
      // state.message = message;
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
