import type { Meta, StoryObj } from '@storybook/react';

import { ExamplePage } from './ExamplePage';
import { mockAppAxolotlApi } from '@meisterplan/appaxolotl-api';

mockAppAxolotlApi();

const meta: Meta<typeof ExamplePage> = {
  component: ExamplePage,
  args: {},
};

export default meta;
type Story = StoryObj<typeof ExamplePage>;

export const Default: Story = {};
