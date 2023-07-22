import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authServices'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
    user: user ? user :null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:'',
}



// Register user
export const userRegister = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// ForgotPassword
 export const forgotPass=createAsyncThunk('auth/forgot',async(pass,thunkAPI)=>{

    try {
        return await authService.forgotPassword(pass)

    } catch (error) {
        if (error.response && error.response.status === 400) {
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
          }else{
  
            return thunkAPI.rejectWithValue(" failed");
          }
    }
 })

 // Otp Verification
export const otpverification = createAsyncThunk('auth/otpVerification', async ({otpCode,newPassword} ,thunkAPI) => {
    try {
        const phone = JSON.parse(localStorage.getItem('forgot'))
        const {  phoneNumber } = phone
      
        const data = {otpCode ,newPassword,phoneNumber}
        localStorage.removeItem('forgot')
        return await authService.otpData(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})









export const otp = createAsyncThunk('auth/otp', async (otpCode, thunkAPI) => {
    try {
      const UnRegUser = JSON.parse(localStorage.getItem('userData'));
      if (!UnRegUser) {
        throw new Error('Otp Error! user Data not found ');
      }
  
      const { name, email, password, phoneNumber } = UnRegUser;
      const data = { name, email, password, phoneNumber, otpCode };
      return await authService.otp(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
  


// Login user 
export const userLogin = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {

        if (error.response && error.response.status === 400) {
            const message = error.response.data.message;
            console.log(message);
            return thunkAPI.rejectWithValue(message);
          }else{
  
            return thunkAPI.rejectWithValue("login failed");
          }

        // const message = (error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
        // return thunkAPI.rejectWithValue(message)
    }
})

export const googleLogin = createAsyncThunk('auth/userLogin', async (user, thunkAPI) => {
    try {
        return await authService.googleLogin(user)
    } catch (error) {

        if (error.response && error.response.status === 400) {
            const message = error.response.data.message;
            console.log(message);
            return thunkAPI.rejectWithValue(message);
          }else{
  
            return thunkAPI.rejectWithValue("login failed");
          }

        // const message = (error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
        // return thunkAPI.rejectWithValue(message)
    }
})


// Register user
export const googleRegister = createAsyncThunk('auth/googleSignup', async (user, thunkAPI) => {
    try {
        return await authService.googleSignup(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Add Profile
export const addProfilePic = createAsyncThunk(
    "auth/add",
    async (data, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token;
        console.log("token" + token);
  
        return await authService.addPic(data, token);
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
  







      export const userLogout = createAsyncThunk('auth/userLogout', async () => {
        await authService.userLogout()
    })
    


// // Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})





export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset: (state) => {
            state.isLoading = false,
            state.isError = false,
            state.isSuccess = false,
            state.message = ''
        },
    addUser(state,action){
            state.isSuccess = true,
            state.user = action.payload
    }



    }, 
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userRegister.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true,
                state.message = action.payload
                state.user = null
            })

            .addCase(otp.pending, (state) => {
                state.isLoading = true
            })
            .addCase(otp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(otp.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.user = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })

            .addCase(googleRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(googleRegister.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(googleRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true,
                state.message = action.payload
                state.user = null
            })



            .addCase(googleLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.user = action.payload
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })





            .addCase(forgotPass.pending, (state) => {
                state.isLoading = true
            })
            .addCase(forgotPass.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(forgotPass.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true,
                state.message = action.payload
                state.user = null
            })


            .addCase(otpverification.pending, (state) => {
                state.isLoading = true
            })
            .addCase(otpverification.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(otpverification.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true,
                state.message = action.payload
                state.user = null
            })


            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })


            .addCase(addProfilePic.pending, (state) => {
                state.isLoading = true;
              })
              .addCase(addProfilePic.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), image: action.payload.user.image }));

                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload.user
                state.isError=action.payload
                state.message = action.payload.message;
              })
              .addCase(addProfilePic.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = action.payload;
              })
    }
})

export const {reset,addUser} = authSlice.actions;

export default authSlice.reducer