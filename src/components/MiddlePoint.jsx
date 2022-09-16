import React, { useEffect } from 'react'
import Loading from './Loading';
import { getQuestions } from '../slices/question.slice';
import { io } from 'socket.io-client'
import { updateQuizId, updateRoomId, updateSocketInfo } from '../slices/play.slice'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function MiddlePoint() {

  let dispatch = useDispatch()
  let { quizRoomId, quizId, socket } = useSelector(state => state.playSlice)
  let { allQuestions } = useSelector(state => state.questionSlice)


  useEffect(() => {
    const skt = io.connect('http://localhost:8000')
    skt.on('connect', () => { dispatch(updateSocketInfo(skt)) })
    let tempQuizId = localStorage.getItem('quizId-kahoot')
    dispatch(updateQuizId(tempQuizId))
    if (quizId === null) dispatch(getQuestions(tempQuizId))
    else dispatch(getQuestions(quizId))
    if (quizRoomId === null) {
      let roomId = Math.floor(100000 + Math.random() * 900000)
      dispatch(updateRoomId(roomId))
    }
    // eslint-disable-next-line
  }, [])

  return (socket === null || allQuestions.length === 0 || quizRoomId === null) ?
    <div className="MiddlePoint"><Loading /></div> :
    <Navigate to={`/quiz/play/t/${quizRoomId}`} replace={true} />
}
