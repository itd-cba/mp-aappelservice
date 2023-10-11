import MPThemeProvider from '@meisterplan/ui-react';
import * as React from 'react';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => <MPThemeProvider cssPrefix="templaniantiger">{children}</MPThemeProvider>;
