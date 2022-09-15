import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addQuestion, getQuestions, updateInfo } from '../slices/question.slice'

export default function AddMcq({ quizId }) {

  let fileInputRef = useRef()
  let [que, setQue] = useState('')
  let [choice1, setChoice1] = useState('')
  let [choice2, setChoice2] = useState('')
  let [choice3, setChoice3] = useState('')
  let [choice4, setChoice4] = useState('')
  let [correctAns, setCorrectAns] = useState('')
  let [src, setSrc] = useState('')

  let dispatch = useDispatch()

  let addQuestionFunc = async() => {
    let formData = new FormData();
    formData.append('que', que)
    formData.append('type', 'mcq')
    formData.append('correctAns', correctAns)
    formData.append('quizId', quizId)
    formData.append('image', fileInputRef.current.files[0])
    formData.append('choice1', choice1)
    formData.append('choice2', choice2)
    formData.append('choice3', choice3)
    formData.append('choice4', choice4)

    await dispatch(addQuestion(formData))
    await dispatch(getQuestions(quizId))
    await dispatch(updateInfo({ addQue: false, editQue: false, type: 'mcq', queForEdit: null }))
  }

  return (
    <div className="queDiv">
      <input type="text" className="quesion" placeholder="Type your question here" onChange={(e) => setQue(e.target.value)} />
      <div className="addImg">
        {src !== '' && <img src={src} className="showImg" alt="" />}
        <input ref={fileInputRef} type="file" onChange={(e) => setSrc(window.URL.createObjectURL(e.target.files[0]))} id="file-1" className="inputfile" />
        <label htmlFor="file-1"><img src="../images/addImage.png" alt="" className="img-add"/></label>
      </div>
      <div className="choices">
        <div className="choiceDivOut">
          <div className="choiceDiv">
            <p className="A">A</p>
            <input type="text" className="option" placeholder="Choice 1" onChange={(e) => setChoice1(e.target.value)} />
            <div onClick={() => setCorrectAns(choice1)} className="blank">
              {(correctAns !== '' && correctAns === choice1) && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
          <div className="choiceDiv">
            <p className="A">B</p>
            <input type="text" className="option" placeholder="Choice 2" onChange={(e) => setChoice2(e.target.value)} />
            <div onClick={() => setCorrectAns(choice2)} className="blank">
              {(correctAns !== '' && correctAns === choice2) && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
        </div>
        <div className="choiceDivOut">
          <div className="choiceDiv">
            <p className="A">C</p>
            <input type="text" className="option" placeholder="Choice 3" onChange={(e) => setChoice3(e.target.value)} />
            <div onClick={() => setCorrectAns(choice3)} className="blank">
              {(correctAns !== '' && correctAns === choice3) && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
          <div className="choiceDiv">
            <p className="A">D</p>
            <input type="text" className="option" placeholder="Choice 4" onChange={(e) => setChoice4(e.target.value)} />
            <div onClick={() => setCorrectAns(choice4)} className="blank">
              {(correctAns !== '' && correctAns === choice4) && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => addQuestionFunc()} className="addQuebtn">Add Question</button>
    </div>
  )
}
