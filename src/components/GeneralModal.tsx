import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  useTheme,
} from '@mui/material';

interface GeneralModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  headerGradient?: string;
}

const GeneralModal: React.FC<GeneralModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  headerGradient,
}) => {
  const theme = useTheme();

  const defaultGradient = `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
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
          background: headerGradient || defaultGradient,
          color: 'white',
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default GeneralModal;

