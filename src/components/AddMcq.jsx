import React, { useState } from 'react'

export default function AddMcq() {

  let [que, setQue] = useState('')
  let [choice1, setChoice1] = useState('')
  let [choice2, setChoice2] = useState('')
  let [choice3, setChoice3] = useState('')
  let [choice4, setChoice4] = useState('')
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
      <button className="addQuebtn">Add Question</button>
    </div>
  )
}
