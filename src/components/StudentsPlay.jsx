import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { updateRoomId, updateSwait } from '../slices/play.slice'
import Loading from './Loading'


export default function StudentsPlay() {

  let goto = useNavigate()
  let dispatch = useDispatch()
  let [open, setOpen] = useState(true)
  let [name, setName] = useState('')
  let { roomId } = useParams()
  let { sWait, quizRoomId, stuSocket } = useSelector(state => state.playSlice)
  let [question, setQuestion] = useState(null)
  let [time, setTime] = useState(0)
  let [submitted, setSubmitted] = useState(false)
  let [timerOn, setTimerOn] = useState(false)
  let [selectedOption, setSelectedOption] = useState('')
  let [selectedAns, setSelectedAns] = useState('')
  let [correctAns, setCorrectAns] = useState('')
  let [answerArr, setAnswerArr] = useState([])
  let [showRes, setShowRes] = useState(false)
  const Ref = useRef(null);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return { total, seconds };
  }

  const startTimer = (e) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total > 0) setTime(seconds > 9 ? seconds : '0' + seconds)
    else {
      setTime('00')
      setTimerOn(false)
      // if (selectedAns === '' && selectedOption === '') submitAnswer('', '')
    }
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

  let startPlaying = () => {
    let obj = { name, roomId, socketId: stuSocket.id }
    stuSocket.emit('addNewStudent', obj)
    dispatch(updateSwait(true))
  }

  let submitAnswer = (ans, option) => {
    if (!submitted) {
      let obj = { roomId, ans, socketId: stuSocket.id }
      stuSocket.emit('submitAns', obj)
      setSelectedAns(ans)
      setSelectedOption(option)
      setSubmitted(true)
    }
  }

  if (stuSocket) {
    stuSocket.on('updateQue', (data) => {
      setSelectedAns('')
      setSelectedOption('')
      setSubmitted(false)
      clearTimer(getDeadTime());
      setQuestion(data)
      setTimerOn(true)
      dispatch(updateSwait(false))
    })

    stuSocket.on('removed', () => {
      console.log('removed');
      goto('/quiz/join')
    })

    stuSocket.on('getAnswer', (data) => {
      console.log(data, 'correctAns')
      setCorrectAns(data)
      let copyAnswerArr = JSON.parse(JSON.stringify(answerArr))
      copyAnswerArr.push(data === selectedAns)
      setAnswerArr(copyAnswerArr)
    })

    stuSocket.on('showRes', () => {
      setQuestion(null)
      setCorrectAns('')
      setSelectedOption('')
      setShowRes(true)
    })
  }


  useEffect(() => {
    dispatch(updateRoomId(roomId))
    dispatch(updateSwait(true))
    setQuestion(null)
    setTimerOn(false)
    // eslint-disable-next-line
  }, [])


  return stuSocket === null ?
    (quizRoomId === null ?
      <div className="MiddlePoint"><Loading /></div> :
      <Navigate to={`/quiz/connect/s`} replace={true} />
    ) :
    <div className="StudentsPlay">

      {sWait && <div className="sp-container">
        <Link to="/quiz/join" className="link-sp"><p className="logo">K A H O O T!</p></Link>
        <p className="wait-text">Waiting For Others to Join...</p>
      </div>}

      {showRes && <div className="sp-container">
        <Link to="/quiz/join" className="link-sp"><p className="logo">K A H O O T!</p></Link>
        <div className="players">
          {answerArr.length > 0 &&
            answerArr.map((answer, index) =>
              <div className="std-card">
                <p className="name">Question{index + 1}</p>
                {answer ? <img src="/images/true.png" alt="" className="trueS" /> : <img src="/images/false.png" alt="" className="trueS" />}
              </div>)
          }
        </div>
      </div>}

      {(selectedOption !== '' && timerOn) &&
        <div className="queDiv-play">
          <div className="header-play">
            <Link to="/quiz/join" className="link"><p className="logo">K A H O O T!</p></Link>
            <div className="timer">
              <p className="timer-text">{time}s</p>
            </div>
          </div>
          <p className="queText">Question: {question.que}</p>
          <div className="sp-container">
            <p className="wait-text">Waiting For Others to answer...</p>
            <p className="As">{selectedOption}</p>
            <p className="footer">Your Choice is on the podium!</p>
          </div>
        </div>
      }

      {(correctAns !== '' && !timerOn) &&
        <div className="queDiv-play">
          <div className="header-play">
            <Link to="/quiz/join" className="link"><p className="logo">K A H O O T!</p></Link>
            <div className="timer">
              <p className="timer-text">{time}s</p>
            </div>
          </div>
          <p className="queText">Question: {question.que}</p>
          <div className="sp-container">
            {selectedAns === correctAns ? <p className="wait-text">Correct!</p> : <p className="wait-text">Incorrect!</p>}
            {selectedAns === correctAns ? <img src="/images/true.png" alt="" className="trueS" /> : <img src="/images/false.png" alt="" className="trueS" />}
            <p className="footer">Your Choice is on the podium!</p>
          </div>
        </div>
      }


      {(timerOn && question !== null && selectedAns === '') &&
        (<div className="queDiv-play">
          <div className="header-play">
            <Link to="/quiz/join" className="link"><p className="logo">K A H O O T!</p></Link>
            <div className="timer">
              <p className="timer-text">{time}s</p>
            </div>
          </div>
          <p className="queText">Question: {question.que}</p>
          <div className="addImg">
            {question.imageUrl !== '' && <img src={question.imageUrl} className="showImg" alt="" />}
          </div>
          {question.type === 'mcq' ?
            <div className="choices">
              <div className="choiceDivOut">
                <div onClick={() => submitAnswer(question.choice1, 'A')} className="choiceDivS">
                  <p className="A">A</p>
                  <input value={question.choice1} type="text" className="option" readOnly />
                  {/* <div className="blank">
                  {(selectedAns === 'A') && <img src="/images/tick.png" alt="" className="correct" />}
                </div> */}
                </div>
                <div onClick={() => submitAnswer(question.choice2, 'B')} className="choiceDivS">
                  <p className="A">B</p>
                  <input value={question.choice2} type="text" className="option" readOnly />
                  {/* <div className="blank">
                  {(selectedAns === 'B') && <img src="/images/tick.png" alt="" className="correct" />}
                </div> */}
                </div>
              </div>
              <div className="choiceDivOut">
                <div onClick={() => submitAnswer(question.choice3, 'C')} className="choiceDivS">
                  <p className="A">C</p>
                  <input value={question.choice3} type="text" className="option" readOnly />
                  {/* <div className="blank">
                  {(selectedAns === 'C') && <img src="/images/tick.png" alt="" className="correct" />}
                </div> */}
                </div>
                <div onClick={() => submitAnswer(question.choice4, 'D')} className="choiceDivS">
                  <p className="A">D</p>
                  <input value={question.choice4} type="text" className="option" readOnly />
                  {/* <div className="blank">
                  {(selectedAns === 'D') && <img src="/images/tick.png" alt="" className="correct" />}
                </div> */}
                </div>
              </div>
            </div>
            :
            <div className="choices">
              <div className="choiceDivOut">
              <div onClick={() => submitAnswer('True', 'A')} className="choiceDivS">
                  <img src="/images/true.png" alt="" className="true" />
                  <input type="text" className="option" value='True' readOnly />
                  {/* <div className="blank">
                    {(question.correctAns !== '' && question.correctAns === 'True') && <img src="/images/tick.png" alt="" className="correct" />}
                  </div> */}
                </div>
              <div onClick={() => submitAnswer('False', 'B')} className="choiceDivS">
                  <img src="/images/false.png" alt="" className="true" />
                  <input type="text" className="option" value='False' readOnly />
                  {/* <div className="blank">
                    {(question.correctAns !== '' && question.correctAns === 'False') && <img src="/images/tick.png" alt="" className="correct" />}
                  </div> */}
                </div>
              </div>
            </div>
          }
        </div>)
      }

      {open && <div className="popup">
        <div className="innerPopup">
          <div className="inputDiv">
            <label>Name</label>
            <input className="input-text" type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <button onClick={() => { startPlaying(); setOpen(false) }} className="createQuiz">Start Playing</button>
        </div>
      </div>}
    </div>
}
