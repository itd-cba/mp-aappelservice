import { ExampleComponentProps, microfrontendUtils } from '@meisterplan/templaniantiger-wrapper';
import React from 'react';
import { IntlProvider } from '../../i18n/IntlProvider';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { ExampleComponent } from './ExampleComponent';

export const ExampleComponentWrapper: React.FunctionComponent<ExampleComponentProps> = (props) => (
  <microfrontendUtils.SentryErrorBoundary>
    <ThemeProvider>
      <IntlProvider>
        <ExampleComponent {...props} />
      </IntlProvider>
    </ThemeProvider>
  </microfrontendUtils.SentryErrorBoundary>
);
