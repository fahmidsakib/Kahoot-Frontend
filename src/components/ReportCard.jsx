import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteReport } from '../slices/quiz.slice';


export default function ReportCard({ report }) {

  let dispatch = useDispatch()


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
        <button onClick={(event) => { event.preventDefault(); dispatch(deleteReport(report._id)) }} className="delete"><img src="../images/delete.png" alt="" className="deleteIcon" /></button>
      </div>
    </div>
  )
}
