import { ExamplePageProps, microfrontendUtils } from '@meisterplan/templaniantiger-wrapper';
import React from 'react';
import { IntlProvider } from '../../i18n/IntlProvider';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { ExamplePage } from './ExamplePage';

export const ExamplePageWrapper: React.FunctionComponent<ExamplePageProps> = (props) => (
  <microfrontendUtils.SentryErrorBoundary>
    <ThemeProvider>
      <IntlProvider>
        <ExamplePage {...props} />
      </IntlProvider>
    </ThemeProvider>
  </microfrontendUtils.SentryErrorBoundary>
);
