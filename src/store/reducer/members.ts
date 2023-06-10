// ? Librairies
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// ? fonctions maison pour l'instance Axios
import axiosInstance from '../../utils/axios';

// ? Typage
interface MemberState {
  status?: string;
  list: {
    data: [];
    loading: boolean; // Nouvelle propriété
  };
}

// ? Initialisation
export const initialState: MemberState = {
  list: {
    data: [],
    loading: false, // Nouvelle propriété
  },
};

// ? Fonctions asynchrones
//* Authentification
export const fetchAllMembers = createAsyncThunk(
  'user/fetchAllMembers',
  async () => {
    try {
      const { data } = await axiosInstance.get('/api/users');
      // ? On retourne le state
      return data;
    } catch (error) {
      // Gérez les erreurs potentielles ici
      console.error('Error:', error);
      throw error;
    }
  }
);

// ? Construction du reducer user avec builder qui utilise les actions pour modifier le state initial
const membersReducer = createReducer(initialState, (builder) => {
  // ? On retourne le state selon les cas de figure suivants :
  builder
    //* Cas de la connexion réussie
    .addCase(fetchAllMembers.fulfilled, (state, action) => {
      // ? On modifie le state
      state.list.data = action.payload.data;
      state.list.loading = false; // Définir l'état de chargement sur false
      console.log('state:', state.list.data);
    })
    //* Cas de la connexion échouée
    .addCase(fetchAllMembers.rejected, (state, action) => {
      // ? On modifie le state
      state.data = [];
      state.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion en cours
    .addCase(fetchAllMembers.pending, (state, action) => {
      // ? On modifie le state
      state.loading = true; // Définir l'état de chargement sur true
    });
});

export default membersReducer;
