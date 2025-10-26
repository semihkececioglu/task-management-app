# Task Management App

A modern Kanban-style task management application built with React. Features drag-and-drop functionality, real-time search, and dark mode.

![Task Manager](./preview.png)

## Features

- Drag and drop cards between lists
- Real-time search across all tasks
- Filter by priority and tags
- Dark/Light mode with system preference detection
- LocalStorage persistence
- Responsive design

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- @dnd-kit (Drag & Drop)
- Context API + useReducer
- react-hook-form
- date-fns

## Installation
```bash
# Clone the repo
git clone https://github.com/yourusername/task-management-app.git

# Install dependencies
npm install

# Start dev server
npm run dev
```

## Usage

- **Create List:** Click "Add another list"
- **Add Card:** Click "Add a card" in any list
- **Edit Card:** Click on any card
- **Drag & Drop:** Drag cards between lists
- **Search:** Use the search bar in header
- **Filter:** Use priority and tag filters
- **Dark Mode:** Toggle with the sun/moon icon

## Build
```bash
npm run build
npm run preview
```

## Project Structure
```
task-management-app/
├── public/
├── src/
│   ├── components/
│   │   ├── Board/
│   │   │   └── Board.jsx
│   │   ├── List/
│   │   │   ├── DroppableList.jsx
│   │   │   ├── AddListModal.jsx
│   │   │   ├── EditListModal.jsx
│   │   │   └── ListMenu.jsx
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   ├── DraggableCard.jsx
│   │   │   └── CardModal.jsx
│   │   ├── UI/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── TagInput.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── SkeletonCard.jsx
│   │   └── Layout/
│   │       └── FilterBar.jsx
│   ├── context/
│   │   ├── TaskContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── reducers/
│   │   └── taskReducer.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useDebounce.js
│   │   └── useFilteredCards.js
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## License

MIT

## Author

[Your Name](https://github.com/yourusername)
