import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorService from './VendorServices'

// Get user from localStorage
const vendor = JSON.parse(localStorage.getItem('vendor'))


const initialState = {
    vendor: vendor ? vendor :null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:'',
}



// Register user
export const vendorRegister = createAsyncThunk('vendor/register', async (vendor, thunkAPI) => {
    try {
        return await vendorService.register(vendor)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// ForgotPassword
 export const forgotPass=createAsyncThunk('vendor/forgot',async(pass,thunkAPI)=>{

    try {
        return await vendorService.forgotPassword(pass)

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
// export const otpverification = createAsyncThunk('vendor/otpVerification', async ({otpCode,newPassword} ,thunkAPI) => {
//     try {
//         const phone = JSON.parse(localStorage.getItem('forgot'))
//         const {  phoneNumber } = phone
      
//         const data = {otpCode ,newPassword,phoneNumber}
//         localStorage.removeItem('forgot')
//         return await vendorService.otpData(data)
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

export const otpverification = createAsyncThunk('vendor/otpVerification', async ({otpCode,newPassword} ,thunkAPI) => {
    try {
        const phone = JSON.parse(localStorage.getItem('forgot'))
        const {  phoneNumber } = phone
      
        const data = {otpCode ,newPassword,phoneNumber}
        localStorage.removeItem('forgot')
        return await vendorService.otpData(data)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})





// Otp Verification
// export const otp = createAsyncThunk('auth/otp', async (otpCode, thunkAPI) => {
//     try {
//         const UnRegUser = JSON.parse(localStorage.getItem('userData'))
//         const { name, email, password, phoneNumber } = UnRegUser
//         const data = { name, email, password, phoneNumber, otpCode }
//         localStorage.removeItem('userData')
//         return await authService.otp(data)
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })


export const otp = createAsyncThunk('vendor/otp', async (otpCode, thunkAPI) => {
    try {
      const UnRegUser = JSON.parse(localStorage.getItem('vendorData'));
      if (!UnRegUser) {
        throw new Error('Otp Error! user Data not found ');
      }
  
      const { name, email, password, phoneNumber } = UnRegUser;
      const data = { name, email, password, phoneNumber, otpCode };
      return await vendorService.otp(data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
  


// Login user 
export const login = createAsyncThunk('vendor/login', async (vendor, thunkAPI) => {
    try {
        return await vendorService.login(vendor)
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









// Logout user
export const logout = createAsyncThunk('vendor/logout', async () => {
    await vendorService.logout()
})

export const vendorSlice = createSlice({
    name:"VendorAuth",
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
            state.vendor = action.payload
    }



    }, 
    extraReducers: (builder) => {
        builder
            .addCase(vendorRegister.pending, (state) => {
                state.isLoading = true
            })
            .addCase(vendorRegister.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(vendorRegister.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true,
                state.message = action.payload
                state.vendor = null
            })

            

            .addCase(otp.pending, (state) => {
                state.isLoading = true
            })
            .addCase(otp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.vendor = action.payload
            })
            .addCase(otp.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.vendor = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.vendor = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.vendor = null
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
                state.vendor = null
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
                state.vendor = null
            })







            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset,addUser} = vendorSlice.actions;

export default vendorSlice.reducer