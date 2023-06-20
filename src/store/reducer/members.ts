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
    loading: boolean;
  };
  member: {
    data: MemberI | null;
    loading: boolean;
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
//* Rechercher tous les membres
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

//* Rechercher un seul membre
export const fetchOneMember = createAsyncThunk(
  'user/fetchOneMember',
  async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/api/users/${id}`);
      // ? On retourne le state
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

//* Update un membre
export const updateMember = createAsyncThunk(
  'user/updateMember',
  async (
    { id, formData }: { id: number | null; formData: FormData },
    thunkAPI
  ) => {
    try {
      const { data } = await axiosInstance.put(`/api/users/${id}`, formData);

      // ? On retourne le state
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

//* Supprimer un membre
export const deleteMember = createAsyncThunk(
  'user/deleteMember',
  async (id: string) => {
    try {
      const { data } = await axiosInstance.delete(`/api/users/${id}`);
      // ? On retourne le state
      console.log('data', data);
      return { data };
    } catch (error) {
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

  builder
    //* Cas de la connexion réussie de fetchOneMember
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
  builder
    //* Cas de la connexion réussie de updateMember
    .addCase(updateMember.fulfilled, (state) => {
      // ? On modifie le state
      state.member.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion échouée de updateMember
    .addCase(updateMember.rejected, (state) => {
      // ? On modifie le state
      state.member.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion en cours de updateMember
    .addCase(updateMember.pending, (state) => {
      // ? On modifie le state
      state.member.loading = true; // Définir l'état de chargement sur true
    });
  builder
    //* Cas de la connexion réussie de deleteMember
    .addCase(deleteMember.fulfilled, (state, action) => {
      // ? On modifie le state
      state.member.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion échouée de deleteMember
    .addCase(deleteMember.rejected, (state, action) => {
      // ? On modifie le state
      state.member.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion en cours de deleteMember
    .addCase(deleteMember.pending, (state) => {
      // ? On modifie le state
      state.member.loading = true; // Définir l'état de chargement sur true
    });
});

export default membersReducer;
