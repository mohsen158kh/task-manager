import { Switch, FormControlLabel } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { mode, toggleMode } = useTheme();
  const isDark = mode === 'dark';

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isDark}
          onChange={toggleMode}
          icon={<LightModeIcon sx={{ color: 'white', fontSize: 18 }} />}
          checkedIcon={<DarkModeIcon sx={{ color: 'white', fontSize: 18 }} />}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: 'white',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            '& .MuiSwitch-track': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        />
      }
      label=""
      sx={{ m: 0 }}
    />
  );
};

export default ThemeToggle;

