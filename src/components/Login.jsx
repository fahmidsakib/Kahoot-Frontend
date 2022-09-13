import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import SignIn from './Signin'
import SignUp from './Signup'

export default function Login() {

    let dispatch = useDispatch()
    let { toggleSignup, authenticated } = useSelector(state => state.userSlice)

    return authenticated ? <Navigate to="/home" replace={true} />
        :
        <div className="Login">
            {toggleSignup ? <SignUp /> : <SignIn />}
            
        </div>
}
