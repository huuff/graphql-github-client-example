import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import Navbar from '../src/components/Navbar';
import ClientSideOnly from '../src/components/util/ClientSideOnly';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext, useAuth } from '../src/auth-context';

export default function App({ Component, pageProps }: AppProps) {
  const auth = useAuth();


  const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql"
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: auth.apiToken ? `Bearer ${auth.apiToken}` : "",
      }
    };
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            repositories: {
              keyArgs: false,
              merge(existing = [], incoming) {
                return incoming
              }
            }
          }
        }
      }
    }),
    link: authLink.concat(httpLink),
    connectToDevTools: true,
  });


  return (
    <>
      <AuthContext.Provider value={auth}>
        <ApolloProvider client={apolloClient}>
          <ClientSideOnly>
            <Navbar />
          </ClientSideOnly>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthContext.Provider>
    </>
  )
}
