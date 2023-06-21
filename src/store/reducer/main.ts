// ? Librairies
import { createAction, createReducer } from '@reduxjs/toolkit';

// ? Typage local
interface MainState {
  windowWidth: number;
}

// ? InitialState
const initialState: MainState = {
  windowWidth: window.innerWidth,
};

// ? Fonctions synchrone
export const resizeWindow = createAction('main/resizeWindow');

// ? Reducer
const mainReducer = createReducer(initialState, (builder) => {
  builder.addCase(resizeWindow, (state) => {
    state.windowWidth = window.innerWidth; // Modifie la valeur du state
  });
});

export default mainReducer;
