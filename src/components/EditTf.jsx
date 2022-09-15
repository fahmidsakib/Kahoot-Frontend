import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { editQuestion, getQuestions, updateInfo } from '../slices/question.slice'


export default function EditTf() {

  let dispatch = useDispatch()
  let { queForEdit } = useSelector(state => state.questionSlice)
  console.log( queForEdit)

  let fileInputRef = useRef()
  let [question, setQuestion] = useState('')
  let [correctAns, setCorrectAns] = useState('')
  let [src, setSrc] = useState('')

  let editQuestionFunc = async() => {
    let formData = new FormData();
    formData.append('que', question)
    formData.append('correctAns', correctAns)
    if (src !== '') formData.append('image', fileInputRef.current.files[0])

    await dispatch(editQuestion({ data: formData, queId: queForEdit._id }))
    await dispatch(getQuestions(queForEdit.quizId))
    await dispatch(updateInfo({ addQue: false, editQue: false, type: 'mcq', queForEdit: null }))
  }


  useEffect(() => {
    setQuestion(queForEdit.que)
    setCorrectAns(queForEdit.correctAns)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="queDiv">
      <input value={question} type="text" className="quesion" placeholder="Type your question here" onChange={(e) => setQuestion(e.target.value)} />
      <div className="addImg">
        {src !== '' && <img src={src} className="showImg" alt="" />}
        {(src === '' && queForEdit.imageUrl !== '') && <img src={queForEdit.imageUrl} className="showImg" alt="" />}
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
      <button onClick={() => editQuestionFunc()} className="addQuebtn">Edit Question</button>
    </div>
  )
}
