import React, { useState } from 'react'

export default function EditMcq({ que }) {

  let [question, setQuestion] = useState(que.que)
  let [choice1, setChoice1] = useState(que.choice1)
  let [choice2, setChoice2] = useState(que.choice2)
  let [choice3, setChoice3] = useState(que.choice3)
  let [choice4, setChoice4] = useState(que.choice4)
  let [correctAns, setCorrectAns] = useState(que.correctAns)

  return (
    <div className="queDiv">
      <input value={question} type="text" className="quesion" placeholder="Type your question here" onChange={(e) => setQuestion(e.target.value)} />
      <div className="addImg">
        <input type="file" className="queImg" />
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
      <button className="addQuebtn">Edit Question</button>
    </div>
  )
}
