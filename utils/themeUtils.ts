import { useTheme } from '@/providers/ThemeProvider';

export const useTextColorClass = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? 'text-white' : 'text-primary';
};

