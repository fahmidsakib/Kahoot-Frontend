import React, { useEffect } from 'react'
import Loading from './Loading';
import { getQuestions } from '../slices/question.slice';
import { io } from 'socket.io-client'
import { updateStuSocketInfo } from '../slices/play.slice'
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function MiddlePointS() {

  let dispatch = useDispatch()
  let { stuSocket, quizRoomId } = useSelector(state => state.playSlice)


  useEffect(() => {
    const skt = io.connect('https://kahoot-hxym.onrender.com')
    skt.on('connect', () => { dispatch(updateStuSocketInfo(skt)) })
    // eslint-disable-next-line
  }, [])

  return (stuSocket === null) ?
    <div className="MiddlePoint"><Loading /></div> :
    <Navigate to={`/quiz/play/s/${quizRoomId}`} replace={true} />
}
