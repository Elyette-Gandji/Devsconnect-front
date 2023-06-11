// ? Librairies
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// ? fonctions maison pour l'instance Axios
import axiosInstance from '../../utils/axios';

// ? Typage
import { MemberI } from '../../@types/interface';

interface MemberState {
  status?: string;
  list: {
    data: [];
    loading: boolean; // Nouvelle propriété
  };
  member: {
    data: MemberI | null;
    loading: boolean; // Nouvelle propriété
  };
}

// ? Initialisation
export const initialState: MemberState = {
  // Liste des membres
  list: {
    data: [],
    loading: false, // Nouvelle propriété
  },
  // Un seul membre
  member: {
    data: null,
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

export const fetchOneMember = createAsyncThunk(
  'user/fetchOneMember',
  async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/api/users/${id}`);
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
    //* Cas de la connexion réussie de fetchAllMembers
    .addCase(fetchAllMembers.fulfilled, (state, action) => {
      // ? On modifie le state
      state.list.data = action.payload.data;
      state.list.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion échouée de fetchAllMembers
    .addCase(fetchAllMembers.rejected, (state) => {
      // ? On modifie le state
      state.list.data = [];
      state.list.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion en cours de fetchAllMembers
    .addCase(fetchAllMembers.pending, (state) => {
      // ? On modifie le state
      state.list.loading = true; // Définir l'état de chargement sur true
    });

  //* Cas de la connexion réussie de fetchOneMember
  builder
    .addCase(fetchOneMember.fulfilled, (state, action) => {
      // ? On modifie le state
      state.member.data = action.payload.data;
      state.member.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion échouée de fetchOneMember
    .addCase(fetchOneMember.rejected, (state) => {
      // ? On modifie le state
      state.member.data = null;
      state.member.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion en cours de fetchOneMember
    .addCase(fetchOneMember.pending, (state) => {
      // ? On modifie le state
      state.member.loading = true; // Définir l'état de chargement sur true
    });
});

export default membersReducer;
