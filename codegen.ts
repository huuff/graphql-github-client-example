import { CodegenConfig } from '@graphql-codegen/cli';


const config: CodegenConfig = {
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      }
    }
  ],
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};


export default config;
