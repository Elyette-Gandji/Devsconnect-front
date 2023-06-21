// ? Librairies
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

// ? Instance Axios
import axiosInstance from '../../utils/axios';

// ? Typage global
import { ProjectI } from '../../@types/interface';

// ? Typage local
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

// ? InitialState
export const initialState: ProjectState = {
  list: {
    data: [],
    loading: false,
  },
  project: {
    data: null,
    loading: false,
  },
};

// ? Fonctions asynchrones
export const fetchAllProjects = createAsyncThunk(
  'project/fetchAllProjects',
  async () => {
    try {
      const { data } = await axiosInstance.get('/api/projects');
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

export const fetchOneProject = createAsyncThunk(
  'project/fetchOneProject',
  async (id: string) => {
    try {
      const { data } = await axiosInstance.get(`/api/projects/${id}`);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

// todo
export const postOneProject = createAsyncThunk(
  'project/postOneProject',
  async (projectData: ProjectI) => {
    try {
      const { data } = await axiosInstance.post('/api/projects', projectData);
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

// todo
export const putOneProject = createAsyncThunk(
  'project/putOneProject',
  async (projectData: ProjectI) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/projects/${projectData.id}`,
        projectData
      );
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

// todo
export const deleteOneProject = createAsyncThunk(
  'project/deleteOneProject',
  async (projectId: string) => {
    try {
      await axiosInstance.delete(`/api/projects/${projectId}`);
      return projectId;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
);

const projectsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAllProjects.fulfilled, (state, action) => {
      state.list.data = action.payload.data; // On modifie le state avec les données reçues
      state.list.loading = false; // Définir l'état de chargement sur false
    })
    .addCase(fetchAllProjects.rejected, (state) => {
      state.list.data = []; // On ne reçoit pas de données, on laisse un tableau vide
      state.list.loading = false; // Définir l'état de chargement sur false
    })
    .addCase(fetchAllProjects.pending, (state) => {
      state.list.loading = true; // Définir l'état de chargement sur true
    })
    .addCase(fetchOneProject.fulfilled, (state, action) => {
      state.project.data = action.payload.data; // On modifie le state avec les données reçues
      state.project.loading = false; // Définir l'état de chargement sur false
    })
    .addCase(fetchOneProject.rejected, (state) => {
      state.project.data = null; // On ne reçoit pas de données, on laisse null
      state.project.loading = false; // Définir l'état de chargement sur false
    })
    .addCase(fetchOneProject.pending, (state) => {
      state.project.loading = true; // Définir l'état de chargement sur true
    })
    // todo
    .addCase(deleteOneProject.fulfilled, (state, action) => {
      const projectId = action.payload;
      state.list.data = state.list.data.filter(
        (project) => project.id !== projectId
      );
    })
    // todo
    .addCase(deleteOneProject.rejected, (state) => {
      state.project.data = null;
      state.project.loading = false;
    })
    // todo
    .addCase(deleteOneProject.pending, (state) => {
      state.project.loading = false;
    });
});

export default projectsReducer;
