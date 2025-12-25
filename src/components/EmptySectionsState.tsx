import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface EmptySectionsStateProps {
  onAddSection?: () => void;
}

const EmptySectionsState: React.FC<EmptySectionsStateProps> = ({ onAddSection }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gradientOpacity = isDark ? 0.1 : 0.02;
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 3,
        border: '2px dashed',
        borderColor: 'divider',
        background: `linear-gradient(to bottom, rgba(99, 102, 241, ${gradientOpacity}) 0%, rgba(139, 92, 246, ${gradientOpacity}) 100%)`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <AddBoxIcon sx={{ fontSize: 48, color: 'primary.main' }} />
        </Box>
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 1,
            }}
          >
            No sections found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 3,
              maxWidth: 400,
              mx: 'auto',
            }}
          >
            To get started, create a new section to organize your tasks
          </Typography>
        </Box>
        {onAddSection && (
          <Button
            variant="contained"
            size="large"
            startIcon={<AddBoxIcon />}
            onClick={onAddSection}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              boxShadow: `0 4px 14px 0 rgba(99, 102, 241, ${isDark ? 0.5 : 0.39})`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                boxShadow: `0 6px 20px 0 rgba(99, 102, 241, ${isDark ? 0.6 : 0.5})`,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Create New Section
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default EmptySectionsState;

