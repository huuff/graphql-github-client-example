import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      }
    }
  ],
  documents: [
    "src/**/*.tsx",
    "pages/**/*.tsx",
  ],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      }
    },
  },
  ignoreNoDocuments: true
};

export default config;
