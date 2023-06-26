import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

export const addParticipantToProject = createAsyncThunk(
  'participants/addParticipantToProject',
  async ({ projectId, userId }) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/projects/${projectId}/user/${userId}`
      );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const deleteParticipantFromProject = createAsyncThunk(
  'participants/deleteParticipant',
  async ({ userId, projectId }) => {
    try {
      await axiosInstance.delete(`/api/projects/${projectId}/user/${userId}`);
      return { userId, projectId };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const participantsReducer = createReducer([], (builder) => {
  builder
    .addCase(addParticipantToProject.pending, (state) => {})
    .addCase(addParticipantToProject.fulfilled, (state, action) => {
      state.push(action.payload);
    })
    .addCase(addParticipantToProject.rejected, (state) => {})
    .addCase(deleteParticipantFromProject.pending, (state) => {})
    .addCase(deleteParticipantFromProject.fulfilled, (state, action) => {
      const { userId, projectId } = action.payload;
      return state.filter(
        (participant) =>
          participant.userId !== userId || participant.projectId !== projectId
      );
    })
    .addCase(deleteParticipantFromProject.rejected, (state) => {});
});

export default participantsReducer;
