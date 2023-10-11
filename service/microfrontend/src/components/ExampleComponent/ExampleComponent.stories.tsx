import type { Meta, StoryObj } from '@storybook/react';
import { ExampleComponent } from './ExampleComponent';

const meta: Meta<typeof ExampleComponent> = {
  component: ExampleComponent,
  args: {
    someProp: 'World',
  },
};

export default meta;
type Story = StoryObj<typeof ExampleComponent>;

export const Default: Story = {};
