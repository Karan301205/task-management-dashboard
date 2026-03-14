import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./taskSlice"
import { saveTasks } from "../utils/localStorage"

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
})

// Save to localStorage whenever state changes
store.subscribe(() => {
  saveTasks(store.getState().tasks.tasks)
})