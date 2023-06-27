// ? Librairies
import { createAction, createReducer } from '@reduxjs/toolkit';

// ? Fonctions externe
import loginUser from '../actions/login';
import signinUser from '../actions/signin';
import logout from '../actions/logout';
import updateMember from '../actions/updateMember';
import deleteMember from '../actions/deleteMember';

// ? instance axios
import { axError } from '../../utils/axios';

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
      state.flash = action.payload;
    })
    //* Cas de la connexion réussie
    .addCase(loginUser.fulfilled, (state, action) => {
      const { pseudo } = action.payload.data; // On récupère les données de l'api, qu'on distribue dans le state

      state.pseudo = pseudo;

      state.flash = {
        type: 'success',
        children: `Bienvenue ${pseudo} !`,
      };
    })
    //* Cas de la connexion échouée
    .addCase(loginUser.rejected, (state) => {
      state.flash = {
        type: 'error',
        children: 'Pseudo ou mot de passe incorrect',
      };
    })

    //* Cas de la déconnexion
    .addCase(logout, (state) => {
      state.flash = {
        type: 'success',
        children: 'Au revoir !',
      };
    })

    //* Cas de l'inscription réussie
    .addCase(signinUser.fulfilled, (state) => {
      state.flash = {
        type: 'success',
        children: 'Vous êtes bien inscrit, vous pouvez vous connecter !',
      };
    });

  //* Cas de l'inscription échouée
  builder.addCase(signinUser.rejected, (state) => {
    if (axError.response.data.message.includes('Email')) {
      state.flash = {
        type: 'error',
        children: 'Cette adresse email est déjà utilisée',
      };
    }
    if (axError.response.data.message.includes('Pseudo')) {
      state.flash = {
        type: 'error',
        children: 'Ce pseudo est déjà utilisé',
      };
    }
  });

  //* Cas de la mise à jour du membre réussie
  builder.addCase(updateMember.fulfilled, (state) => {
    state.flash = {
      type: 'success',
      children: 'Les changements ont bien été pris en compte !',
    };
  });

  //* Cas de la mise à jour du membre échouée
  builder.addCase(updateMember.rejected, (state) => {
    if (axError.response.data.message.includes('email')) {
      state.flash = {
        type: 'error',
        children: 'Cette adresse email est déjà utilisée',
      };
    }
    if (axError.response.data.message.includes('pseudo')) {
      state.flash = {
        type: 'error',
        children: 'Ce pseudo est déjà utilisé',
      };
    }
  });

  //* Cas de la suppression du membre réussie
  builder.addCase(deleteMember.fulfilled, (state) => {
    state.flash = {
      type: 'success',
      children: 'Le compte a bien été supprimé !',
    };
  });

  //* Cas de la suppression du membre échouée
  builder.addCase(deleteMember.rejected, (state) => {
    state.flash = {
      type: 'error',
      children: 'Une erreur est survenue, veuillez réessayer plus tard !',
    };
  });
});

export default mainReducer;
