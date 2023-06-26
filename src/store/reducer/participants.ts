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

export const validatePendingParticipant = createAsyncThunk(
  'participants/validatePendingParticipant',
  async ({ projectId, userId }) => {
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
        const { userId } = action.payload;
        if (
          state.pendingParticipants.find(
            (participant) => participant.userId === userId
          )
        ) {
          state.pendingParticipants = state.pendingParticipants.filter(
            (participant) => participant.userId !== userId
          );
        } else {
          state.participants.push(action.payload);
        }
      })
      .addCase(deleteParticipantFromProject.fulfilled, (state, action) => {
        const { userId, projectId } = action.payload;
        state.participants = state.participants.filter(
          (participant) =>
            participant.userId !== userId || participant.projectId !== projectId
        );
        state.pendingParticipants = state.pendingParticipants.filter(
          (participant) =>
            participant.userId !== userId || participant.projectId !== projectId
        );
      })
      .addCase(validatePendingParticipant.fulfilled, (state, action) => {
        const { userId } = action.payload;
        const pendingParticipantIndex = state.pendingParticipants.findIndex(
          (participant) => participant.userId === userId
        );
        if (pendingParticipantIndex !== -1) {
          const [participant] = state.pendingParticipants.splice(
            pendingParticipantIndex,
            1
          );

          state.participants.push(participant);
        }
      });
  }
);

export default participantsReducer;
