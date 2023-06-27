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

export const requestParticipantValidation = createAsyncThunk(
  'participants/requestParticipantValidation',
  async ({ userId, projectId }) => {
    try {
      const { data } = await axiosInstance.put(
        `/api/projects/${projectId}/user/${userId}/validate`
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const participantsReducer = createReducer(
  { participants: [], pendingParticipants: [] },
  (builder) => {
    builder
      .addCase(addParticipantToProject.fulfilled, (state, action) => {
        state.pendingParticipants.push(action.payload);
      })
      .addCase(deleteParticipantFromProject.fulfilled, (state, action) => {
        state.participants = state.participants.filter(
          (participant) => participant.userId !== action.payload.userId
        );
        state.pendingParticipants = state.pendingParticipants.filter(
          (participant) => participant.userId !== action.payload.userId
        );
      })
      .addCase(requestParticipantValidation.fulfilled, (state, action) => {
        state.pendingParticipants = state.pendingParticipants.filter(
          (participant) => participant.userId !== action.payload.userId
        );
        state.participants.push(action.payload);
      });
  }
);

export default participantsReducer;
