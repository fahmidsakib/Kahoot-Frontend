import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCurrQuizId } from '../slices/quiz.slice'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddMcq from './AddMcq';
import AddTf from './AddTf';
import EditMcq from './EditMcq';
import EditTf from './EditTf';
import { getQuestions } from '../slices/question.slice';

export default function Quiz() {

  let [addQue, setAddQue] = useState(false)
  let [editQue, setEditQue] = useState(false)
  let [type, setType] = useState('mcq')
  let [queForEdit, setQueForEdit] = useState(null)
  let dispatch = useDispatch()
  let { quizId } = useParams()
  let { allQuestions } = useSelector(state => state.questionSlice)


  useEffect(() => {
    dispatch(updateCurrQuizId())
    dispatch(getQuestions(quizId))
    // eslint-disable-next-line
  }, [])

  return (
    <div className="Quiz">

      <div className="header">
        <p className="logo">K A H O O T!</p>
        <div className="buttonDib">
          <button className="templates">Templates</button>
          <button className="reports">Reports</button>
        </div>
        <button className="signout">Save</button>
      </div>


      <div className="container">
        <div className="sidebar">

          <div className="addQue">
            <TextField
              id="outlined-select-currency"
              select
              name="type"
              label="Select Type"
              required
              fullWidth
              disabled={editQue}
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ color: 'rgb(198, 0, 23)' }}
            >
              <MenuItem key={1} value='mcq'>Multiple Choice</MenuItem>
              <MenuItem key={2} value='tf'>True False</MenuItem>
            </TextField>
            <button
              onClick={() => {
                setAddQue(true);
                setEditQue(false);
              }} className="add">Add Question</button>
          </div>

          <p className="msg">*Drag and drop to reorder the questions</p>

          {allQuestions.length > 0 &&
            (allQuestions.map(el =>
              <div
                onClick={() => {
                  setQueForEdit(el);
                  setType(el.type);
                  setEditQue(true);
                  setAddQue(false);
                }} className="addQue">
                <img src={`../images/${el.type}.png`} alt="" className="type" />
                <button className="add">Delete</button>
              </div>))
          }
        </div>

        {(addQue && type === 'mcq') && <AddMcq quizId={quizId} />}
        {(addQue && type === 'tf') && <AddTf quizId={quizId} />}
        {(editQue && type === 'mcq') && <EditMcq que={queForEdit} />}
        {(editQue && type === 'tf') && <EditTf que={queForEdit} />}

        {(!addQue && !editQue) &&
          <div className="queDiv">
            <h1>Click on Add Question button to add a new Question</h1>
          </div>}
      </div>

    </div>
  )
}
