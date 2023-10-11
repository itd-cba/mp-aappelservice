import { getUser, useUser } from '@meisterplan/authenticorn-utils';
import * as React from 'react';
import { useMemo } from 'react';
import { createIntl, IntlProvider as ReactIntlProvider } from 'react-intl';

import translationsEn from './templaniantiger/translations.json';
import translationsDe from './templaniantiger/translations_de.json';
import translationsEs from './templaniantiger/translations_es.json';
import translationsFr from './templaniantiger/translations_fr.json';

if (!Intl.PluralRules) {
  require('intl-pluralrules');
}

const RelativeTimeFormat = (Intl as any).RelativeTimeFormat;
if (!RelativeTimeFormat) {
  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/de');
  require('@formatjs/intl-relativetimeformat/locale-data/en');
  require('@formatjs/intl-relativetimeformat/locale-data/fr');
  require('@formatjs/intl-relativetimeformat/locale-data/es');
}

export const DEFAULT_LOCALE = 'en-US';

export const resolveMessages = (locale: string) => {
  if (locale.startsWith('de')) {
    return { ...translationsEn, ...translationsDe };
  } else if (locale.startsWith('es')) {
    return { ...translationsEn, ...translationsEs };
  } else if (locale.startsWith('fr')) {
    return { ...translationsEn, ...translationsFr };
  } else {
    return translationsEn;
  }
};

const resolveLocale = (locale: string) =>
  locale.startsWith('de') || locale.startsWith('en') || locale.startsWith('es') || locale.startsWith('fr') ? locale : DEFAULT_LOCALE;

export const IntlProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { locale } = useUser();
  const resolvedLocale = useMemo(() => resolveLocale(locale), [locale]);
  const messages = useMemo(() => resolveMessages(resolvedLocale), [resolvedLocale]);
  return (
    // Setting the components key is used to prevent stale translations on locale change: https://github.com/yahoo/react-intl/issues/234
    <ReactIntlProvider key={resolvedLocale} locale={resolvedLocale} messages={messages}>
      {children}
    </ReactIntlProvider>
  );
};

export const getIntl = () => {
  const resolvedLocale = resolveLocale(getUser().locale);
  return createIntl({ locale: resolvedLocale, messages: resolveMessages(resolvedLocale) });
};
