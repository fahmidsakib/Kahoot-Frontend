import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getQuizzes } from '../slices/quiz.slice'
import { updateAuthenticated } from '../slices/user.slice'
import QuizCard from './QuizCard'



export default function Home() {

  let goto = useNavigate()
  let dispatch = useDispatch()
  let { quizError, quizAlert, allQuizzes } = useSelector(state => state.quizSlice)

  let signoutFunc = () => {
    localStorage.removeItem('accessToken-kahoot')
    localStorage.removeItem('refreshToken-kahoot')
    localStorage.removeItem('userInfo-kahoot')
    dispatch(updateAuthenticated(false))
    goto('/')
  }

  useEffect(() => {
    dispatch(getQuizzes())
    // eslint-disable-next-line
  }, [])

  return (
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
            <Link to='/create-quiz' className="createBtn"><p className="title">Create Template</p></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
