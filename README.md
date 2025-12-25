# Task Manager

A modern, feature-rich task management application built with React, TypeScript, and Material-UI. Organize your tasks into customizable sections, track progress, and manage your workflow efficiently with a beautiful, responsive interface.

![Task Manager](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-LGPL--2.1-green.svg)

## ✨ Features

### Core Functionality
- **Task Management**: Create, edit, and delete tasks with descriptions
- **Section Organization**: Organize tasks into custom sections with colors and descriptions
- **Task Filtering**: Filter tasks by status (All, Completed, Not Completed)
- **Drag and Drop**: Reorder tasks within sections using intuitive drag-and-drop
- **Task Properties**: 
  - Title and description
  - Completion status
  - Estimated completion date
  - Duration tracking
  - Section assignment

### User Experience
- **Dark/Light Theme**: Toggle between dark and light themes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: All data is automatically saved to browser local storage
- **PWA Support**: Progressive Web App capabilities for offline access
- **Modern UI**: Beautiful Material-UI components with smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript 5.3
- **State Management**: Redux Toolkit 2.0
- **UI Library**: Material-UI (MUI) 5.14
- **Build Tool**: Vite 5.0
- **Drag & Drop**: @dnd-kit
- **Styling**: Emotion (CSS-in-JS)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **npm** (version 7 or higher) or **yarn**

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

The production build will be available in the `build` directory, ready for deployment.

### Deployment to Liara

This project is configured for deployment on [Liara](https://liara.ir), an Iranian cloud platform. Follow these steps to deploy:

#### Prerequisites

1. **Install Liara CLI**
   ```bash
   npm install -g @liara/cli
   ```

2. **Login to Liara**
   ```bash
   liara login
   ```

#### Configuration

The project includes a `liara.json` file with the following configuration:
- **Platform**: React (Vite)
- **Build Output**: `build` directory (configured in `vite.config.ts`)
- **Start Script**: Automatically serves the build folder

**Important**: Before deploying, update the `app` field in `liara.json` with your Liara app ID:
```json
{
  "app": "your-app-id",
  "platform": "react"
}
```

#### Deployment Steps

1. **Ensure your project is ready**
   - Make sure `node_modules` is in `.gitignore` (already configured)
   - Verify `package.json` has `build` and `start` scripts (already configured)
   - Check that `vite.config.ts` has `outDir: "build"` (already configured)

2. **Deploy to Liara**
   ```bash
   liara deploy
   ```

3. **Monitor deployment**
   - Watch the deployment logs in your terminal
   - Check the deployment history in Liara console

#### Liara Configuration Options

You can customize the deployment in `liara.json`:

- **Disable npm mirror** (if you encounter package installation issues):
  ```json
  {
    "react": {
      "mirror": false
    }
  }
  ```

- **Enable source maps** (for debugging):
  ```json
  {
    "react": {
      "sourceMap": true
    }
  }
  ```

For more information, visit the [Liara React deployment documentation](https://docs.liara.ir/paas/react/how-tos/deploy-app/).

## 📖 Usage Guide

### Creating Tasks

1. Click the **floating action button** (FAB) at the bottom right
2. Select **"Add Task"**
3. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Estimated date (optional)
   - Duration (optional)
   - Section (optional - defaults to unassigned)
4. Click **"Save"** to create the task

### Creating Sections

1. Click the **floating action button** (FAB)
2. Select **"Add Section"**
3. Enter section details:
   - Title (required)
   - Description (optional)
   - Color (optional - choose a color for visual organization)
4. Click **"Save"** to create the section

### Managing Tasks

- **Edit Task**: Click the edit icon on any task
- **Complete Task**: Toggle the checkbox next to the task
- **Delete Task**: Click the delete icon on any task
- **Reorder Tasks**: Drag and drop tasks within a section to reorder them
- **Filter Tasks**: Use the filter buttons at the top to view:
  - All tasks
  - Completed tasks only
  - Incomplete tasks only

### Managing Sections

- **Edit Section**: Click the edit icon on any section header
- **Delete Section**: Click the delete icon on the section header
- **Add Task to Section**: Click the "+" button on a section header to quickly add a task to that section

### Theme Toggle

Click the theme toggle button in the top-right corner to switch between dark and light themes. Your preference is saved automatically.

## 📁 Project Structure

```
task-manager/
├── public/                 # Static assets and PWA files
│   ├── manifest.json      # PWA manifest
│   ├── sw.js             # Service worker
│   └── icons/            # App icons
├── src/
│   ├── components/       # React components
│   │   ├── AddMenu.tsx
│   │   ├── EmptySectionsState.tsx
│   │   ├── FilterButtons.tsx
│   │   ├── SectionForm.tsx
│   │   ├── SectionItem.tsx
│   │   ├── SectionList.tsx
│   │   ├── TaskForm.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskList.tsx
│   │   ├── ThemeProviderWrapper.tsx
│   │   └── ThemeToggle.tsx
│   ├── contexts/         # React contexts
│   │   └── ThemeContext.tsx
│   ├── features/         # Feature modules
│   │   └── tasks/
│   │       ├── taskSlice.ts    # Redux slice
│   │       └── taskTypes.ts    # TypeScript types
│   ├── store/            # Redux store configuration
│   │   ├── index.ts
│   │   ├── hooks.ts
│   │   └── localStorageMiddleware.ts
│   ├── theme/            # Theme configuration
│   │   └── createAppTheme.ts
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md            # This file
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally

### Code Style

- TypeScript strict mode enabled
- React functional components with hooks
- Redux Toolkit for state management
- Material-UI for consistent UI components

## 💾 Data Persistence

All tasks and sections are automatically saved to your browser's local storage. This means:
- Your data persists between browser sessions
- No account or login required
- Data is stored locally on your device
- Clearing browser data will remove your tasks

## 🌐 Browser Support

This application works best in modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Progressive Web App (PWA)

The application includes PWA support, allowing you to:
- Install it on your device
- Access it offline (with cached data)
- Use it like a native app

To install:
1. Open the app in a supported browser
2. Look for the install prompt or use the browser's install option
3. Follow the installation instructions

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the GNU Lesser General Public License v2.1 (LGPL-2.1). See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI library
- [Material-UI](https://mui.com/) - Component library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management
- [Vite](https://vitejs.dev/) - Build tool
- [@dnd-kit](https://dndkit.com/) - Drag and drop functionality

## 📧 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Made with ❤️ using React and TypeScript** 
