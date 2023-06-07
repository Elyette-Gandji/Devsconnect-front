import { createAction, createReducer } from '@reduxjs/toolkit';

// Types
interface LogState {
  modalLogin: boolean;
  modalSignin: boolean;
}

// InitialState
const initialState: LogState = {
  modalLogin: false,
  modalSignin: false,
};

// Fonctions synchrone
export const toggleModalLogin = createAction('log/toggleModalLogin');
export const toggleModalSignin = createAction('log/toggleModalSignin');

// Reducer
const logReducer = createReducer(initialState, (builder) => {
  builder
    // Modifie le state en fonction de l'action
    .addCase(toggleModalLogin, (state) => {
      state.modalLogin = !state.modalLogin;
      state.modalSignin = false;
    })
    // Modifie le state en fonction de l'action
    .addCase(toggleModalSignin, (state) => {
      state.modalSignin = !state.modalSignin;
      state.modalLogin = false;
    });
});

export default logReducer;
