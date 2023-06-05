//! reducer user pour authentification
//! est importer dans les composants de formmulaires

//? Librairies
import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";

//* message est utilisé pour afficher un message pop-up. On importe son typage.
import { Flash } from "../../@types/chat";

//? fonctions maison
import axiosInstance from "../../utils/axios"; //! Vérifier le chemin

//? Typage
interface UserState {
  logged: boolean;
  pseudo: string | null;
  message: Flash | null;
}

//? Initialisation
export const initialState: UserState = {
  logged: false,
  pseudo: null,
  message: null,
};

//? Fonctions synchrones
//* Déconnexion
export const logout = createAction("user/logout");

//? Fonctions asynchrones
//* Authentification
export const login = createAsyncThunk(
  "user/login",
  async (formData: FormData) => {
    //! Object.fromEntries() transforme une liste de paires clé-valeur en un objet
    const objData = Object.fromEntries(formData);

    //* data est le retour de la requête axios, on le déstructure les données
    const { data } = await axiosInstance.post("/login", objData);

    //! A la connexion, j'ajoute le token à mon instance Axios
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.token}`;

    // ! Pour des raisons de sécurité, on le supprime de `data`
    delete data.token;

    //? On retourne le state
    return data as {
      logged: boolean;
      pseudo: string;
    };
  }
);

//? Construction du reducer user avec builder qui utilise les actions pour modifier le state initial
const userReducer = createReducer(initialState, (builder) => {
  //? On retourne le state selon les cas de figure suivants :
  builder

    //* Cas de la connexion en cours
    .addCase(login.pending, (state) => {
      state.logged = false;
      state.pseudo = null;
      state.message = null;
    })

    //* Cas de la connexion échouée
    .addCase(login.rejected, (state, action) => {
      state.logged = false;
      state.pseudo = null;
      state.message = {
        type: "error",
        children: action.error.code || "UNKNOWN_ERROR",
        duration: 5000,
      };
    })

    //* Cas de la connexion réussie
    .addCase(login.fulfilled, (state, action) => {
      const { logged, pseudo } = action.payload;
      state.logged = logged;
      state.pseudo = pseudo;
      state.message = {
        type: "success",
        children: `Bienvenue ${pseudo} !`,
      };
    })
    .addCase(logout, (state) => {
      state.logged = false;
      state.pseudo = null;

      //! à la déconnexion, on supprime le token
      delete axiosInstance.defaults.headers.common.Authorization;
    });
});

export default userReducer;
