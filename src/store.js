import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./slices/question.slice";
import quizSlice from "./slices/quiz.slice";
import userSlice from "./slices/user.slice";

let store = configureStore({
    reducer: {
        userSlice: userSlice,
        quizSlice: quizSlice,
        questionSlice: questionSlice,
    }
})

export default store