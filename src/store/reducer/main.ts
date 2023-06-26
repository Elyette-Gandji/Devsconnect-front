// ? Librairies
import { createAction, createReducer } from '@reduxjs/toolkit';

// ? Fonctions externe
import loginUser from '../actions/login';
import signinUser from '../actions/signin';
import logout from '../actions/logout';

// ? Typage global
import { FlashI } from '../../@types/interface';

// ? Typage local

export interface MainState {
  windowWidth: number;
  flash?: FlashI | null;
  pseudo?: string | null;
}

// ? InitialState
const initialState: MainState = {
  windowWidth: window.innerWidth,
  flash: null,
  pseudo: null,
};

// ? Fonctions synchrone

export const resizeWindow = createAction('main/resizeWindow');

export const updateFlash = createAction<FlashI>('main/updateFlash');

//* Réinitialisation du message
export const resetMessage = createAction('main/resetMessage');

// ? Reducer
const mainReducer = createReducer(initialState, (builder) => {
  builder.addCase(resizeWindow, (state) => {
    state.windowWidth = window.innerWidth; // Modifie la valeur du state
  });

  builder
    //* Cas de la réinitialisation du message
    .addCase(resetMessage, (state) => {
      state.flash = null;
    })
    //* Cas de la mise à jour du message
    .addCase(updateFlash, (state, action) => {
      console.log(action.payload);
      state.flash = action.payload;
    })
    //* Cas de la connexion réussie
    .addCase(loginUser.fulfilled, (state, action) => {
      const { pseudo } = action.payload.data; // On récupère les données de l'api, qu'on distribue dans le state

      state.pseudo = pseudo;

      state.flash = {
        type: 'success',
        children: `Bienvenue ${pseudo} !`,
        duration: 5000,
      };
    })
    //* Cas de la connexion échouée
    .addCase(loginUser.rejected, (state) => {
      state.flash = {
        type: 'error',
        children: 'Pseudo ou mot de passe incorrect',
        duration: 5000,
      };
    })

    //* Cas de la déconnexion
    .addCase(logout, (state) => {
      state.flash = null;
    })

    //* Cas de l'inscription réussie
    .addCase(signinUser.fulfilled, (state) => {
      state.flash = {
        type: 'success',
        children: 'Vous êtes bien inscrit, merci de vous connecter maintenant',
      };
    });

  //* Cas de l'inscription échouée
  // .addCase(signinUser.rejected, (state, action) => {
  //   state.flash = {
  //     type: 'error',
  //     children: action.error.message || 'llUNKNOWN_ERROR',
  //     duration: 5000,
  //   };
  // });
});

export default mainReducer;
