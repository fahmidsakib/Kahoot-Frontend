import { createSlice } from "@reduxjs/toolkit";


let playSlice = createSlice({
  name: 'quiz-slice',
  initialState: {
    socket: null,
    socketId: null,
    quizRoomId: null,
    quizId: null,
    tWait: false,
    sWait: false,
    studentsArr: []
  },
  reducers: {
    updateTwait: (state, action) => {
      state.tWait = action.payload
    },
    updateSwait: (state, action) => {
      state.sWait = action.payload
    },
    updateQuizId: (state, action) => {
      state.quizId = action.payload
    },
    // updateNewQuizRoomInfo: (state, action) => {
    //   state.quizRoomId = action.payload.roomId
    //   state.tWait = action.payload.tWait
    // },
    updateRoomId: (state, action) => {
      state.quizRoomId = action.payload
    },
    updateStudentsArr: (state, action) => {
      state.studentsArr = action.payload
    },
    updateSocketInfo: (state, action) => {
      state.socket = action.payload
      state.socketId = action.payload.id
      console.log(state.socket, state.socketId, 'Socket updated')
    }
  }
})

export default playSlice.reducer
export const { updateRoomId, updateSocketInfo, updateNewQuizRoomInfo, updateStudentsArr, updateTwait, updateSwait, updateQuizId } = playSlice.actions
