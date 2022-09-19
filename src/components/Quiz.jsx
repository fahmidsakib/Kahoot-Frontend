import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCurrQuizId, updateQueOder } from '../slices/quiz.slice'
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddMcq from './AddMcq';
import AddTf from './AddTf';
import EditMcq from './EditMcq';
import EditTf from './EditTf';
import { getQuestions, updateInfo, deleteQuestion, updateQuestionPos, saveQuestionPosition } from '../slices/question.slice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function Quiz() {

  let goto = useNavigate()
  let dispatch = useDispatch()
  let { quizId } = useParams()
  let { addQue, editQue, type, queForEdit, tempUpdatedAllQuestions } = useSelector(state => state.questionSlice)

  let deleteQueFunc = async (id) => {
    await dispatch(deleteQuestion(id))
    await dispatch(getQuestions(quizId))
    await dispatch(updateInfo({ addQue: false, editQue: false, type: 'mcq', queForEdit: null }))
  }

  let onDragEnd = (result) => {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    let obj = { destination, source, draggableId }
    console.log(obj)
    dispatch(updateQuestionPos(obj))
  }

  let saveOrder = () => {
    dispatch(saveQuestionPosition())
    let obj = { questions: tempUpdatedAllQuestions, quizId }
    dispatch(updateQueOder(obj))
    goto('/home')
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
        {/* <div className="buttonDib">
          <button className="templates">Templates</button>
          <button className="reports">Reports</button>
        </div> */}
        <div className="buttonDiv1">
          <button onClick={() => goto('/home')} className="signout">Back</button>
          <button onClick={() => saveOrder()} className="signout">Save</button>
        </div>
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
          {tempUpdatedAllQuestions.length > 0 &&
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='queDiv'>
                {provided => (
                  <div className="addQue"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {tempUpdatedAllQuestions.map((el, index) =>
                    (<Draggable
                      draggableId={el._id}
                      index={index}
                      key={el._id}
                    >
                      {provided => (
                        <div onClick={() => { dispatch(updateInfo({ addQue: false, editQue: true, type: el.type, queForEdit: el })) }}
                          className="queCard" key={el._id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <img src={`../images/${el.type}.png`} alt="" className="type" />
                          <button onClick={(event) => { event.stopPropagation(); deleteQueFunc(el._id) }} className="add">Delete</button>
                        </div>
                      )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          }
        </div>
        {(addQue && type === 'mcq') && <AddMcq quizId={quizId} />}
        {(addQue && type === 'tf') && <AddTf quizId={quizId} />}
        {(editQue && type === 'mcq') && <EditMcq key={queForEdit._id} />}
        {(editQue && type === 'tf') && <EditTf key={queForEdit._id} />}
        {(!addQue && !editQue) && <div className="queDiv"><h1>Click on Add Question button to add a new Question</h1></div>}
      </div>
    </div>
  )
}
