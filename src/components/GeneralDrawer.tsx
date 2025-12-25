import React from 'react';
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  useTheme,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface GeneralDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  headerGradient?: string;
}

const GeneralDrawer: React.FC<GeneralDrawerProps> = ({
  open,
  onClose,
  title,
  children,
  anchor = 'bottom',
  headerGradient,
}) => {
  const theme = useTheme();

  const defaultGradient = `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: anchor === 'left' || anchor === 'right' ? { xs: '100%', sm: 400 } : '100%',
          maxHeight: anchor === 'top' || anchor === 'bottom' ? '90vh' : '100vh',
          borderTopLeftRadius: anchor === 'bottom' ? 16 : 0,
          borderTopRightRadius: anchor === 'bottom' ? 16 : 0,
          borderBottomLeftRadius: anchor === 'top' ? 16 : 0,
          borderBottomRightRadius: anchor === 'top' ? 16 : 0,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: headerGradient || defaultGradient,
            color: 'white',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 64,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.25rem',
              flex: 1,
            }}
          >
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Content */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </Drawer>
  );
};

export default GeneralDrawer;

