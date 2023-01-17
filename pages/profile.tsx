import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { RepositoryList, REPOSITORY_LIST_FRAGMENT } from "../src/components/RepositoryList";
import { gql, useFragment } from "../src/__generated__";

export const USER_QUERY = gql(`
    query GetUserData($login: String!, $first: Int = 10, $after: String, $before: String) {
        user(login: $login) {
            id
            bio
            name
            ...RepositoryList
        }
    }
`);

const Profile = () => {
    const router = useRouter();
    const { login } = router.query;

    const [ pageSize, setPageSize ] = useState(10);


    const { data, loading, error, fetchMore } = useQuery(USER_QUERY, {
        variables: { 
            login: login as string,
            first: pageSize,
        }
    });

    const repositoryList = useFragment(REPOSITORY_LIST_FRAGMENT, data?.user);

    const nextPage = () => {
        if (repositoryList) {
            console.log("Fetching more!");
            fetchMore({
                variables: {
                    after: repositoryList.repositories.pageInfo.endCursor,
                    before: undefined,
                }
            })
        }
    }

    const previousPage = () => {
        if (repositoryList) {
            fetchMore({
                variables: {
                    after: undefined,
                    before: repositoryList.repositories.pageInfo.startCursor,
                }
            })
        }
    }

    return (
        <Container>
            <h1 className="display-1">{data?.user?.name}</h1>
            <p>{data?.user?.bio}</p>
            { data?.user && <RepositoryList query={data.user} nextPage={nextPage} previousPage={previousPage}/> }
        </Container>
    );
};

export default Profile;