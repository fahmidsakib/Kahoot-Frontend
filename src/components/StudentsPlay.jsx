import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { updateSwait } from '../slices/play.slice'

export default function StudentsPlay() {
  
  let [open, setOpen] = useState(true)
  let [name, setName] = useState('')
  let { roomId } = useParams()
  let goto = useNavigate()
  let dispatch = useDispatch()
  let { sWait, quizId } = useSelector(state => state.playSlice)


  let startPlaying = () => {
    const socket = io.connect('http://localhost:8000')
    socket.on('connect', () => {
      console.log(`${name} conected`)
    })
    let obj = {name, roomId, socketId: socket.id}
    socket.emit('addNewStudent', obj)
    dispatch(updateSwait(true))

    socket.on('removed', () => { console.log('removed'); goto('/quiz/join') })
  }



  return (
    <div className="StudentsPlay">

      {sWait && <div className="sp-container">
        <Link to="/quiz/join" className="link-sp"><p className="logo">K A H O O T!</p></Link>
        <p className="wait-text">Waiting For Others to Join...</p>
      </div> }

      {open && <div className="popup">
        <div className="innerPopup">
          <div className="inputDiv">
            <label>Name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <button onClick={() => { startPlaying(); setOpen(false) }} className="createQuiz">Start Playing</button>
        </div>
      </div>}
    </div>
  )
}
