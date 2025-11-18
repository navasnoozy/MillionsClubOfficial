// ThemeToggle.tsx
import { useColorScheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return <IconButton disabled />;
  }

  return (
    <IconButton
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      color="inherit"
    >
      {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}