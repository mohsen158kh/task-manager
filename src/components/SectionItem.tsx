import { useMemo, useCallback, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  useTheme,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../store/hooks';
import { reorderTasks, deleteSection } from '../features/tasks/taskSlice';
import type { Section, Task } from '../features/tasks/taskTypes';
import TaskItem from './TaskItem';
import ConfirmModal from './ConfirmModal';

interface SectionItemProps {
  section: Section;
  tasks: Task[];
  onEditSection?: (section: Section) => void;
  onEditTask?: (task: Task) => void;
  onAddTaskToSection?: (sectionId: string) => void;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  tasks,
  onEditSection,
  onEditTask,
  onAddTaskToSection,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ 
    id: section.id,
    animateLayoutChanges: () => false,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const style = useMemo(() => ({
    transform: CSS.Transform.toString(transform),
    transition: 'none',
    opacity: isDragging ? 0.6 : 1,
  }), [transform, isDragging]);

  const sectionTasks = useMemo(() => {
    return tasks.filter((task) => task.sectionId === section.id);
  }, [tasks, section.id]);

  const taskIds = useMemo(() => sectionTasks.map((task) => task.id), [sectionTasks]);

  const handleTaskDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sectionTasks.findIndex((task) => task.id === active.id);
    const newIndex = sectionTasks.findIndex((task) => task.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reorderedSectionTasks = arrayMove(sectionTasks, oldIndex, newIndex);
    
    const otherTasks = tasks.filter((task) => task.sectionId !== section.id);
    
    const newTasks = [...reorderedSectionTasks, ...otherTasks];
    dispatch(reorderTasks(newTasks));
  }, [sectionTasks, tasks, section.id, dispatch]);

  const handleDeleteClick = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    dispatch(deleteSection(section.id));
  }, [section.id, dispatch]);

  const handleDeleteCancel = useCallback(() => {
    setDeleteDialogOpen(false);
  }, []);

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      elevation={0}
      sx={{
        mb: 4,
        borderLeft: `4px solid ${section.color || '#9e9e9e'}`,
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        transition: isDragging ? 'none' : 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: isDragging ? undefined : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Box
        sx={{
          background: section.color 
            ? `linear-gradient(135deg, ${section.color}15 0%, ${section.color}08 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.main}1a 0%, ${theme.palette.primary.main}0d 100%)`,
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              mb: 0.5,
              color: 'text.primary',
              fontSize: '1.125rem',
            }}
          >
            {section.title}
          </Typography>
          {section.description && (
            <Typography 
              variant="body2" 
              sx={{
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              {section.description}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {onAddTaskToSection && (
            <IconButton
              size="small"
              onClick={() => onAddTaskToSection(section.id)}
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'success.main',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
              title="Add Task"
            >
              <AddTaskIcon fontSize="small" />
            </IconButton>
          )}
          {onEditSection && (
            <IconButton
              size="small"
              onClick={() => onEditSection(section)}
              sx={{
                color: 'text.secondary',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
              title="Edit Section"
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
            title="Delete Section"
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
            title="Drag to reorder"
          >
            <DragHandleIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ p: 2.5, bgcolor: 'background.paper' }}>
        {sectionTasks.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            {onAddTaskToSection && (
              <Button
                variant="outlined"
                startIcon={<AddTaskIcon />}
                onClick={() => onAddTaskToSection(section.id)}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  px: 3,
                  borderColor: section.color || 'primary.main',
                  color: section.color || 'primary.main',
                  borderStyle: 'dashed',
                  '&:hover': {
                    borderColor: section.color || 'primary.dark',
                    bgcolor: section.color ? `${section.color}10` : 'primary.light',
                    color: section.color || 'primary.dark',
                  },
                }}
              >
                Add Task
              </Button>
            )}
          </Box>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleTaskDragEnd}
          >
            <SortableContext
              items={taskIds}
              strategy={verticalListSortingStrategy}
            >
              <Box>
                {sectionTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onEdit={onEditTask} />
                ))}
              </Box>
            </SortableContext>
          </DndContext>
        )}
      </Box>
      <ConfirmModal
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Section"
        message={`Are you sure you want to delete the section "${section.title}"? All tasks in this section will also be deleted. This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />
    </Paper>
  );
};

export default SectionItem;

