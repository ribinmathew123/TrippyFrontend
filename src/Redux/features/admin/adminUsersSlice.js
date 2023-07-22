import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminUsersService from "./adminUsersService";

const initialState = {
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false, 
  message: "",
  error: "",
};

export const allUsers = createAsyncThunk(
  "adminUsers/users",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      console.log("clent side token" + token);

      return await adminUsersService.getUsers(token);
      
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // return thunkAPI.rejectWithValue(message);


      if (error.response && error.response.status === 400) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }else{

        return thunkAPI.rejectWithValue("login failed");
      }
    }
  }
);

export const blockAndUnblockUser = createAsyncThunk(
  "user/blockAndUnblockUser",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().adminAuth.admin.token;
      return await adminUsersService.blockAndUnblockUser(id, token);
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

        if (error.response && error.response.status === 400) {
          const message = error.response.data.message;
          return thunkAPI.rejectWithValue(message);
        }else{

          return thunkAPI.rejectWithValue("login failed");
        }
    }
  }
);

export const adminUsersSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    reset: (state) => {
      state.users = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(blockAndUnblockUser.pending, (state) => {
      //   state.isLoading = true;
      // })

      
      .addCase(
        blockAndUnblockUser.fulfilled, (state, action) => {
        let allUsers = state.users.AllUsers.map((data) =>
          data._id === action.meta.arg ? { ...data,isBlocked:!data.isBlocked } : { ...data }
        );
        return {
          users: {
            ...state.users,
            AllUsers: allUsers,
          },
          isLoading: false,
          isSuccess: true,
          message: action.payload,
        };
      })
      .addCase(blockAndUnblockUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
