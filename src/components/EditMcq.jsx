import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { editQuestion, getQuestions, updateInfo } from '../slices/question.slice'
import Loading from './Loading'


export default function EditMcq() {

  let dispatch = useDispatch()
  let { queForEdit } = useSelector(state => state.questionSlice)

  let fileInputRef = useRef()
  let [question, setQuestion] = useState(queForEdit.que)
  let [choice1, setChoice1] = useState(queForEdit.choice1)
  let [choice2, setChoice2] = useState(queForEdit.choice2)
  let [choice3, setChoice3] = useState(queForEdit.choice3)
  let [choice4, setChoice4] = useState(queForEdit.choice4)
  let [correctAns, setCorrectAns] = useState(queForEdit.correctAns)
  let [src, setSrc] = useState('')

  let editQuestionFunc = async() => {
    let formData = new FormData();
    formData.append('que', question)
    formData.append('correctAns', correctAns)
    formData.append('choice1', choice1)
    formData.append('choice2', choice2)
    formData.append('choice3', choice3)
    formData.append('choice4', choice4)
    if (src !== '') formData.append('image', fileInputRef.current.files[0])
      
    await dispatch(editQuestion({ data: formData, queId: queForEdit._id }))
    await dispatch(getQuestions(queForEdit.quizId))
    await dispatch(updateInfo({ addQue: false, editQue: false, type: 'mcq', queForEdit: null }))
  }


  useEffect(() => {
    setQuestion(queForEdit.que)
    setChoice1(queForEdit.choice1)
    setChoice2(queForEdit.choice2)
    setChoice3(queForEdit.choice3)
    setChoice4(queForEdit.choice4)
    setCorrectAns(queForEdit.correctAns)
    // eslint-disable-next-line
  }, [])

  return (question !== queForEdit.que || choice1 !== queForEdit.choice1 || choice2 !== queForEdit.choice2 ||
    choice3 !== queForEdit.choice3 || choice4 !== queForEdit.choice4 || correctAns !== queForEdit.correctAns) ?
    <div className="queDiv"><Loading /></div>
    :
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
            <p className="A">A</p>
            <input value={choice1} type="text" className="option" placeholder="Choice 1" onChange={(e) => setChoice1(e.target.value)} />
            <div onClick={() => setCorrectAns(choice1)} className="blank">
              {(correctAns !== '' && correctAns === choice1) && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
          <div className="choiceDiv">
            <p className="A">B</p>
            <input value={choice2} type="text" className="option" placeholder="Choice 2" onChange={(e) => setChoice2(e.target.value)} />
            <div onClick={() => setCorrectAns(choice2)} className="blank">
              {(correctAns !== '' && correctAns === choice2) && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
        </div>
        <div className="choiceDivOut">
          <div className="choiceDiv">
            <p className="A">C</p>
            <input value={choice3} type="text" className="option" placeholder="Choice 3" onChange={(e) => setChoice3(e.target.value)} />
            <div onClick={() => setCorrectAns(choice3)} className="blank">
              {(correctAns !== '' && correctAns === choice3) && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
          <div className="choiceDiv">
            <p className="A">D</p>
            <input value={choice4} type="text" className="option" placeholder="Choice 4" onChange={(e) => setChoice4(e.target.value)} />
            <div onClick={() => setCorrectAns(choice4)} className="blank">
              {(correctAns !== '' && correctAns === choice4) && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => editQuestionFunc()} className="addQuebtn">Edit Question</button>
    </div>
}
