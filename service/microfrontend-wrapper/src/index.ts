import {
  createCodeLoader,
  createWrapperComponent,
  createWrapperHook,
  initializeMicrofrontendWrapper,
  MicrofrontendComponent,
  SubscribeFunction,
} from '@meisterplan/microfrontend-react';

const microfrontendId = 'templaniantiger';

export interface AnalyticsEvent {
  actionType: string;
  plainArguments?: object;
  argumentsToHash?: object;
}

export interface ExampleComponentProps {
  someProp: string;
}

export interface ExamplePageProps {}

export interface ExampleMenuItem {
  'data-tid': string;
  caption: string;
}

export type SubscribeToExampleMenuItemFunction = SubscribeFunction<ExampleMenuItem>;

interface TemplanianTigerNamespace {
  ExampleComponent: MicrofrontendComponent<ExampleComponentProps>;
  ExamplePage: MicrofrontendComponent<ExamplePageProps>;
  subscribeToExampleMenuItem: SubscribeToExampleMenuItemFunction;
}

export const microfrontendUtils = initializeMicrofrontendWrapper<TemplanianTigerNamespace>(microfrontendId);

export const CodeLoader = createCodeLoader(microfrontendId);
export const ExampleComponent = createWrapperComponent(microfrontendId, (namespace: TemplanianTigerNamespace) => namespace.ExampleComponent);
export const ExamplePage = createWrapperComponent(microfrontendId, (namespace: TemplanianTigerNamespace) => namespace.ExamplePage);
export const useExampleMenu = createWrapperHook(microfrontendId, (namespace: TemplanianTigerNamespace) => namespace.subscribeToExampleMenuItem);
