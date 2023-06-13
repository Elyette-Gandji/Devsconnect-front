// ? Librairies
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// ? fonctions maison pour l'instance Axios
import axiosInstance from '../../utils/axios';

// ? Typage
import { TagI } from '../../@types/interface';

interface TagState {
  status?: string;
  list: {
    data: [];
  };
  tag: {
    data: TagI | null;
  };
}

// ? Initialisation
export const initialState: TagState = {
  // Liste des tags
  list: {
    data: [],
  },
  // Un seul tag
  tag: {
    data: null,
  },
};

// ? Fonctions asynchrones
//* Rechercher tous les tags
export const fetchAllTags = createAsyncThunk('tag/fetchAllTags', async () => {
  try {
    const { data } = await axiosInstance.get('/api/tags');
    // ? On retourne le state
    return data;
  } catch (error) {
    // Gérez les erreurs potentielles ici
    console.error('Error:', error);
    throw error;
  }
});

//* Rechercher un seul tag
export const fetchOneTag = createAsyncThunk(
  'tag/fetchOneTag',
  async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/api/tags/${id}`);
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
const tagReducer = createReducer(initialState, (builder) => {
  // ? On retourne le state selon les cas de figure suivants :
  builder
    //* Cas de la connexion réussie de fetchAllTags
    .addCase(fetchAllTags.fulfilled, (state, action) => {
      // ? On modifie le state
      state.list.data = action.payload.data;
    })
    //* Cas de la connexion échouée de fetchAllTags
    .addCase(fetchAllTags.rejected, (state) => {
      // ? On modifie le state
      state.list.data = [];
    });

  //* Cas de la connexion réussie de fetchOneMember
  builder
    .addCase(fetchOneTag.fulfilled, (state, action) => {
      // ? On modifie le state
      state.tag.data = action.payload.data;
    })
    //* Cas de la connexion échouée de fetchOneMember
    .addCase(fetchOneTag.rejected, (state) => {
      // ? On modifie le state
      state.tag.data = null;
    });
});

export default tagReducer;
