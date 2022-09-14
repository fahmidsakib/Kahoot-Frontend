import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Quiz from './Quiz'
import Home from './Home'
import Login from './Login'

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/quiz/:quizId" element={<Quiz />} />
            </Routes>
        </div>
    )
}
