import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminVendorService from "./adminVendorService";

const initialState = {
  vendors: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  error: "",
};

export const allVendors = createAsyncThunk(
  "adminUsers/vendors",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      console.log("clent side token" + token);
      return await adminVendorService.getVendors(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blockAndUnblockVendor = createAsyncThunk(
  "vendor/blockAndUnblockVendor",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await adminVendorService.blockAndUnblockVendor(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminVendorSlice = createSlice({
  name: "adminVendors",
  initialState,
  reducers: {
    reset: (state) => {
      state.vendors = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allVendors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allVendors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vendors = action.payload.AllVendors;
      })
      .addCase(allVendors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(blockAndUnblockUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(blockAndUnblockVendor.fulfilled, (state, action) => {
        let allVendors = state.vendors.map((data) =>
          data._id === action.meta.arg
            ? { ...data, isBlocked: !data.isBlocked }
            : { ...data }
        );
        return {
          vendors : allVendors,
          isLoading: false,
          isSuccess: true,
          message: action.payload,
        };
      })
      .addCase(blockAndUnblockVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminVendorSlice.actions;
export default adminVendorSlice.reducer;
