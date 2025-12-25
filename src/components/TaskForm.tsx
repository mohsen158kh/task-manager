import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask, updateTask } from '../features/tasks/taskSlice';
import type { Task } from '../features/tasks/taskTypes';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
  preselectedSectionId?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, task, preselectedSectionId }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const sections = useAppSelector((state) => state.tasks.sections);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedDate, setEstimatedDate] = useState('');
  const [duration, setDuration] = useState('');
  const [sectionId, setSectionId] = useState<string>('');
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setEstimatedDate(task.estimatedDate || '');
      setDuration(task.duration?.toString() || '');
      setSectionId(task.sectionId || '');
    } else {
      setTitle('');
      setDescription('');
      setEstimatedDate('');
      setDuration('');
      setSectionId(preselectedSectionId || '');
    }
    setTitleError(false);
  }, [task, open, preselectedSectionId]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    if (task) {
      dispatch(updateTask({
        ...task,
        title: title.trim(),
        description: description.trim() || undefined,
        estimatedDate: estimatedDate || undefined,
        duration: duration ? parseFloat(duration) : undefined,
        sectionId: sectionId || undefined,
      }));
    } else {
      dispatch(addTask({ 
        title: title.trim(), 
        description: description.trim() || undefined,
        estimatedDate: estimatedDate || undefined,
        duration: duration ? parseFloat(duration) : undefined,
        sectionId: sectionId || undefined,
      }));
    }
    
    setTitle('');
    setDescription('');
    setEstimatedDate('');
    setDuration('');
    setSectionId('');
    setTitleError(false);
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setEstimatedDate('');
    setDuration('');
    setSectionId('');
    setTitleError(false);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      <DialogTitle 
        sx={{ 
          pb: 2,
          fontWeight: 700,
          fontSize: '1.5rem',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
        }}
      >
        {task ? 'Edit Task' : 'Add New Task'}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            error={titleError}
            helperText={titleError ? 'Title is required' : ''}
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Section</InputLabel>
            <Select
              value={sectionId}
              label="Section"
              required
              onChange={(e) => setSectionId(e.target.value)}
            >
              {sections.map((section) => (
                <MenuItem key={section.id} value={section.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: section.color || '#9e9e9e',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                    {section.title}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Estimated Date"
                type="date"
                value={estimatedDate}
                onChange={(e) => setEstimatedDate(e.target.value)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Duration (hours)"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                fullWidth
                inputProps={{ min: 0, step: 0.5 }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2, gap: 1 }}>
        <Button 
          onClick={handleClose}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            '&:hover': {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
            },
          }}
        >
          {task ? 'Update Task' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;

