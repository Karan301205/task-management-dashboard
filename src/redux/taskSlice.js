import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { loadTasks, loadTags } from "../utils/localStorage"

const defaultTasks = [
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "todo",
    priority: "low",
    dueDate: null,
    subtasks: [],
    tags: [],
  },
  {
    id: uuidv4(),
    title: "Research",
    description: "User research helps you to create an optimal product for users.",
    status: "todo",
    priority: "high",
    dueDate: null,
    subtasks: [],
    tags: [],
  },
  {
    id: uuidv4(),
    title: "Wireframes",
    description: "Low fidelity wireframes include the most basic content and visuals.",
    status: "todo",
    priority: "high",
    dueDate: null,
    subtasks: [],
    tags: [],
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "inprogress",
    priority: "low",
    dueDate: null,
    subtasks: [],
    tags: [],
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "inprogress",
    priority: "low",
    dueDate: null,
    subtasks: [],
    tags: [],
  },
  {
    id: uuidv4(),
    title: "Brainstorming",
    description: "Brainstorming brings team members diverse experience into play.",
    status: "done",
    priority: "low",
    dueDate: null,
    subtasks: [],
    tags: [],
  },
  {
    id: uuidv4(),
    title: "Design System",
    description: "It just needs to adapt the UI from what you did before.",
    status: "done",
    priority: "low",
    dueDate: null,
    subtasks: [],
    tags: [],
  },
]

const defaultTags = [
  { id: uuidv4(), name: "Frontend", color: "bg-blue-100 text-blue-600" },
  { id: uuidv4(), name: "Backend", color: "bg-green-100 text-green-600" },
  { id: uuidv4(), name: "Design", color: "bg-pink-100 text-pink-600" },
  { id: uuidv4(), name: "Bug Fix", color: "bg-red-100 text-red-600" },
  { id: uuidv4(), name: "Research", color: "bg-purple-100 text-purple-600" },
]

const savedTasks = loadTasks()
const savedTags = loadTags()

const initialState = {
  tasks: savedTasks ?? defaultTasks,
  tags: savedTags ?? defaultTags,
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

    // Tag actions
    addTag: (state, action) => {
      state.tags.push(action.payload)
    },
    deleteTag: (state, action) => {
      state.tags = state.tags.filter((tag) => tag.id !== action.payload)
      // Remove tag from all tasks
      state.tasks.forEach((task) => {
        task.tags = (task.tags || []).filter((id) => id !== action.payload)
      })
    },
  },
})

export const {
  addTask, deleteTask, updateTask, moveTask,
  addSubtask, toggleSubtask, deleteSubtask,
  addTag, deleteTag,
} = taskSlice.actions

export default taskSlice.reducer