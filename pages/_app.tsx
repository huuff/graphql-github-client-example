import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from "@apollo/client/link/context";
import NavBar from '../src/components/Navbar';
import ClientSideOnly from '../src/components/util/ClientSideOnly';

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('gh-token')?.replaceAll(/"/g, "");
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <> 
      <ApolloProvider client={apolloClient}>
        <ClientSideOnly>
          <NavBar />
        </ClientSideOnly>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}
