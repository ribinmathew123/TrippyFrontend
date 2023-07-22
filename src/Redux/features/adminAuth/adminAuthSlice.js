import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "./adminAuthService";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const admin = JSON.parse(localStorage.getItem('admin'));

const initialState = {
  admin: admin ? admin : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

// Login Admin
export const adminLogin = createAsyncThunk('adminAuth/login', async (adminData, thunkAPI) => {
  try {
    return await adminAuthService.login(adminData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});





// Logout Admin
export const adminLogout = createAsyncThunk('adminAuth/logout', async () => {
  await adminAuthService.logout();
});

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.admin = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
      .addCase(adminLogout.fulfilled, (state) => {
        state.admin = null;
      });
  }
});

export const { reset } = adminAuthSlice.actions;

const persistConfig = {
  key: 'adminAuth',
  storage,
};

const persistedAdminAuthReducer = persistReducer(persistConfig, adminAuthSlice.reducer);

export default persistedAdminAuthReducer;
