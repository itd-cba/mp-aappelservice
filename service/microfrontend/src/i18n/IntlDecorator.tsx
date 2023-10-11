import { DecoratorFn } from '@storybook/react';
import { IntlProvider } from 'react-intl';
import { resolveMessages } from './IntlProvider';

export const withIntl: DecoratorFn = (StoryFn, { globals: { locale } }) => (
  <IntlProvider locale={locale} messages={resolveMessages(locale)}>
    <StoryFn />
  </IntlProvider>
);

export const SUPPORTED_LOCALES = [
  'en-US',
  'en-GB',
  'en-IE',
  'en-AU',
  'en-CA',
  'en-CH',
  'en-DE',
  'en-NL',
  'en-DK',
  'en-BE',
  'en-SE',
  'en-FI',
  'en-SI',
  'de-DE',
  'de-AT',
  'de-CH',
  'de-IT',
  'de-LI',
  'fr-FR',
  'fr-CA',
  'fr-CH',
  'fr-BE',
  'es-ES',
  'es-US',
];
