import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Quiz from './Quiz'
import Home from './Home'
import Login from './Login'
import PlayQuiz from './PlayQuiz'
import StudentsPlay from './StudentsPlay'
import StudentsJoin from './StudentsJoin'
import MiddlePoint from './MiddlePoint'

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/quiz/:quizId" element={<Quiz />} />
                <Route path="/quiz/connect" element={<MiddlePoint />} />
                <Route path="/quiz/play/t/:roomId" element={<PlayQuiz />} />
                <Route path="/quiz/join" element={<StudentsJoin />} />
                <Route path="/quiz/play/s/:roomId" element={<StudentsPlay />} />
            </Routes>
        </div>
    )
}
