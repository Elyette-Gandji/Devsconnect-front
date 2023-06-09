// ? Si utilisation d'API, décommenter lignes 5 et 20
// ? Typer les fonctions synchrone et asynchrone (`<>` ligne 17 et 20)
// ? Remplacer les `state1` et `action1` par les noms de vos states et actions

// import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';

interface MainState {
  windowWidth: number;
}

const initialState: MainState = {
  windowWidth: window.innerWidth,
};

// Fonctions synchrone
export const resizeWindow = createAction('main/resizeWindow');

const mainReducer = createReducer(initialState, (builder) => {
  builder.addCase(resizeWindow, (state) => {
    state.windowWidth = window.innerWidth;
  });
});

export default mainReducer;
