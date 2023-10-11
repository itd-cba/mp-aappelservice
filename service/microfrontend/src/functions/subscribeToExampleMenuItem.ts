import { SubscribeToExampleMenuItemFunction } from '@meisterplan/templaniantiger-wrapper';

export const subscribeToExampleMenuItem: SubscribeToExampleMenuItemFunction = (update) => {
  update({ 'data-tid': 'example-menu-item', caption: 'Test-Item' });
  return () => {};
};
