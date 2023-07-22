import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import placeService from "./addPlaceService";

const initialState = {
  places: [],
  placeIsLoading: false,
  placeIsSuccess: false,
  placeIsError: false,
  placeMessage: "",
  placeError: "",
  message:""
};

// Add Place
export const addPlace = createAsyncThunk(
  "places/add",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      // console.log("token" + token);

      return await placeService.addPlace(data, token);
    } 
    
  
  catch (error) {

      if (error.response && error.response.status === 400) {

          const message = error.response.data.message;
          console.log(message);
          return thunkAPI.rejectWithValue(message);
        }else{

          return thunkAPI.rejectWithValue("upload failed");
        }
      }
    });






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
      .addCase(addPlace.pending, (state) => {
        state.placeIsLoading = true;
      })
      .addCase(addPlace.fulfilled, (state, action) => {
        state.placeIsLoading = false;
        state.placeIsSuccess = true;
        state.placeMessage = action.payload;
      })
      .addCase(addPlace.rejected, (state, action) => {
        state.placeIsLoading = false;
        state.placeIsSuccess = true;
        state.placeError = action.payload;
      })

  },
});

export const { placeReset } = placeSlice.actions;
export default placeSlice.reducer;
