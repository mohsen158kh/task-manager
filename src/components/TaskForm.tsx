import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTask, updateTask } from '../features/tasks/taskSlice';
import type { Task } from '../features/tasks/taskTypes';
import GeneralModal from './GeneralModal';
import GeneralDrawer from './GeneralDrawer';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
  preselectedSectionId?: string;
}

const TaskFormContent: React.FC<{
  task?: Task | null;
  preselectedSectionId?: string;
  onSubmit: () => void;
  onCancel: () => void;
}> = ({ task, preselectedSectionId, onSubmit, onCancel }) => {
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
  }, [task, preselectedSectionId]);

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
    onSubmit();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt:3 }}>
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
        InputProps={{
          style: { fontSize: '16px' },
        }}
        InputLabelProps={{
          style: { fontSize: '16px' },
        }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
        InputProps={{
          style: { fontSize: '16px' },
        }}
        InputLabelProps={{
          style: { fontSize: '16px' },
        }}
      />
      <FormControl fullWidth>
        <InputLabel sx={{ fontSize: '16px' }}>Section</InputLabel>
        <Select
          value={sectionId}
          label="Section"
          required
          onChange={(e) => setSectionId(e.target.value)}
          sx={{
            fontSize: '16px',
            '& .MuiSelect-select': {
              fontSize: '16px',
            },
          }}
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
            InputProps={{
              style: { fontSize: '16px' },
            }}
            InputLabelProps={{
              shrink: true,
              style: { fontSize: '16px' },
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
            inputProps={{ min: 0, step: 0.5, style: { fontSize: '16px' } }}
            InputLabelProps={{
              style: { fontSize: '16px' },
            }}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2, pt: 2 }}>
        <Button 
          onClick={onCancel}
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
      </Box>
    </Box>
  );
};

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, task, preselectedSectionId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    onClose();
  };

  const title = task ? 'Edit Task' : 'Add New Task';
  const headerGradient = `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;

  if (isMobile) {
    return (
      <GeneralDrawer
        open={open}
        onClose={handleClose}
        title={title}
        headerGradient={headerGradient}
        anchor="bottom"
      >
        <TaskFormContent
          task={task}
          preselectedSectionId={preselectedSectionId}
          onSubmit={handleClose}
          onCancel={handleClose}
        />
      </GeneralDrawer>
    );
  }

  return (
    <GeneralModal
      open={open}
      onClose={handleClose}
      title={title}
      headerGradient={headerGradient}
      maxWidth="sm"
    >
      <TaskFormContent
        task={task}
        preselectedSectionId={preselectedSectionId}
        onSubmit={handleClose}
        onCancel={handleClose}
      />
    </GeneralModal>
  );
};

export default TaskForm;

