import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getQuizzes, deleteQuiz, updateNewQuizRoomInfo } from '../slices/quiz.slice'
import { io } from 'socket.io-client'

export default function QuizCard({ quiz }) {
  
  let dispatch = useDispatch()

  let deleteQuizFunc = async (event) => {
    event.preventDefault()
    await dispatch(deleteQuiz(quiz._id))
    await dispatch(getQuizzes(null))
  }

  let createNewQuizRoom = async () => {
    
  }

  return (
    <div className="QuizCard">
      <div className="left">
        <img src="../images/quiz.png" alt="" className="quiz" />
        <div className="title-topic-name">
          <div className="title-topic">
            <p className="title">{quiz.title}</p>
            <p className="topic">{quiz.topic}</p>
          </div>
          <div className="nameDiv">
            <img src="../images/avatar.png" alt="" className="avatar" />
            <p className="name">{quiz.teacherId.name}</p>
          </div>
        </div>
      </div>
      <div className="right">
        <p className="lastEdit">Last Edit: {new Date(quiz.updatedAt).toLocaleString()}</p>
        <div className="quiz-buttonDiv">
          <button onClick={(event) => deleteQuizFunc(event)} className="delete"><img src="../images/delete.png" alt="" className="deleteIcon" /></button>
          <div className="edit-start">
            <Link to={`/quiz/${quiz._id}`} className="link"><button className="edit">Edit</button></Link>
            <button onClick={() => createNewQuizRoom()} className="edit">Start</button>
          </div>
        </div>
      </div>
    </div>
  )
}
