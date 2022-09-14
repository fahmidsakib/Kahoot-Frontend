import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCurrQuizId } from '../slices/quiz.slice'
import { useSelector } from 'react-redux';

export default function Quiz() {

  let [type, setType] = useState('mcq')
  let dispatch = useDispatch()


  useEffect(() => {
    dispatch(updateCurrQuizId())
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

          <div className="queDiv">
            
          </div>

          <div className="addQue">
            <TextField
              id="outlined-select-currency"
              select
              name="type"
              label="Select Type"
              required
              fullWidth
              value={type}
              onChange={(e) => setType(e.target.value)}
              sx={{ color: 'rgb(198, 0, 23)'}}
            >
              <MenuItem key={1} value='mcq'>Multiple Choice</MenuItem>
              <MenuItem key={2} value='tf'>True False</MenuItem>
            </TextField>
            <button className="add">Add Question</button>
          </div>
        </div>
        <div className="queDiv">

        </div>
      </div>

    </div>
  )
}
