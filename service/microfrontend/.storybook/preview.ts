import { Preview } from '@storybook/react';
import { withIntl, SUPPORTED_LOCALES } from '../src/i18n/IntlDecorator';
import { ThemeDecorator } from '../src/theme/ThemeDecorator';

const preview: Preview = {
  decorators: [withIntl, ThemeDecorator],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en-US',
      toolbar: {
        icon: 'globe',
        items: SUPPORTED_LOCALES.map((l) => ({ value: l, title: l })),
      },
    },
  },
};

export default preview;
