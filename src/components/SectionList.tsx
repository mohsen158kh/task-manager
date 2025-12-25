import { useMemo, useCallback } from 'react';
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
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { reorderSections } from '../features/tasks/taskSlice';
import type { Section, Task } from '../features/tasks/taskTypes';
import SectionItem from './SectionItem';
import EmptySectionsState from './EmptySectionsState';

interface SectionListProps {
  onEditSection?: (section: Section) => void;
  onEditTask?: (task: Task) => void;
  onAddTaskToSection?: (sectionId: string) => void;
  onAddSection?: () => void;
}

const SectionList: React.FC<SectionListProps> = ({ onEditSection, onEditTask, onAddTaskToSection, onAddSection }) => {
  const dispatch = useAppDispatch();
  const sections = useAppSelector((state) => state.tasks.sections);
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filter = useAppSelector((state) => state.tasks.filter);

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

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'notCompleted':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newSections = arrayMove(sections, oldIndex, newIndex);
    dispatch(reorderSections(newSections));
  }, [sections, dispatch]);

  return (
    <Box>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={useMemo(() => sections.map((s) => s.id), [sections])}
          strategy={verticalListSortingStrategy}
        >
          {sections.length === 0 ? (
            <EmptySectionsState onAddSection={onAddSection} />
          ) : (
            sections.map((section) => (
              <SectionItem
                key={section.id}
                section={section}
                tasks={filteredTasks}
                onEditSection={onEditSection}
                onEditTask={onEditTask}
                onAddTaskToSection={onAddTaskToSection}
              />
            ))
          )}
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export default SectionList;

