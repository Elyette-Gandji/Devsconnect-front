// ? Librairies
import { createAction, createReducer } from '@reduxjs/toolkit';

// ? Typage local
interface LogState {
  modalLogin: boolean;
  modalSignin: boolean;
}

// ? InitialState
const initialState: LogState = {
  modalLogin: false,
  modalSignin: false,
};

// ? Fonctions synchrone
export const toggleModalLogin = createAction('log/toggleModalLogin');
export const toggleModalSignin = createAction('log/toggleModalSignin');

// ? Reducer
const logReducer = createReducer(initialState, (builder) => {
  builder
    //* Modifie le state en fonction de l'action
    .addCase(toggleModalLogin, (state) => {
      state.modalLogin = !state.modalLogin; // Inverse la valeur du state
      state.modalSignin = false; // Remet la valeur du state signin à false
    })
    //* Modifie le state en fonction de l'action
    .addCase(toggleModalSignin, (state) => {
      state.modalSignin = !state.modalSignin; // Inverse la valeur du state
      state.modalLogin = false; // Remet la valeur du state login à false
    });
});

export default logReducer;
