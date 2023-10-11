import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['./.apollo/federated-schema.graphqls'],
  documents: 'src/**/*.{ts,tsx}',
  generates: {
    'src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
    },
  },
  config: {
    namingConvention: {
      typeNames: 'change-case#titleCase',
      enumValues: 'change-case-all#upperCase',
    },
    scalars: {
      ISO8601Date: 'ISO8601Date',
      ISO8601DateTime: 'ISO8601DateTime',
    },
  },
};

export default config;
