import { useMemo, useCallback, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../store/hooks';
import { toggleTask, deleteTask } from '../features/tasks/taskSlice';
import type { Task } from '../features/tasks/taskTypes';
import ConfirmModal from './ConfirmModal';

interface TaskItemProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const dispatch = useAppDispatch();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ 
    id: task.id,
    animateLayoutChanges: () => false,
  });

  const style = useMemo(() => ({
    transform: CSS.Transform.toString(transform),
    transition: 'none',
    opacity: isDragging ? 0.6 : 1,
  }), [transform, isDragging]);

  const handleToggle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleTask(task.id));
  }, [task.id, dispatch]);

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    dispatch(deleteTask(task.id));
  }, [task.id, dispatch]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      sx={{
        border: '1px solid',
        borderColor: task.completed ? 'success.light' : 'divider',
        borderRadius: 2,
        mb: 1.5,
        bgcolor: task.completed ? 'rgba(16, 185, 129, 0.05)' : 'background.paper',
        boxShadow: task.completed 
          ? '0 1px 2px 0 rgba(16, 185, 129, 0.1)' 
          : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transition: isDragging ? 'none' : 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: task.completed
            ? '0 4px 6px -1px rgba(16, 185, 129, 0.15)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderColor: task.completed ? 'success.main' : 'primary.light',
        },
      }}
      secondaryAction={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Checkbox
            edge="end"
            checked={task.completed}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
            sx={{
              color: 'text.secondary',
              '&.Mui-checked': {
                color: 'success.main',
              },
            }}
          />
          {onEdit && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={handleDeleteClick}
            sx={{
              color: 'text.secondary',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'error.main',
                color: 'white',
                transform: 'scale(1.1)',
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton
            {...attributes}
            {...listeners}
            size="small"
            sx={{
              cursor: 'grab',
              color: 'text.secondary',
              transition: 'all 0.2s',
              '&:active': {
                cursor: 'grabbing',
              },
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'scale(1.1)',
              },
            }}
          >
            <DragHandleIcon fontSize="small" />
          </IconButton>
        </Box>
      }
    >
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography
              variant="body1"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'text.secondary' : 'text.primary',
                fontWeight: task.completed ? 400 : 500,
              }}
            >
              {task.title}
            </Typography>
            {task.estimatedDate && (
              <Chip
                label={formatDate(task.estimatedDate) || task.estimatedDate}
                size="small"
                sx={{
                  bgcolor: 'primary.light',
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                }}
              />
            )}
            {task.duration && (
              <Chip
                label={`${task.duration}h`}
                size="small"
                sx={{
                  bgcolor: 'secondary.light',
                  color: 'white',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                }}
              />
            )}
          </Box>
        }
        secondary={
          task.description ? (
            <Typography
              variant="body2"
              sx={{
                color: task.completed ? 'text.secondary' : 'text.secondary',
                mt: 0.5,
              }}
            >
              {task.description}
            </Typography>
          ) : null
        }
      />
      <ConfirmModal
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete the task "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </ListItem>
  );
};

export default TaskItem;

