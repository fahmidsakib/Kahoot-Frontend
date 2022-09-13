import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




let userSlice = createSlice({
    name: 'teacher-slice',
    initialState: {
        toggleSignup: false,
        userError: null,
        userAlert: null,
        userLoading: null,
        authenticated: localStorage.getItem('userInfo-kahoot') !== null ? true: false,
        user: localStorage.getItem('userInfo-kahoot') !== null ? localStorage.getItem('userInfo-kahoot') : {},
        accessToken: localStorage.getItem('accessToken-kahoot') !== null ? localStorage.getItem('accessToken-kahoot') : '',
        refreshToken: localStorage.getItem('refreshToken-kahoot') !== null ? localStorage.getItem('refreshToken-kahoot') : '',
    },
    reducers: {
        updateToggleSignup: (state, action) => {
            state.toggleSignup = action.payload
        }
    },
    extraReducers(builder){

    }
})

export default userSlice.reducer
export const { updateToggleSignup } = userSlice.actions
