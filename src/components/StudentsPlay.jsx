import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'

export default function StudentsPlay() {
  
  let socket
  let [open, setOpen] = useState(true)
  let [name, setName] = useState('')
  let {roomId} = useParams()


  let startPlaying = () => {
    socket = io.connect('http://localhost:8000')
    socket.on('connect', () => {
      console.log(`${name} conected`)
    })
    let obj = {name, roomId, socketId: socket.id}
    socket.emit('joinRoom', obj)
  }



  return (
    <div className="StudentsPlay">

      

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
