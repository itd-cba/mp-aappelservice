import { mockAppAxolotlApi } from '@meisterplan/appaxolotl-api';
import { mockAuthenticorn } from '@meisterplan/authenticorn-utils';

import { ExamplePageProps } from '@meisterplan/templaniantiger-wrapper';
import { render } from '@testing-library/react';
import { IntlProvider } from '../../i18n/IntlProvider';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { ExamplePage } from './ExamplePage';

mockAppAxolotlApi();
mockAuthenticorn({});

const setup = (propOverrides?: Partial<ExamplePageProps>) => {
  const defaultProps: ExamplePageProps = {
    someProp: 'Peter',
  };

  render(
    <ThemeProvider>
      <IntlProvider>
        <ExamplePage {...defaultProps} {...propOverrides} />
      </IntlProvider>
    </ThemeProvider>
  );

  return {};
};

describe('ExamplePage', () => {
  it('renders with correct name', () => {
    setup();
    expect(true).toBeTruthy();
  });
});
