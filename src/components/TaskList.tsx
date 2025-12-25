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
} from '@dnd-kit/sortable';
import { List, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { reorderTasks } from '../features/tasks/taskSlice';
import type { Task } from '../features/tasks/taskTypes';
import TaskItem from './TaskItem';

interface TaskListProps {
  onEditTask?: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onEditTask }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filter = useAppSelector((state) => state.tasks.filter);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getFilteredTasks = (): Task[] => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'notCompleted':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newTasks = Array.from(tasks);
        const [reorderedTask] = newTasks.splice(oldIndex, 1);
        newTasks.splice(newIndex, 0, reorderedTask);

        dispatch(reorderTasks(newTasks));
      }
    }
  };

  return (
    <Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <List>
            {filteredTasks.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 4 }}
              >
                No tasks found
              </Typography>
            ) : (
              filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={onEditTask} />
              ))
            )}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default TaskList;

