import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import VendorService from './VendorServices'


 
// Get user from localStorage

const vendor = JSON.parse(localStorage.getItem('vendor'))

const initialState = {
    vendor: vendor ? vendor : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message:'',
}

console.log("error"+initialState.isError)
// Register user
export const vendorRegister = createAsyncThunk('vendorAuth/register', async (vendor, thunkAPI) => {
    try {

        return await VendorService.register(vendor)
    } catch (error) {
        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.error;
            return thunkAPI.rejectWithValue(errorMessage);}
        // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        // return thunkAPI.rejectWithValue(message)}
        else {
            return thunkAPI.rejectWithValue('Registration failed');
          }
    }
})


// Otp Verification
export const otp = createAsyncThunk('vendorAuth/otp', async (otpCode, thunkAPI) => {
    try {
        const UnRegVendor = JSON.parse(localStorage.getItem('vendorData'))

        const { name, email, password, phoneNumber } = UnRegVendor

        const data = { name, email, password, phoneNumber, otpCode }
        localStorage.removeItem('vendorData')
        return await VendorService.otp(data)
    } catch (error) {

        if (error.response && error.response.status === 400) {
            const errorMessage = error.response.data.error;
            return thunkAPI.rejectWithValue(errorMessage);}
            else {
                return thunkAPI.rejectWithValue('OTP failed');
              }

        // const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        // return thunkAPI.rejectWithValue(message)
    }
})


// Login user 
// export const login = createAsyncThunk('VendorAuth/login', async (vendor, thunkAPI) => {
//     try {
//         return await VendorService.login(vendor)
//     } catch (error) {


//         if (error.response && error.response.status === 400) {
//             const message = error.response.data.error;
//             return thunkAPI.rejectWithValue(message);}
//             else {
//                 return thunkAPI.rejectWithValue('Login failed');
//               }




//         // const message = (error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
//         // return thunkAPI.rejectWithValue(message)
//     }
// })


export const login = createAsyncThunk('VendorAuth/login', async (vendor, thunkAPI) => {
    try {
      return await VendorService.login(vendor);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue('Login failed');
      }
    }
  });
  


// Logout vendor
export const logout = createAsyncThunk('VendorAuth/logout', async () => {
    await VendorService.logout()
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
            // .addCase(login.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.isError = true
            //     state.message = action.payload
            //     state.vendor = null
            // })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.vendor = null;
              })
              
            .addCase(logout.fulfilled, (state) => {
                state.vendor = null
            })
    }
})

export const {reset} = vendorSlice.actions;

export default vendorSlice.reducer