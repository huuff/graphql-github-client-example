import Head from 'next/head'
import Image from 'next/image'
import { FC } from 'react';
import { gql } from "../src/__generated__/gql";
import { useQuery } from "@apollo/client";

type HomeProps = {
  readonly apiToken: string;
};

const Home: FC<HomeProps> = ({ apiToken }) => {
  return (
    <>
      <Head>
        <title>Github GraphQL Client</title>
        <meta name="description" content="Github GraphQL Client" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        
      </main>
    </>
  )
}

export default Home