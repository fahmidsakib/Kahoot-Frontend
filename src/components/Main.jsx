import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Quiz from './Quiz'
import Home from './Home'
import Login from './Login'
import PlayQuiz from './PlayQuiz'

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/quiz/:quizId" element={<Quiz />} />
                <Route path="/play-quiz/:quizId/:roomId" element={<PlayQuiz />} />
            </Routes>
        </div>
    )
}
