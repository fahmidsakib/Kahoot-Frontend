import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Quiz from './Quiz'
import Home from './Home'
import Login from './Login'
import PlayQuiz from './PlayQuiz'
import StudentsPlay from './StudentsPlay'
import StudentsJoin from './StudentsJoin'
import MiddlePointT from './MiddlePointT'
import MiddlePointS from './MiddlePointS'
import ShowReport from './ShowReport'

export default function Main() {
    return (
        <div className="Main">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/quiz/:quizId" element={<Quiz />} />
                <Route path="/quiz/connect/t" element={<MiddlePointT />} />
                <Route path="/quiz/connect/s" element={<MiddlePointS />} />
                <Route path="/quiz/join" element={<StudentsJoin />} />
                <Route path="/quiz/play/t/:roomId" element={<PlayQuiz />} />
                <Route path="/quiz/play/s/:roomId" element={<StudentsPlay />} />
                <Route path="/show-report/:reportId" element={<ShowReport />} />
            </Routes>
        </div>
    )
}
