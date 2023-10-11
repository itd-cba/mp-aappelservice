import { mockAuthenticorn } from '@meisterplan/authenticorn-utils';

import { ExampleComponentProps } from '@meisterplan/templaniantiger-wrapper';
import { render } from '@testing-library/react';
import { IntlProvider } from '../../i18n/IntlProvider';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { ExampleComponent } from './ExampleComponent';

mockAuthenticorn({});

const setup = (propOverrides?: Partial<ExampleComponentProps>) => {
  const defaultProps: ExampleComponentProps = {
    someProp: 'Peter',
  };

  const dom = render(
    <ThemeProvider>
      <IntlProvider>
        <ExampleComponent {...defaultProps} {...propOverrides} />
      </IntlProvider>
    </ThemeProvider>
  );

  const elements = {
    getComponent: () => dom.getByTestId('example'),
  };

  return {
    elements,
  };
};

describe('ExampleComponent', () => {
  it('renders with correct name', () => {
    const { elements } = setup();
    expect(elements.getComponent()).toHaveTextContent('Hello Peter!');
  });
});
