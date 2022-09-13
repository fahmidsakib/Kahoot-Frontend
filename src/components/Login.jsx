import Snackbar from '@mui/material/Snackbar';
import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import SignIn from './Signin'
import SignUp from './Signup'
import { updateErrorAlert } from '../slices/user.slice'

export default function Login() {

    let dispatch = useDispatch()
    let { toggleSignup, authenticated, userError, userAlert } = useSelector(state => state.userSlice)

    return authenticated ? <Navigate to="/home" replace={true} />
        :
        <div className="Login">
            {toggleSignup ? <SignUp /> : <SignIn />}
            <Snackbar autoHideDuration={2000} open={userError !== null} onClose={() => dispatch(updateErrorAlert())} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} message={userError} />
            <Snackbar autoHideDuration={2000} open={userAlert !== null} onClose={() => dispatch(updateErrorAlert())} anchorOrigin={{vertical: "bottom", horizontal: "right"}} message={userAlert} />
        </div>
}
