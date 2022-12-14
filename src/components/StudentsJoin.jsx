import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { updateRoomId } from '../slices/play.slice'

export default function StudentsJoin() {

  let [roomId, setRoomId] = useState('')
  let goto = useNavigate()
  let dispatch = useDispatch()

  let startPlaying = () => {
    let socket = io.connect('https://kahoot-hxym.onrender.com')
    socket.on('connect', () => {
      let obj = { roomId, socketId: socket.id }
      socket.emit('joinRoom', obj)
    })
    socket.on('joiningConfirm', () => {
      dispatch(updateRoomId(roomId))
      goto(`/quiz/play/s/${roomId}`)
    })
    socket.on('joiningRejected', () => setRoomId(''))
  }

  return (
    <div className="StudentsJoin">
      <div className="popup">
        <div className="innerPopup">
          <div className="inputDiv">
            <label>Room ID</label>
            <input className="input-text" type="text" onChange={(e) => setRoomId(e.target.value)} />
          </div>
          <button onClick={() => startPlaying()} className="createQuiz">Enter to the room</button>
        </div>
      </div>
    </div>
  )
}
