import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import placeService from "./updatePlaceService";

const initialState = {
  places: [],
  placeIsLoading: false,
  placeIsSuccess: false,
  placeIsError: false,
  placeMessage: "",
  placeError: "",
  message:""
};



// update Place
export const updatePlace = createAsyncThunk(
  "places/update",
  async ( form, thunkAPI) => {
    console.log(form);
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await placeService.updatePlace(form, token);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue('Update failed');
      }
    }
  }
);








export const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    placeReset: (state) => {
      state.places = [];
      state.placeError = "";
      state.placeIsError = false;
      state.placeMessage = "";
      state.placeIsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePlace.pending, (state) => {
        state.placeIsLoading = true;
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.placeIsLoading = false;
        state.placeIsSuccess = true;
        state.placeMessage = action.payload;
      })
      .addCase(updatePlace.rejected, (state, action) => {
        state.placeIsLoading = false;
        state.placeIsSuccess = true;
        state.placeError = action.payload;
      })

  },
});

export const { placeReset } = placeSlice.actions;
export default placeSlice.reducer;
