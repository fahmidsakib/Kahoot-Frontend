import React, { useState } from 'react'

export default function AddTf({ quizId }) {

  let [que, setQue] = useState('')
  let [correctAns, setCorrectAns] = useState('')

  return (
    <div className="queDiv">
      <input type="text" className="quesion" placeholder="Type your question here" onChange={(e) => setQue(e.target.value)} />
      <div className="addImg">
        <input type="file" className="queImg" />
      </div>
      <div className="choices">
        <div className="choiceDivOut">
          <div className="choiceDiv">
            <p className="A">A</p>
            <input type="text" className="option" value='True' readOnly />
            <div onClick={() => setCorrectAns('True')} className="blank">
              {(correctAns !== '' && correctAns === 'True') && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
          <div className="choiceDiv">
            <p className="A">B</p>
            <input type="text" className="option" value='False' readOnly />
            <div onClick={() => setCorrectAns('False')} className="blank">
              {(correctAns !== '' && correctAns === 'False') && <img src="../images/tick.png" alt="" className="correct" />}
            </div>
          </div>
        </div>

      </div>
      <button className="addQuebtn">Add Question</button>
    </div>
  )
}
