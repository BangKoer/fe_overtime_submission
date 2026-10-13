import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/index"

export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
}) 