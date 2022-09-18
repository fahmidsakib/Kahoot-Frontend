import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from '../apiConfig'

const getQuizzes = createAsyncThunk('quiz-slice/getQuizzes', async () => {
  const response = await axiosClient.get('/quiz')
  return response.data
})

const getReports = createAsyncThunk('quiz-slice/getReports', async () => {
  const response = await axiosClient.get('/quiz/reports')
  return response.data
})

const createQuiz = createAsyncThunk('quiz-slice/createQuiz', async (data) => {
  const response = await axiosClient.post('/quiz/create', data)
  return response.data
})

const deleteQuiz = createAsyncThunk('quiz-slice/deleteQuiz', async (quizId) => {
  const response = await axiosClient.delete(`/quiz/delete/${quizId}`)
  return response.data
})

const saveReport = createAsyncThunk('quiz-slice/saveReport', async (data) => {
  const response = await axiosClient.post('/quiz/save-quiz-reports', data)
  return response.data
})


let quizSlice = createSlice({
  name: 'quiz-slice',
  initialState: {
    quizError: null,
    quizAlert: null,
    quizLoading: null,
    currQuizId: null,
    allQuizzes: [],
    allReports: [],
  },
  reducers: {
    updateCurrQuizId: (state, action) => {
      state.currQuizId = action.payload
    },
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
      .addCase(getQuizzes.pending, (state, action) => {
        state.quizError = null
        state.quizLoading = true
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.quizError = action.error.message
        state.quizLoading = false
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.quizError = null
        state.quizLoading = false
        state.allQuizzes = action.payload.data
      })

      .addCase(getReports.pending, (state, action) => {
        state.quizError = null
        state.quizLoading = true
      })
      .addCase(getReports.rejected, (state, action) => {
        state.quizError = action.error.message
        state.quizLoading = false
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.quizError = null
        state.quizLoading = false
        state.allReports = action.payload.data
      })
    
      .addCase(createQuiz.pending, (state, action) => {
        state.quizError = null
        state.quizLoading = true
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.quizError = action.error.message
        state.quizLoading = false
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.quizError = null
        state.quizLoading = false
        state.currQuizId = action.payload.data
        state.quizAlert = action.payload.alert
      })
    
      .addCase(deleteQuiz.pending, (state, action) => {
        state.quizError = null
        state.quizLoading = true
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.quizError = action.error.message
        state.quizLoading = false
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizError = null
        state.quizLoading = false
        state.quizAlert = action.payload.alert
      })
    
      .addCase(saveReport.pending, (state, action) => {
        state.quizError = null
        state.quizLoading = true
      })
      .addCase(saveReport.rejected, (state, action) => {
        state.quizError = action.error.message
        state.quizLoading = false
      })
      .addCase(saveReport.fulfilled, (state, action) => {
        state.quizError = null
        state.quizLoading = false
        state.quizAlert = action.payload.alert
      })
  }
})

export default quizSlice.reducer
export const { updateCurrQuizId } = quizSlice.actions
export { getQuizzes, createQuiz, deleteQuiz, getReports, saveReport }
