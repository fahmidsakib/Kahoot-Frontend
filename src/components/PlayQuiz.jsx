import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Waiting from './Waiting';
import { updateStudentsArr, updateTwait } from '../slices/play.slice'
import { saveReport } from '../slices/quiz.slice';


export default function PlayQuiz() {

  let dispatch = useDispatch()
  let goto = useNavigate()
  let { roomId } = useParams()
  let { tWait, quizId, socket, socketId, studentsArr } = useSelector(state => state.playSlice)
  let { allQuestions } = useSelector(state => state.questionSlice)
  let [question, setQuestion] = useState(null)
  let [time, setTime] = useState(0)
  let [timerOn, setTimerOn] = useState(false)
  let [totalQue, setTotalQue] = useState(allQuestions.length - 1)
  let [showRes, setShowRes] = useState(false)
  const Ref = useRef(null);


  let createRoom = () => {
    let obj = { quizId, socketId, roomId, questions: allQuestions }
    socket.emit('createRoom', obj)
    dispatch(updateTwait(true))
  }


  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return { total, seconds };
  }

  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total > 0) setTime(seconds > 9 ? seconds : '0' + seconds)
    else { setTime('00'); setTimerOn(false) }
  }

  const clearTimer = (e) => {
    setTime(30)
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e)
    }, 1000)
    Ref.current = id
  }

  const getDeadTime = () => {
    let deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 10)
    return deadline
  }

  let nextQue = () => {
    setTotalQue(prev => prev - 1)
    socket.emit('nextQue', roomId)
  }

  let calculateScore = () => {
    let copyStudentsArr = JSON.parse(JSON.stringify(studentsArr))
    copyStudentsArr = copyStudentsArr.sort((a, b) => b.score - a.score)
    dispatch(updateStudentsArr(copyStudentsArr))
    setShowRes(true)
    setQuestion(null)
    let obj = {quizId, result: copyStudentsArr, totalQue: allQuestions.length}
    dispatch(saveReport(obj))
    socket.emit('showRes', roomId)
  }

  if (socket) {
    socket.on('updateQue', (data) => {
      //data should contain {questions}
      clearTimer(getDeadTime());
      setTimerOn(true)
      setQuestion(data)
      dispatch(updateTwait(false))
    })

    socket.on('updateStudentsArr', (data) => {
      console.log('students array updated')
      dispatch(updateStudentsArr(data))
    })
  }

  useEffect(() => {
    if (socket === null) goto('/quiz/connect/t')
    else createRoom()
    // eslint-disable-next-line
  }, [])

  return (
    <div className="PlayQuiz">
      {tWait && <Waiting roomId={roomId} />}

      {question !== null &&
        (<div className="queDiv-play">
          <div className="header-play">
            <Link to="/home" className="link"><p className="logo">K A H O O T!</p></Link>
            <div className="timer">
              {timerOn ? <p className="timer-text">{time}s</p> :
                (totalQue > 0 ?
                  <button onClick={() => nextQue()} className="add-next">Next</button> :
                  <button onClick={() => calculateScore()} className="add-next">Finish</button>)}
            </div>
          </div>
          <p className="queText">Question: {question.que}</p>
          <div className="addImg">
            {question.imageUrl !== '' && <img src={question.imageUrl} className="showImg" alt="" />}
          </div>
          {question.type === 'mcq' ?
            <div className="choices">
              <div className="choiceDivOut">
                <div className="choiceDiv">
                  <p className="A">A</p>
                  <input value={question.choice1} type="text" className="option" readOnly />
                  <div className="blank">
                    {(question.correctAns !== '' && question.correctAns === question.choice1) && <img src="/images/tick.png" alt="" className="correct" />}
                  </div>
                </div>
                <div className="choiceDiv">
                  <p className="A">B</p>
                  <input value={question.choice2} type="text" className="option" readOnly />
                  <div className="blank">
                    {(question.correctAns !== '' && question.correctAns === question.choice2) && <img src="/images/tick.png" alt="" className="correct" />}
                  </div>
                </div>
              </div>
              <div className="choiceDivOut">
                <div className="choiceDiv">
                  <p className="A">C</p>
                  <input value={question.choice3} type="text" className="option" readOnly />
                  <div className="blank">
                    {(question.correctAns !== '' && question.correctAns === question.choice3) && <img src="/images/tick.png" alt="" className="correct" />}
                  </div>
                </div>
                <div className="choiceDiv">
                  <p className="A">D</p>
                  <input value={question.choice4} type="text" className="option" readOnly />
                  <div className="blank">
                    {(question.correctAns !== '' && question.correctAns === question.choice4) && <img src="/images/tick.png" alt="" className="correct" />}
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="choices">
              <div className="choiceDivOut">
                <div className="choiceDiv">
                  <img src="/images/true.png" alt="" className="true" />
                  <input type="text" className="option" value='True' readOnly />
                  <div className="blank">
                    {(question.correctAns !== '' && question.correctAns === 'True') && <img src="/images/tick.png" alt="" className="correct" />}
                  </div>
                </div>
                <div className="choiceDiv">
                  <img src="/images/false.png" alt="" className="true" />
                  <input type="text" className="option" value='False' readOnly />
                  <div className="blank">
                    {(question.correctAns !== '' && question.correctAns === 'False') && <img src="/images/tick.png" alt="" className="correct" />}
                  </div>
                </div>
              </div>
            </div>
          }
        </div>)}

      {showRes && <div className="queDiv-play">
        <div className="header-play">
          <Link to="/home" className="link"><p className="logo">K A H O O T!</p></Link>
          <div className="timer">
            <button onClick={() => goto('/home')} className="add-next">Back</button>
          </div>
        </div>
        <p className="queText">Congratulation!</p>
        <div className="sp-container">
          <div className="players">
            {studentsArr.length > 0 &&
              studentsArr.map((student, index) =>
                <div className="std-card">
                  <p className="name">{index + 1}</p>
                  <p className="name">{student.name}</p>
                  <p className="name">{student.score}/{allQuestions.length}</p>
                </div>)
            }
          </div>
        </div>
      </div>}

    </div>
  )
}
