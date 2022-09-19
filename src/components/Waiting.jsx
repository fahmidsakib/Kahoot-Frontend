import React from 'react'
import { QRCodeCanvas } from "qrcode.react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateStudentsArr } from '../slices/play.slice';
import { useDispatch } from 'react-redux';
const BASE_URL = 'https://kahoot-fs.vercel.app'

export default function Waiting({ roomId }) {

  let dispatch = useDispatch()
  let { studentsArr, socket } = useSelector(state => state.playSlice)

  let kickOut = (id) => {
    let obj = {roomId, id}
    socket.emit('kick', obj)
  }

  socket.on('newStudentJoin', (studentsArr) => {
    dispatch(updateStudentsArr(studentsArr))
  })

  let startPlaying = () => {
    socket.emit('nextQue', roomId)
  }


  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={`${BASE_URL}/quiz/play/s/${roomId}`}
      size={300}
      bgColor={"#ffffff"}
      level={"L"}
    />
  );

  return (
    <div className="Waiting">
      <div className="w-container">
        <Link to="/home" className="link-r"><p className="logo">K A H O O T!</p></Link>
        <div className="w-main">
          <div className="players">
            {studentsArr.length === 0 && <p className="wait-text">Waiting For Players...</p>}
            {studentsArr.length > 0 &&
              studentsArr.map(student =>
                <div key={student.socketId} className="std-card">
                  <img src="/images/avatar.png" alt="" className="avatar" />
                  <p className="name">{student.name}</p>
                  <button onClick={() => kickOut(student.socketId)} className="kick">X</button>
                </div>)
            }
          </div>
          <div className="roomInfo">
            <div>{qrcode}</div>
            <p className="pin">Game PIN: {roomId}</p>
            {studentsArr.length > 0 && <button onClick={() => startPlaying()} className="add">Start</button>}
          </div>
        </div>
      </div>
    </div>
  )
}
