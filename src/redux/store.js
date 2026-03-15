import { configureStore } from "@reduxjs/toolkit"
import taskReducer from "./taskSlice"
import { saveTasks, saveTags } from "../utils/localStorage"

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
})

store.subscribe(() => {
  const state = store.getState()
  saveTasks(state.tasks.tasks)
  saveTags(state.tasks.tags)
})