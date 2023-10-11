import 'react-app-polyfill/stable';

import { microfrontendUtils } from '@meisterplan/templaniantiger-wrapper';
import { subscribeToExampleMenuItem } from './functions/subscribeToExampleMenuItem';
import { ExampleComponentWrapper } from './components/ExampleComponent/ExampleComponentWrapper';
import { ExamplePageWrapper } from './components/ExamplePage/ExamplePageWrapper';
import { enableAppAxolotlApi } from '@meisterplan/appaxolotl-api';

enableAppAxolotlApi('templaniantiger');

microfrontendUtils.initializeImplementation('react-scripts-5', {
  ExampleComponent: {
    render: microfrontendUtils.renderWithCachedRoot(ExampleComponentWrapper),
    unmount: microfrontendUtils.unmountWithCachedRoot,
    styles: undefined,
  },
  ExamplePage: {
    render: microfrontendUtils.renderWithCachedRoot(ExamplePageWrapper),
    unmount: microfrontendUtils.unmountWithCachedRoot,
    styles: undefined,
  },
  subscribeToExampleMenuItem,
});
