import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getQuizzes, getReports } from '../slices/quiz.slice'
import { updateAuthenticated } from '../slices/user.slice'
import QuizCard from './QuizCard'
import { createQuiz } from '../slices/quiz.slice'
import ReportCard from './ReportCard'


export default function Home() {

  let goto = useNavigate()
  let dispatch = useDispatch()
  let [popup, setPopup] = useState(false)
  let [title, setTitle] = useState('')
  let [topic, setTopic] = useState('')
  let [tempSelect, setTempSelect] = useState(true)
  let { quizError, quizAlert, allQuizzes, currQuizId, allReports } = useSelector(state => state.quizSlice)
  let { user, authenticated } = useSelector(state => state.userSlice)

  let signoutFunc = () => {
    localStorage.removeItem('accessToken-kahoot')
    localStorage.removeItem('refreshToken-kahoot')
    localStorage.removeItem('userInfo-kahoot')
    dispatch(updateAuthenticated(false))
    goto('/')
  }

  useEffect(() => {
    dispatch(getQuizzes())
    dispatch(getReports())
    // eslint-disable-next-line
  }, [])

  return !authenticated ? <Navigate to={`/`} replace={true} /> :
    (currQuizId !== null ?
      <Navigate to={`/quiz/${currQuizId}`} replace={true} />
      :
      <div className="Home">
        <div className="header">
          <Link to="/home" className="link"><p className="logo">K A H O O T!</p></Link>
          <div className="buttonDiv">
            <button style={{ backgroundColor: tempSelect ? 'white' : '#d9d9d9'}} onClick={() => setTempSelect(true)} className="templates-btn">Templates</button>
            <button style={{ backgroundColor: !tempSelect ? 'white' : '#d9d9d9' }} onClick={() => setTempSelect(false)} className="templates-btn">Reports</button>
          </div>
          <button onClick={() => signoutFunc()} className="signout">Signout</button>
        </div>

        {tempSelect ? <div className="main">
          <h1 className="templates">Templates</h1>
          <div className="quizDiv">
            {allQuizzes.map(quiz => (
              quiz.teacherId._id === user._id && <QuizCard key={quiz._id} quiz={quiz} />
            ))}
            <div className="create">
              <img src="../images/quiz.png" alt="" className="quiz" />
              <button className="createBtn" onClick={() => setPopup(true)}><p className="title">Create Template</p></button>
            </div>
          </div>
        </div> :
          <div className="main">
            <h1 className="templates">Reports</h1>
            <div className="quizDiv">
              {allReports.map(report => (<Link to={`/show-report/${report._id}`} className="link"><ReportCard key={report._id} report={report} /></Link>))}
            </div>
          </div>
        }

        {popup && <div className="popup">
          <div className="innerPopup">
            <div className="inputDiv">
              <label>Title</label>
              <input className="input-text" type="text" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="inputDiv">
              <label>Topic</label>
              <input className="input-text" onChange={(e) => setTopic(e.target.value)} />
            </div>
            <button onClick={() => { dispatch(createQuiz({ title, topic })); setPopup(false) }} className="createQuiz">Create Quiz Template</button>
            <button className="kick1" onClick={() => setPopup(false)}>X</button>
          </div>
        </div>}

      </div>)
}
