import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import packageService from "./updatePackageService";

const initialState = {
  package: [],
  packageIsLoading: false,
  packageIsSuccess: false,
  packageIsError: false,
  packageMessage: "",
  packageError: "",
  message:""
};

// fetchPlace





// update Place
export const updatePackage = createAsyncThunk(
  "package/update",
  async ( form, thunkAPI) => {
    console.log(form);
    try {
      const token = thunkAPI.getState().VendorAuth.vendor.token

      return await packageService.updatePackage(form, token);
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








export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    placeReset: (state) => {
      state.package = [];
      state.packageError = "";
      state.packageIsError = false;
      state.packageMessage = "";
      state.packageIsSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePackage.pending, (state) => {
        state.packageIsLoading = true;
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        state.packageIsLoading = false;
        state.packageIsSuccess = true;
        state.packageMessage = action.payload;
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.packageIsLoading = false;
        state.packageIsSuccess = true;
        state.package = action.payload;
      })

  },
});

export const { placeReset } = packageSlice.actions;
export default packageSlice.reducer;
