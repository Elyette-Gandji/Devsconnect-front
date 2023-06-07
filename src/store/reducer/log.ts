import { createAction, createReducer } from '@reduxjs/toolkit';

interface LogState {
  modalLogin: boolean;
  modalSignin: boolean;
}

const initialState: LogState = {
  modalLogin: false,
  modalSignin: false,
};

// Fonctions synchrone
export const toggleModalLogin = createAction('log/toggleModalLogin');
export const toggleModalSignin = createAction('log/toggleModalSignin');

// Fonctions asynchrone
// export const  = createAsyncThunk<>('log/');

const logReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleModalLogin, (state) => {
      state.modalLogin = !state.modalLogin;
      state.modalSignin = false;
    })
    .addCase(toggleModalSignin, (state) => {
      state.modalSignin = !state.modalSignin;
      state.modalLogin = false;
    });
});

export default logReducer;
