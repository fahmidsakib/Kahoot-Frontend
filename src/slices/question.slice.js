import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from '../apiConfig'

const addQuestion = createAsyncThunk('question-slice/addQuestion', async (data) => {
  const response = await axiosClient.post('/question/add', data)
  return response.data
})

const getQuestions = createAsyncThunk('question-slice/getQuestions', async (quizId) => {
  const response = await axiosClient.get(`/quiz/get-questions/${quizId}`)
  return response.data
})


let questionSlice = createSlice({
  name: 'question-slice',
  initialState: {
    questionError: null,
    questionAlert: null,
    questionLoading: null,
    allQuestions: []
  },
  reducers: {
    // updateCurrQuestionId: (state, action) => {
    //   state.currQuestionId = action.payload
    // },
    // updateErrorAlert: (state, action) => {
    //   state.userError = null
    //   state.userAlert = null
    // },
    // updateAuthenticated: (state, action) => {
    //   state.authenticated = action.payload
    // }
  },
  extraReducers(builder) {
    builder
      .addCase(getQuestions.pending, (state, action) => {
        state.questionError = null
        state.questionLoading = true
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.questionError = action.error.message
        state.questionLoading = false
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questionError = null
        state.questionLoading = false
        state.allQuestions = action.payload.data
      })
  }
})

export default questionSlice.reducer
// export const {  } = questionSlice.actions
export {  getQuestions }
