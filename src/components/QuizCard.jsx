import React from 'react'

export default function QuizCard({quiz}) {
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
          <button className="delete"><img src="../images/delete.png" alt="" className="deleteIcon" /></button>
          <div className="edit-start">
            <button className="edit">Edit</button>
            <button className="edit">Start</button>
          </div>
        </div>
      </div>
    </div>
  )
}
