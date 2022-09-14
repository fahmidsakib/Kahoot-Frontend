import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateQuiz from './CreateQuiz'
import Home from './Home'
import Login from './Login'

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/create-quiz" element={<CreateQuiz />} />
            </Routes>
        </div>
    )
}
