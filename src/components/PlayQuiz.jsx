import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Waiting from './Waiting';
import Loading from './Loading';
import { getQuestions } from '../slices/question.slice';
import { io } from 'socket.io-client'
import { updateNewQuizRoomInfo, updateQuizId, updateTwait, updateSocketInfo, updateStudentsArr } from '../slices/play.slice'


export default function PlayQuiz() {

  let dispatch = useDispatch()
  let goto = useNavigate()
  let { roomId } = useParams()
  let { tWait, quizId, socket, socketId } = useSelector(state => state.playSlice)
  let { allQuestions } = useSelector(state => state.questionSlice)


  let createRoom = () => {

    // const skt = io.connect('http://localhost:8000')
    // skt.on('connect', () => {
    //   // console.log(skt, 'creating')
    //   dispatch(updateSocketInfo(skt))
    // })

    console.log(socket, 'socket', socketId)
    console.log(allQuestions, 'inside func')
    // setTimeout(() => {
    let obj = { quizId, socketId, roomId, questions: allQuestions }
    console.log(obj, 'objj')
    socket.emit('createRoom', obj)
    dispatch(updateTwait(true))

    // }, 1000);
  }


  useEffect(() => {
    // if(!socket) goto('/quiz/connect')
    // // setTimeout(() => {
    // let tempQuizId = localStorage.getItem('quizId-kahoot')
    // // console.log(tempQuizId, 'aaaa')
    // dispatch(updateQuizId(tempQuizId))
    // if (quizId === null) dispatch(getQuestions(tempQuizId))
    // else dispatch(getQuestions(quizId))
    // dispatch(updateNewQuizRoomInfo({ roomId, tWait: true }))
    createRoom()
    // }, 1000);

    // eslint-disable-next-line
  }, [])

  return (
    <div className="PlayQuiz">
      {tWait && <Waiting roomId={roomId} />}
    </div>
  )
}
