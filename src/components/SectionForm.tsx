import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useAppDispatch } from '../store/hooks';
import { addSection, updateSection } from '../features/tasks/taskSlice';
import type { Section } from '../features/tasks/taskTypes';

interface SectionFormProps {
  open: boolean;
  onClose: () => void;
  section?: Section | null;
}

const presetColors = [
  '#1976d2', '#2e7d32', '#ed6c02', '#d32f2f', '#9c27b0',
  '#0288d1', '#388e3c', '#f57c00', '#7b1fa2', '#c2185b',
  '#0097a7', '#00796b', '#5d4037', '#455a64', '#616161',
  '#f50057', '#ff6f00', '#ffd600', '#64dd17', '#00c853',
];

const getContrastColor = (hexColor: string): string => {
  const color = hexColor.replace('#', '');
  
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

const SectionForm: React.FC<SectionFormProps> = ({ open, onClose, section }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#1976d2');
  const [titleError, setTitleError] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (section) {
      setTitle(section.title);
      setDescription(section.description || '');
      const sectionColor = section.color || '#1976d2';
      setColor(sectionColor);
      if (colorInputRef.current) {
        colorInputRef.current.value = sectionColor;
      }
    } else {
      setTitle('');
      setDescription('');
      const defaultColor = '#1976d2';
      setColor(defaultColor);
      if (colorInputRef.current) {
        colorInputRef.current.value = defaultColor;
      }
    }
    setTitleError(false);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [section, open]);

  const handleSubmit = () => {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    if (section) {
      dispatch(updateSection({
        ...section,
        title: title.trim(),
        description: description.trim() || undefined,
        color: color,
      }));
    } else {
      dispatch(addSection({
        title: title.trim(),
        description: description.trim() || undefined,
        color: color,
      }));
    }

    setTitle('');
    setDescription('');
    setColor('#1976d2');
    setTitleError(false);
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setColor('#1976d2');
    setTitleError(false);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
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
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: 'white',
        }}
      >
        {section ? 'Edit Section' : 'Add New Section'}
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
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
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <Box>
            <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: 'text.primary' }}>
              Color
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                Quick Select
              </Typography>
              <Grid container spacing={1}>
                {presetColors.map((presetColor) => (
                  <Grid item key={presetColor}>
                    <IconButton
                      onClick={() => setColor(presetColor)}
                      sx={{
                        width: 44,
                        height: 44,
                        bgcolor: presetColor,
                        border: color === presetColor ? '3px solid' : '2px solid',
                        borderColor: color === presetColor ? 'primary.main' : 'divider',
                        borderRadius: 1,
                        transition: 'all 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          boxShadow: 2,
                        },
                        boxShadow: color === presetColor ? 3 : 1,
                      }}
                    >
                      {color === presetColor && (
                        <CheckIcon
                          sx={{
                            color: getContrastColor(presetColor),
                            fontSize: 24,
                            fontWeight: 'bold',
                          }}
                        />
                      )}
                    </IconButton>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                Custom Color
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  component="label"
                  sx={{
                    position: 'relative',
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    bgcolor: color,
                    border: '2px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'scale(1.02)',
                    },
                  }}
                >
                  <input
                    ref={colorInputRef}
                    type="color"
                    defaultValue={color}
                    onChange={(e) => {
                      const newColor = e.target.value;
                      const previewBox = e.target.parentElement as HTMLElement;
                      if (previewBox) {
                        previewBox.style.backgroundColor = newColor;
                        const textBox = previewBox.querySelector('[role="text"]') as HTMLElement;
                        if (textBox) {
                          const contrastColor = getContrastColor(newColor);
                          textBox.style.color = contrastColor;
                          const textElement = textBox.querySelector('p');
                          if (textElement) {
                            textElement.textContent = newColor.toUpperCase();
                          }
                        }
                      }
                      if (debounceTimerRef.current) {
                        clearTimeout(debounceTimerRef.current);
                      }
                      debounceTimerRef.current = setTimeout(() => {
                        setColor(newColor);
                      }, 150);
                    }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                    }}
                  />
                  <Box
                    role="text"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: 8,
                      right: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      borderRadius: 1,
                      py: 0.5,
                      px: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    <Typography
                      component="p"
                      variant="caption"
                      sx={{
                        color: getContrastColor(color),
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        letterSpacing: 0.5,
                      }}
                    >
                      {color.toUpperCase()}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ flex: 1 }}>
                  <TextField
                    label="Hex Color"
                    value={color}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                        if (colorInputRef.current) {
                          colorInputRef.current.value = value;
                        }
                        if (debounceTimerRef.current) {
                          clearTimeout(debounceTimerRef.current);
                        }
                        debounceTimerRef.current = setTimeout(() => {
                          setColor(value);
                        }, 100);
                      }
                    }}
                    fullWidth
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '4px',
                            bgcolor: color,
                            border: '1px solid',
                            borderColor: 'divider',
                            mr: 1.5,
                            flexShrink: 0,
                          }}
                        />
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2, gap: 1 }}>
        <Button 
          onClick={handleClose}
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
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            },
          }}
        >
          {section ? 'Update Section' : 'Add Section'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SectionForm;

