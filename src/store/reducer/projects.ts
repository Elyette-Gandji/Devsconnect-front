// ? Librairies
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// ? fonctions maison pour l'instance Axios
import axiosInstance from '../../utils/axios';

// ? Typage
import { ProjectI } from '../../@types/interface';

interface ProjectState {
  status?: string;
  list: {
    data: ProjectI[];

    loading: boolean;
  };
  project: {
    data: ProjectI | null;
    loading: boolean;
  };
}

// ? Initialisation
export const initialState: ProjectState = {
  // Liste des projets
  list: {
    data: [],
    loading: false, // Nouvelle propriété
  },
  // Un seul projet
  project: {
    data: null,
    loading: false, // Nouvelle propriété
  },
};

// ? Fonctions asynchrones
//* Rechercher tous les projets
export const fetchAllProjects = createAsyncThunk(
  'project/fetchAllProjects',
  async () => {
    try {
      const { data } = await axiosInstance.get('/api/projects');
      // ? On retourne le state
      return data;
    } catch (error) {
      // Gérez les erreurs potentielles ici

      console.error('Error:', error);
      throw error;
    }
  }
);

//* Rechercher un seul projet
export const fetchOneProject = createAsyncThunk(
  'project/fetchOneProject',
  async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/api/projects/${id}`);
      // ? On retourne le state
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

//* Créer un nouveau projet
export const postOneProject = createAsyncThunk(
  'project/postOneProject',
  async (projectData: ProjectI) => {
    try {
      const { data } = await axiosInstance.post('/api/projects', projectData);
      // ? On retourne le state
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

// ? Construction du reducer user avec builder qui utilise les actions pour modifier le state initial
const projectsReducer = createReducer(initialState, (builder) => {
  // ? On retourne le state selon les cas de figure suivants :
  builder
    //* Cas de la connexion réussie de fetchAllProjects
    .addCase(fetchAllProjects.fulfilled, (state, action) => {
      // ? On modifie le state
      state.list.data = action.payload.data;
      state.list.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion échouée de fetchAllProjects
    .addCase(fetchAllProjects.rejected, (state) => {
      // ? On modifie le state
      state.list.data = [];
      state.list.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion en cours de fetchAllProjects
    .addCase(fetchAllProjects.pending, (state) => {
      // ? On modifie le state
      state.list.loading = true; // Définir l'état de chargement sur true
    });

  //* Cas de la connexion réussie de fetchOneProject
  builder
    .addCase(fetchOneProject.fulfilled, (state, action) => {
      // ? On modifie le state
      state.project.data = action.payload.data;
      state.project.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion échouée de fetchOneProject
    .addCase(fetchOneProject.rejected, (state) => {
      // ? On modifie le state
      state.project.data = null;
      state.project.loading = false; // Définir l'état de chargement sur false
    })
    //* Cas de la connexion en cours de fetchOneProject
    .addCase(fetchOneProject.pending, (state) => {
      // ? On modifie le state
      state.project.loading = true; // Définir l'état de chargement sur true
    });
});

export default projectsReducer;
