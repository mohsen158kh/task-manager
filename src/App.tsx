import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useTheme as useCustomTheme } from './contexts/ThemeContext';
import TaskForm from './components/TaskForm';
import SectionList from './components/SectionList';
import FilterButtons from './components/FilterButtons';
import AddMenu from './components/AddMenu';
import SectionForm from './components/SectionForm';
import ThemeToggle from './components/ThemeToggle';
import type { Task } from './features/tasks/taskTypes';
import type { Section } from './features/tasks/taskTypes';

function App() {
  const theme = useTheme();
  const { mode } = useCustomTheme();
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [preselectedSectionId, setPreselectedSectionId] = useState<string | undefined>(undefined);

  const handleOpenTaskDialog = () => {
    setEditingTask(null);
    setPreselectedSectionId(undefined);
    setTaskDialogOpen(true);
  };

  const handleCloseTaskDialog = () => {
    setTaskDialogOpen(false);
    setEditingTask(null);
    setPreselectedSectionId(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };

  const handleOpenSectionDialog = () => {
    setEditingSection(null);
    setSectionDialogOpen(true);
  };

  const handleCloseSectionDialog = () => {
    setSectionDialogOpen(false);
    setEditingSection(null);
  };

  const handleEditSection = (section: Section) => {
    setEditingSection(section);
    setSectionDialogOpen(true);
  };

  const handleAddTaskToSection = (sectionId: string) => {
    setEditingTask(null);
    setPreselectedSectionId(sectionId);
    setTaskDialogOpen(true);
  };

  const isDark = mode === 'dark';
  const backgroundGradient = isDark
    ? `linear-gradient(to bottom, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`
    : `linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)`;

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        pb: 10,
        background: backgroundGradient,
      }}
    >
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Task Manager
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
        <FilterButtons />
        <SectionList 
          onEditSection={handleEditSection} 
          onEditTask={handleEditTask}
          onAddTaskToSection={handleAddTaskToSection}
          onAddSection={handleOpenSectionDialog}
        />
      </Container>
      <AddMenu onAddTask={handleOpenTaskDialog} onAddSection={handleOpenSectionDialog} />
      <TaskForm 
        open={taskDialogOpen} 
        onClose={handleCloseTaskDialog}
        task={editingTask}
        preselectedSectionId={preselectedSectionId}
      />
      <SectionForm
        open={sectionDialogOpen}
        onClose={handleCloseSectionDialog}
        section={editingSection}
      />
    </Box>
  );
}

export default App;

