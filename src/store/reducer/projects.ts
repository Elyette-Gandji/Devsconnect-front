import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';
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
      state.list.data = action.payload.data;
      state.list.loading = false;
    })
    .addCase(fetchAllProjects.rejected, (state) => {
      state.list.data = [];
      state.list.loading = false;
    })
    .addCase(fetchAllProjects.pending, (state) => {
      state.list.loading = true;
    })
    .addCase(fetchOneProject.fulfilled, (state, action) => {
      state.project.data = action.payload.data;
      state.project.loading = false;
    })
    .addCase(fetchOneProject.rejected, (state) => {
      state.project.data = null;
      state.project.loading = false;
    })
    .addCase(fetchOneProject.pending, (state) => {
      state.project.loading = true;
    })
    .addCase(deleteOneProject.fulfilled, (state, action) => {
      const projectId = action.payload;
      state.list.data = state.list.data.filter(
        (project) => project.id !== projectId
      );
    })
    .addCase(deleteOneProject.rejected, (state) => {
      state.project.data = null;
      state.project.loading = false;
    })
    .addCase(deleteOneProject.pending, (state) => {
      state.project.loading = false;
    })
    .addCase(postOneProject.fulfilled, (state, action) => {
      state.project.data = action.payload;
      state.project.loading = false;
    })
    .addCase(postOneProject.rejected, (state) => {
      state.project.data = null;
      state.project.loading = false;
    })
    .addCase(postOneProject.pending, (state) => {
      state.project.loading = true;
    });
});

export default projectsReducer;
