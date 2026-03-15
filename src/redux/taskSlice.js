import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { loadTasks } from "../utils/localStorage"

const defaultTasks = [
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "todo",
    priority: "low",
    dueDate: null,
  },
  {
    id: uuidv4(),
    title: "Research",
    description: "User research helps you to create an optimal product for users.",
    status: "todo",
    priority: "high",
    dueDate: null,
  },
  {
    id: uuidv4(),
    title: "Wireframes",
    description: "Low fidelity wireframes include the most basic content and visuals.",
    status: "todo",
    priority: "high",
    dueDate: null,
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "inprogress",
    priority: "low",
    dueDate: null,
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "inprogress",
    priority: "low",
    dueDate: null,
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "done",
    priority: "low",
    dueDate: null,
  },
  {
    id: uuidv4(),
    title: "Design System",
    description: "It just needs to adapt the UI from what you did before.",
    status: "done",
    priority: "low",
    dueDate: null,
  },
]

const savedTasks = loadTasks()

const initialState = {
  tasks: savedTasks ?? defaultTasks,
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload
      const task = state.tasks.find((t) => t.id === taskId)
      if (task) {
        task.status = newStatus
      }
    },
  },
})

export const { addTask, deleteTask, updateTask, moveTask } = taskSlice.actions
export default taskSlice.reducer