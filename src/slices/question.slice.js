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

const editQuestion = createAsyncThunk('question-slice/editQuestion', async ({data, queId}) => {
  const response = await axiosClient.post(`/question/edit/${queId}`, data)
  return response.data
})

const deleteQuestion = createAsyncThunk('question-slice/deleteQuestion', async (queId) => {
  const response = await axiosClient.delete(`/question/delete/${queId}`)
  return response.data
})

let questionSlice = createSlice({
  name: 'question-slice',
  initialState: {
    addQue: false,
    editQue: false,
    queForEdit: null,
    type: 'mcq',
    questionError: null,
    questionAlert: null,
    questionLoading: null,
    allQuestions: []
  },
  reducers: {
    updateAllQuestions: (state, action) => {
      state.allQuestions.push(action.payload)
    },
    updateInfo: (state, action) => {
      state.addQue = action.payload.addQue
      state.editQue = action.payload.editQue
      state.queForEdit = action.payload.queForEdit
      state.type = action.payload.type
    }
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

      .addCase(addQuestion.pending, (state, action) => {
        state.questionError = null
        state.questionLoading = true
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.questionError = action.error.message
        state.questionLoading = false
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.questionError = null
        state.questionLoading = false
        state.questionAlert = action.payload.alert
      })
    
      .addCase(editQuestion.pending, (state, action) => {
        state.questionError = null
        state.questionLoading = true
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.questionError = action.error.message
        state.questionLoading = false
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.questionError = null
        state.questionLoading = false
        state.questionAlert = action.payload.alert
      })
    
      .addCase(deleteQuestion.pending, (state, action) => {
        state.questionError = null
        state.questionLoading = true
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.questionError = action.error.message
        state.questionLoading = false
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questionError = null
        state.questionLoading = false
        state.questionAlert = action.payload.alert
      })
  }
})

export default questionSlice.reducer
export const { updateAllQuestions, updateInfo } = questionSlice.actions
export { getQuestions, addQuestion, editQuestion, deleteQuestion }
