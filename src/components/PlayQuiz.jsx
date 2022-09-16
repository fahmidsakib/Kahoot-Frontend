import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Waiting from './Waiting';
import {  updateTwait } from '../slices/play.slice'


export default function PlayQuiz() {

  let dispatch = useDispatch()
  let goto = useNavigate()
  let { roomId } = useParams()
  let { tWait, quizId, socket, socketId } = useSelector(state => state.playSlice)
  let { allQuestions } = useSelector(state => state.questionSlice)


  let createRoom = () => {
    let obj = { quizId, socketId, roomId, questions: allQuestions }
    socket.emit('createRoom', obj)
    dispatch(updateTwait(true))
  }

  useEffect(() => {
    if(socket === null) goto('/quiz/connect')
    else createRoom()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="PlayQuiz">
      {tWait && <Waiting roomId={roomId} />}
    </div>
  )
}
