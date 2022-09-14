import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./slices/quiz.slice";
import userSlice from "./slices/user.slice";

let store = configureStore({
    reducer: {
        userSlice: userSlice,
        quizSlice: quizSlice,
    }
})

export default store