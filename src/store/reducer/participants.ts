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

const participantsReducer = createReducer([], (builder) => {
  builder.addCase(addParticipantToProject.pending, (state) => {});

  builder.addCase(addParticipantToProject.fulfilled, (state, action) => {
    // Handle the successful addition of the user to the project
    // You can update the state accordingly based on your data structure
    // For example, if your state is an array of participants, you can push the new participant:
    state.push(action.payload);
  });

  builder.addCase(addParticipantToProject.rejected, (state) => {});
});

export default participantsReducer;
