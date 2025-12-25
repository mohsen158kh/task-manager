import { useState } from 'react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import FolderIcon from '@mui/icons-material/Folder';

interface AddMenuProps {
  onAddTask: () => void;
  onAddSection: () => void;
}

const AddMenu: React.FC<AddMenuProps> = ({ onAddTask, onAddSection }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SpeedDial
      ariaLabel="Add menu"
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        '& .MuiSpeedDial-fab': {
          width: 56,
          height: 56,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.4), 0 4px 6px -2px rgba(99, 102, 241, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.4), 0 10px 10px -5px rgba(99, 102, 241, 0.2)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.3s ease-in-out',
        },
        '& .MuiSpeedDialAction-fab': {
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            bgcolor: 'primary.main',
            color: 'white',
            transform: 'scale(1.1)',
          },
          transition: 'all 0.2s ease-in-out',
        },
      }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={(_, reason) => {
        if (reason === 'toggle' || reason === 'focus') {
          handleOpen();
        }
      }}
      open={open}
    >
      <SpeedDialAction
        key="add-section"
        icon={<FolderIcon />}
        tooltipTitle="Add Section"
        onClick={() => {
          handleClose();
          onAddSection();
        }}
      />
      <SpeedDialAction
        key="add-task"
        icon={<AddTaskIcon />}
        tooltipTitle="Add Task"
        onClick={() => {
          handleClose();
          onAddTask();
        }}
      />
    </SpeedDial>
  );
};

export default AddMenu;

