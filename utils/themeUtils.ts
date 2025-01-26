import { useTheme } from '@/providers/ThemeProvider';

export const useTextColorClass = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? 'text-zinc-200' : 'text-zinc-500';
 
};


export const useBackgroundColorClass = () => {
  const { theme } = useTheme();
  return theme === 'dark' ? 'bg-zinc-900' : 'bg-white';
};

