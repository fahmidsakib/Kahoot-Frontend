import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getQuizzes } from '../slices/quiz.slice'
import { updateAuthenticated } from '../slices/user.slice'
import QuizCard from './QuizCard'
import { createQuiz } from '../slices/quiz.slice'



export default function Home() {

  let goto = useNavigate()
  let dispatch = useDispatch()
  let [popup, setPopup] = useState(false)
  let [title, setTitle] = useState('')
  let [topic, setTopic] = useState('')
  let { quizError, quizAlert, allQuizzes } = useSelector(state => state.quizSlice)
  let { currQuizId } = useSelector(state => state.quizSlice)

  let signoutFunc = () => {
    localStorage.removeItem('accessToken-kahoot')
    localStorage.removeItem('refreshToken-kahoot')
    localStorage.removeItem('userInfo-kahoot')
    dispatch(updateAuthenticated(false))
    goto('/')
  }

  useEffect(() => {
    dispatch(getQuizzes(null))
    // eslint-disable-next-line
  }, [])

  return currQuizId !== null ?
    <Navigate to={`/quiz/${currQuizId}`} replace={true} />
    :
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
        <h1 className="templates">Templates</h1>
        <div className="quizDiv">
          {allQuizzes.map(quiz => (
            <QuizCard key={quiz._id} quiz={quiz}/>
          ))}
          <div className="create">
            <img src="../images/quiz.png" alt="" className="quiz" />
            <button className="createBtn" onClick={() => setPopup(true)}><p className="title">Create Template</p></button>
          </div>
        </div>
      </div>

      {popup && <div className="popup">
        <div className="innerPopup">
          <div className="inputDiv">
            <label>Title</label>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="inputDiv">
            <label>Topic</label>
            <input type="text" onChange={(e) => setTopic(e.target.value)} />
          </div>
          <button onClick={() => { dispatch(createQuiz({ title, topic })); setPopup(false) }} className="createQuiz">Create Quiz Template</button>
        </div>
      </div>}

    </div>
}
