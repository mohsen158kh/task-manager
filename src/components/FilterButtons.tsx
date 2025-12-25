import { ToggleButton, ToggleButtonGroup, Box, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setFilter } from '../features/tasks/taskSlice';
import type { FilterType } from '../features/tasks/taskTypes';

const FilterButtons: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.tasks.filter);

  const handleFilterChange = (_event: React.MouseEvent<HTMLElement>, newFilter: FilterType | null) => {
    if (newFilter !== null) {
      dispatch(setFilter(newFilter));
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 0.5,
          bgcolor: 'background.paper',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          display: 'inline-flex',
        }}
      >
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="task filter"
          sx={{
            '& .MuiToggleButton-root': {
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              borderRadius: 1.5,
              border: 'none',
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
              '&:hover': {
                bgcolor: 'action.hover',
              },
            },
          }}
        >
          <ToggleButton value="all" aria-label="all tasks">
            All Tasks
          </ToggleButton>
          <ToggleButton value="completed" aria-label="completed tasks">
            Completed
          </ToggleButton>
          <ToggleButton value="notCompleted" aria-label="not completed tasks">
            Active
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </Box>
  );
};

export default FilterButtons;

