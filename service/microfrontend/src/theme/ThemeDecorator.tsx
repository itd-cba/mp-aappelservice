import { CssBaseline } from '@mui/material';
import { DecoratorFn } from '@storybook/react';
import { ThemeProvider } from './ThemeProvider';

export const ThemeDecorator: DecoratorFn = (StoryFn) => (
  <ThemeProvider>
    <CssBaseline />
    <StoryFn />
  </ThemeProvider>
);
