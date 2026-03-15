# 🗂️ Task Management Dashboard

A feature-rich Kanban-style Task Management Dashboard built with **React**, **Redux Toolkit**, **Tailwind CSS**, and **Firebase Authentication**.

🔗 **Live Demo:** [https://task-management-dashboard-nu-seven.vercel.app/login](https://task-management-dashboard-nu-seven.vercel.app/login)

---

## 📸 Screenshots

### Login Page
![Login Page](public/screenshots/login_page.png)

### Dashboard
![Dashboard](public/screenshots/dashboard.png)

### Mobile View
![Mobile View](public/screenshots/mobile_view.png)

---

## ✨ Features

### Core Features
- **Kanban Board** — 3 columns: To Do, In Progress, Done
- **Add Tasks** — Title, description, priority, column, due date, tags
- **Delete Tasks** — With confirmation dialog
- **Drag and Drop** — Move tasks between columns using react-beautiful-dnd
- **Priority Sorting** — Tasks auto-sorted High → Medium → Low
- **Filter by Priority** — Filter pills with persistence across refresh
- **LocalStorage Persistence** — Tasks and filter survive page refresh

### Advanced Features
- **Google OAuth** — Firebase Authentication with Google Sign-In
- **Welcome Screen** — Personalized greeting after login
- **Due Date & Reminders** — Banner notifications for overdue, due today, due tomorrow
- **Subtasks** — Nested tasks with progress bar per task
- **Custom Tags** — Create color-coded tags and assign to tasks
- **Collapsible Sidebar** — Clean workspace with collapse toggle
- **Fully Responsive** — Mobile, tablet, laptop, desktop support

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ReactJS | Frontend framework |
| Redux Toolkit | Global state management |
| Tailwind CSS | Utility-first styling |
| react-beautiful-dnd | Drag and drop |
| Firebase Auth | Google OAuth authentication |
| React Router | Client-side routing |
| UUID | Unique task ID generation |
| LocalStorage | Data persistence |
| Vite | Build tool and dev server |
| Vercel | Deployment |

---

## 📁 Project Structure
```
src/
├── components/
│   ├── Sidebar.jsx          # Collapsible sidebar with navigation
│   ├── Header.jsx           # Top bar with search and user info
│   ├── TaskCard.jsx         # Individual task card with subtasks and tags
│   ├── TaskColumn.jsx       # Kanban column with droppable zone
│   ├── AddTaskModal.jsx     # Modal for creating new tasks
│   └── DueDateBanner.jsx    # Auto-dismiss reminder notifications
├── pages/
│   ├── Dashboard.jsx        # Main kanban board page
│   ├── LoginPage.jsx        # Google OAuth login page
│   └── WelcomePage.jsx      # Post-login welcome screen
├── redux/
│   ├── store.js             # Redux store configuration
│   └── taskSlice.js         # Tasks and tags state + actions
├── utils/
│   ├── localStorage.js      # LocalStorage helpers
│   └── dateHelpers.js       # Due date status and formatting
├── context/
│   └── AuthContext.jsx      # Firebase auth context
├── firebase.js              # Firebase configuration
├── App.jsx                  # Root component with routing
└── main.jsx                 # Entry point with Redux Provider
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** v18 or higher
- **npm** v9 or higher
- **Git**

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/Karan301205/task-management-dashboard.git
cd task-management-dashboard
```

**2. Install dependencies:**
```bash
npm install --legacy-peer-deps
```

**3. Set up Firebase:**

Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com) and enable Google Authentication.

**4. Create a `.env` file** in the root directory:
```env
VITE_FIREBASE_API_KEY="AIzaSyA8zjuZMJGohwuT4U8c4xKTtZjarqIIf0w"
VITE_FIREBASE_AUTH_DOMAIN="task-management-dashboar-c9983.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="task-management-dashboar-c9983"
VITE_FIREBASE_STORAGE_BUCKET="task-management-dashboar-c9983.firebasestorage.app"
VITE_FIREBASE_MESSAGING_SENDER_ID="187130481030"
VITE_FIREBASE_APP_ID="1:187130481030:web:675c92c1c4b0cd22d84407"
```

**5. Start the development server:**
```bash
npm run dev
```

**6. Open your browser at:**
```
http://localhost:5173
```

---

## 🏗️ Build for Production
```bash
npm run build
```

The production build will be in the `dist/` folder.

---

## 🌐 Deployment

This project is deployed on **Vercel**. Every push to the `main` branch automatically triggers a redeployment.

To deploy your own version:
1. Fork this repository
2. Import it on [vercel.com](https://vercel.com)
3. Add your Firebase environment variables in Vercel project settings
4. Deploy!

---

## 💡 Approach & Design Decisions

### State Management
Redux Toolkit was chosen for global state management because tasks need to be accessible across multiple components (columns, filters, drag-and-drop). The `taskSlice` handles all task and tag operations in a single slice.

### Persistence Strategy
LocalStorage was used instead of a database to keep the project self-contained and avoid backend complexity. The Redux store subscribes to state changes and saves tasks, tags, and filter preferences automatically.

### Drag and Drop
`react-beautiful-dnd` was used for drag-and-drop. Since it doesn't officially support React 19, `--legacy-peer-deps` was used during installation and `StrictMode` was disabled to prevent compatibility errors.

### Authentication
Firebase Authentication was chosen for Google OAuth because it's free, reliable, requires no backend, and handles token management automatically. Environment variables are used to keep Firebase credentials secure.

### Responsive Design
Three breakpoints were implemented:
- **Mobile** (`< 768px`): Hidden sidebar with hamburger menu overlay
- **Tablet** (`768px - 1024px`): Icon-only collapsed sidebar
- **Desktop** (`> 1024px`): Full sidebar with collapse toggle

### Component Architecture
Components are kept small and focused. Each component handles one responsibility — TaskCard handles individual task display and interactions, TaskColumn handles the droppable zone, Dashboard orchestrates the overall board state.

---

## 🔧 Assumptions Made

1. **No backend required** — All data is stored in LocalStorage. In a production app, this would be replaced with a database like Firestore.
2. **Single project view** — The dashboard shows one project (Mobile App). Multi-project support would require additional routing and state.
3. **Google Sign-In only** — Only Google OAuth is implemented. Email/password auth was not included to keep the scope focused.
4. **Task ordering** — Tasks are always sorted by priority (High → Medium → Low) within each column. Manual reordering within a column was not implemented.
5. **No real-time collaboration** — Since LocalStorage is used, changes are not synced across different browsers or users.

---

## 👨‍💻 Author

**Karan Rawat**
- GitHub: [@Karan301205](https://github.com/Karan301205)
- Email: karan301205@gmail.com

---

## 📄 License

This project is built as an internship assignment for **Creative Upaay**.