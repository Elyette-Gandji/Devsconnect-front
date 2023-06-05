// ? Si utilisation d'API, décommenter lignes 5 et 20
// ? Typer les fonctions synchrone et asynchrone (`<>` ligne 17 et 20)
// ? Remplacer les `state1` et `action1` par les noms de vos states et actions

// import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAction, createReducer } from '@reduxjs/toolkit';

interface MainState {
  state1: [];
}

const initialState: MainState = {
  state1: [],
};

// Fonctions synchrone
export const action1 = createAction('main/action1');

// Fonctions asynchrone
// export const  = createAsyncThunk<>('main/action1');

const mainReducer = createReducer(initialState, (builder) => {
  builder.addCase(action1, (state, action) => {
    state.state1;
  });
});

export default mainReducer;
