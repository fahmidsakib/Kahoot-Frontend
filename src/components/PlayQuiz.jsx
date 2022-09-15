import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Waiting from './Waiting';
import { getQuestions } from '../slices/question.slice';
import { io } from 'socket.io-client'
import { updateNewQuizRoomInfo } from '../slices/play.slice'


export default function PlayQuiz() {

  let socket
  let dispatch = useDispatch()
  let { quizId, roomId } = useParams()
  let { waiting } = useSelector(state => state.playSlice)
  let { allQuestions } = useSelector(state => state.questionSlice)


  let createRoom = () => {
    socket = io.connect('http://localhost:8000')
    socket.on('connect', () => {
      dispatch(updateNewQuizRoomInfo({ socket, roomId, quizId }))
    })
    let obj = { quizId, socketId: socket.id, roomId, questions: allQuestions }
    socket.emit('createRoom', obj)
  }


  useEffect(() => {
    dispatch(getQuestions(quizId))
    createRoom()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="PlayQuiz">
      {waiting && <Waiting socket={socket} roomId={roomId} />}
    </div>
  )
}
