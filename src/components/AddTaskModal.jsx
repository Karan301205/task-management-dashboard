import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTask, addTag } from "../redux/taskSlice"
import { v4 as uuidv4 } from "uuid"

const TAG_COLORS = [
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-pink-100 text-pink-600",
  "bg-red-100 text-red-600",
  "bg-purple-100 text-purple-600",
  "bg-yellow-100 text-yellow-600",
  "bg-orange-100 text-orange-600",
  "bg-teal-100 text-teal-600",
]

function AddTaskModal({ onClose }) {
  const dispatch = useDispatch()
  const availableTags = useSelector((state) => state.tasks.tags)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")
  const [status, setStatus] = useState("todo")
  const [dueDate, setDueDate] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState(TAG_COLORS[0])
  const [showTagCreator, setShowTagCreator] = useState(false)

  const today = new Date().toISOString().split("T")[0]

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    )
  }

  const handleCreateTag = () => {
    if (!newTagName.trim()) return
    const newTag = {
      id: uuidv4(),
      name: newTagName.trim(),
      color: newTagColor,
    }
    dispatch(addTag(newTag))
    setSelectedTags((prev) => [...prev, newTag.id])
    setNewTagName("")
    setShowTagCreator(false)
  }

  const handleSubmit = () => {
    if (!title.trim()) return
    dispatch(addTask({
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate: dueDate || null,
      subtasks: [],
      tags: selectedTags,
    }))
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 max-h-screen overflow-y-auto relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-800">Add New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">x</button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-purple-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Column</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-purple-500"
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="date"
            value={dueDate}
            min={today}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Tags <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <button
              onClick={() => setShowTagCreator(!showTagCreator)}
              className="text-xs text-purple-500 hover:text-purple-700 font-medium"
            >
              + Create tag
            </button>
          </div>

          {/* Available Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={"text-xs px-3 py-1 rounded-full font-medium border-2 transition-all " + tag.color + " " + (selectedTags.includes(tag.id) ? "border-purple-400 ring-2 ring-purple-200" : "border-transparent")}
              >
                {selectedTags.includes(tag.id) ? "✓ " : ""}{tag.name}
              </button>
            ))}
          </div>

          {/* Create New Tag */}
          {showTagCreator && (
            <div className="bg-gray-50 rounded-lg p-3 mt-2">
              <p className="text-xs font-medium text-gray-600 mb-2">Create New Tag</p>
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateTag()}
                placeholder="Tag name..."
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm mb-2 focus:outline-none focus:border-purple-400"
              />
              {/* Color Picker */}
              <div className="flex flex-wrap gap-2 mb-2">
                {TAG_COLORS.map((color) => {
                  const bgColor = color.split(" ")[0]
                  return (
                    <button
                      key={color}
                      onClick={() => setNewTagColor(color)}
                      className={"w-6 h-6 rounded-full border-2 " + bgColor + " " + (newTagColor === color ? "border-gray-500 scale-110" : "border-transparent")}
                    ></button>
                  )
                })}
              </div>
              {/* Preview */}
              {newTagName && (
                <div className="mb-2">
                  <span className={"text-xs px-3 py-1 rounded-full font-medium " + newTagColor}>
                    {newTagName}
                  </span>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowTagCreator(false)}
                  className="flex-1 text-xs border border-gray-300 rounded-lg py-1.5 text-gray-500 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTag}
                  className="flex-1 text-xs bg-purple-500 text-white rounded-lg py-1.5 hover:bg-purple-600"
                >
                  Create
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-purple-600 text-white rounded-lg py-2 text-sm hover:bg-purple-700"
          >
            Add Task
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddTaskModal