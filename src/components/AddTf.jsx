import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addQuestion, getQuestions, updateInfo } from '../slices/question.slice'

export default function AddTf({ quizId }) {

  let fileInputRef = useRef()
  let [que, setQue] = useState('')
  let [correctAns, setCorrectAns] = useState('')
  let [src, setSrc] = useState('')

  let dispatch = useDispatch()

  let addQuestionFunc = async () => {
    let formData = new FormData();
    formData.append('que', que)
    formData.append('type', 'tf')
    formData.append('correctAns', correctAns)
    formData.append('quizId', quizId)
    formData.append('image', fileInputRef.current.files[0])

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
        <label htmlFor="file-1"><img src="../images/addImage.png" alt="" className="img-add" /></label>
      </div>
      <div className="choices">
        <div className="choiceDivOut">
          <div className="choiceDiv">
            <img src="../images/true.png" alt="" className="true" />
            <input type="text" className="option" value='True' readOnly />
            <div onClick={() => setCorrectAns('True')} className="blank">
              {(correctAns !== '' && correctAns === 'True') && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
          <div className="choiceDiv">
            <img src="../images/false.png" alt="" className="true" />
            <input type="text" className="option" value='False' readOnly />
            <div onClick={() => setCorrectAns('False')} className="blank">
              {(correctAns !== '' && correctAns === 'False') && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => addQuestionFunc()} className="addQuebtn">Add Question</button>
    </div>
  )
}
