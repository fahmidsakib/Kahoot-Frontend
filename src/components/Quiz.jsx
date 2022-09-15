import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCurrQuizId } from '../slices/quiz.slice'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import AddMcq from './AddMcq';
import AddTf from './AddTf';
import EditMcq from './EditMcq';
import EditTf from './EditTf';
import { getQuestions, updateInfo, deleteQuestion } from '../slices/question.slice';

export default function Quiz() {

  let dispatch = useDispatch()
  let { quizId } = useParams()
  let { allQuestions, addQue, editQue, type, queForEdit } = useSelector(state => state.questionSlice)

  let deleteQueFunc = async ({ event, id }) => {
    await dispatch(deleteQuestion(id))
    await dispatch(getQuestions(quizId))
    await dispatch(updateInfo({ addQue: false, editQue: false, type: 'mcq', queForEdit: null }))
  }

  useEffect(() => {
    dispatch(updateCurrQuizId(null))
    dispatch(getQuestions(quizId))
    // eslint-disable-next-line
  }, [])

  return (
    <div className="Quiz">
      <div className="header">
        <Link to="/home" className="link"><p className="logo">K A H O O T!</p></Link>
        <div className="buttonDib">
          <button className="templates">Templates</button>
          <button className="reports">Reports</button>
        </div>
        <button className="signout">Save</button>
      </div>
      <div className="container">
        <div className="sidebar">
          <div className="queCard">
            <TextField
              id="outlined-select-currency"
              select
              name="type"
              label="Select Type"
              required
              fullWidth
              disabled={editQue}
              value={type}
              onChange={(e) => dispatch(updateInfo({ addQue, editQue, type: e.target.value, queForEdit }))}
              sx={{ color: 'rgb(198, 0, 23)' }}
            >
              <MenuItem key={1} value='mcq'>Multiple Choice</MenuItem>
              <MenuItem key={2} value='tf'>True False</MenuItem>
            </TextField>
            <button
              onClick={() => {
                dispatch(updateInfo({ addQue: true, editQue: false, type, queForEdit }))
              }} className="add">Add Question</button>
          </div>
          <p className="msg">*Drag and drop to reorder the questions</p>
          {allQuestions.length > 0 &&
            <div className="addQue">
              {allQuestions.map(el =>
              (<div onClick={() => {
                dispatch(updateInfo({ addQue: false, editQue: true, type: el.type, queForEdit: el }))
              }} className="queCard" key={el._id}>
                <img src={`../images/${el.type}.png`} alt="" className="type" />
                <button onClick={(event) => {
                  event.stopPropagation()
                  deleteQueFunc({ event, id: el._id })
                }} className="add">Delete</button>
              </div>))}
            </div>
          }
        </div>
        {(addQue && type === 'mcq') && <AddMcq quizId={quizId} />}
        {(addQue && type === 'tf') && <AddTf quizId={quizId} />}
        {(editQue && type === 'mcq') && <EditMcq />}
        {(editQue && type === 'tf') && <EditTf />}
        {(!addQue && !editQue) && <div className="queDiv"><h1>Click on Add Question button to add a new Question</h1></div>}
      </div>
    </div>
  )
}
