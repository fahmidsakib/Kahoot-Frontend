import { configureStore } from "@reduxjs/toolkit";
import playSlice from "./slices/play.slice";
import questionSlice from "./slices/question.slice";
import quizSlice from "./slices/quiz.slice";
import userSlice from "./slices/user.slice";

let store = configureStore({
    reducer: {
        userSlice: userSlice,
        quizSlice: quizSlice,
        questionSlice: questionSlice,
        playSlice: playSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store