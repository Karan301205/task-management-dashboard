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
    subtasks: [],
  },
  {
    id: uuidv4(),
    title: "Research",
    description: "User research helps you to create an optimal product for users.",
    status: "todo",
    priority: "high",
    dueDate: null,
    subtasks: [],
  },
  {
    id: uuidv4(),
    title: "Wireframes",
    description: "Low fidelity wireframes include the most basic content and visuals.",
    status: "todo",
    priority: "high",
    dueDate: null,
    subtasks: [],
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "inprogress",
    priority: "low",
    dueDate: null,
    subtasks: [],
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "inprogress",
    priority: "low",
    dueDate: null,
    subtasks: [],
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "done",
    priority: "low",
    dueDate: null,
    subtasks: [],
  },
  {
    id: uuidv4(),
    title: "Design System",
    description: "It just needs to adapt the UI from what you did before.",
    status: "done",
    priority: "low",
    dueDate: null,
    subtasks: [],
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
      if (index !== -1) state.tasks[index] = action.payload
    },
    moveTask: (state, action) => {
      const { taskId, newStatus } = action.payload
      const task = state.tasks.find((t) => t.id === taskId)
      if (task) task.status = newStatus
    },

    // Subtask actions
    addSubtask: (state, action) => {
      const { taskId, subtask } = action.payload
      const task = state.tasks.find((t) => t.id === taskId)
      if (task) {
        if (!task.subtasks) task.subtasks = []
        task.subtasks.push(subtask)
      }
    },
    toggleSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload
      const task = state.tasks.find((t) => t.id === taskId)
      if (task) {
        const subtask = task.subtasks.find((s) => s.id === subtaskId)
        if (subtask) subtask.completed = !subtask.completed
      }
    },
    deleteSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload
      const task = state.tasks.find((t) => t.id === taskId)
      if (task) {
        task.subtasks = task.subtasks.filter((s) => s.id !== subtaskId)
      }
    },
  },
})

export const {
  addTask, deleteTask, updateTask, moveTask,
  addSubtask, toggleSubtask, deleteSubtask,
} = taskSlice.actions

export default taskSlice.reducer