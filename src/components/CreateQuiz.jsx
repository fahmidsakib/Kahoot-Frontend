import { SetMealOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createQuiz } from '../slices/quiz.slice'

export default function CreateQuiz() {

  let [popup, setPopup] = useState(false)
  let [title, setTitle] = useState('')
  let [topic, setTopic] = useState('')
  let dispatch = useDispatch()

  useEffect(() => {
    setPopup(true)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="CreateQuiz">

      <div className="header">
        <p className="logo">K A H O O T!</p>
        <div className="buttonDib">
          <button className="templates">Templates</button>
          <button className="reports">Reports</button>
        </div>
        <button className="signout">Save</button>
      </div>


      <div className="container">
        <div className="sidebar">
          
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
  )
}
