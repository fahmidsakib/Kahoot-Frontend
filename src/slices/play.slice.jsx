import { createSlice } from "@reduxjs/toolkit";


let playSlice = createSlice({
  name: 'quiz-slice',
  initialState: {
    socket: null,
    socketId: null,
    quizRoomId: null,
    quizId: null,
    waiting: true,
    studentsArr: []
  },
  reducers: {
    updateNewQuizRoomInfo: (state, action) => {
      state.socket = action.payload.socket
      state.socketId = action.payload.socket.id
      state.quizRoomId = action.payload.roomId
      state.quizId = action.payload.quizId
    },
    updateStudentsArr: (state, action) => {
      state.studentsArr = action.payload
    },
    // updateCurrQuizId: (state, action) => {
    //   state.currQuizId = action.payload
    // },
  }
})

export default playSlice.reducer
export const { updateNewQuizRoomInfo, updateStudentsArr } = playSlice.actions
