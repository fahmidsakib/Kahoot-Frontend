import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateAuthenticated } from '../slices/user.slice'


export default function Home() {

    let goto = useNavigate()
    let dispatch = useDispatch()

    let signoutFunc = () => {
        localStorage.removeItem('accessToken-kahoot')
        localStorage.removeItem('refreshToken-kahoot')
        localStorage.removeItem('userInfo-kahoot')
        dispatch(updateAuthenticated(false))
        goto('/')
    }

    return (
        <div className="Home">
            <div className="header">
                <p className="logo">K A H O O T!</p>
                <div className="buttonDib">
                    <button className="templates">Templates</button>
                    <button className="reports">Reports</button>
                </div>
                <button onClick={() => signoutFunc()} className="signout">Signout</button>
            </div>
            <div className="main">
                
            </div>
        </div>
    )
}
