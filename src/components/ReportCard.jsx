import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// import { getQuizzes, deleteQuiz } from '../slices/quiz.slice'
import { useNavigate } from 'react-router-dom';


export default function ReportCard({ report }) {

  // let dispatch = useDispatch()
  // let goto = useNavigate()


  return (
    <div className="QuizCard">
      <div className="left">
        <img src="../images/quiz.png" alt="" className="quiz" />
        <div className="title-topic-name">
          <div className="title-topic">
            <p className="title">{report.quizId.title}</p>
            <p className="topic">{report.quizId.topic}</p>
          </div>
          <div className="nameDiv">
            <img src="../images/avatar.png" alt="" className="avatar" />
            <p className="name">{report.teacherId.name}</p>
          </div>
        </div>
      </div>
      <div className="right">
        <p className="lastEdit">Quiz taken: {new Date(report.createdAt).toLocaleString()}</p>
        <button className="delete"><img src="../images/delete.png" alt="" className="deleteIcon" /></button>
      </div>
    </div>
  )
}
