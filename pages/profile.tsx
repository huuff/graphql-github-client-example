import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { RepositoryList } from "../src/components/RepositoryList";
import { gql } from "../src/__generated__";

export const USER_QUERY = gql(`
    query GetUserData($login: String!) {
        user(login: $login) {
            bio
            name
            ...RepositoryList
        }
    }
`);

const Profile = () => {
    const router = useRouter();
    const { login } = router.query;


    const { data, loading, error } = useQuery(USER_QUERY, {
        variables: { 
            login: login as string,
        }
    });


    useEffect(() => {
        console.log(`Repositories data: ${JSON.stringify(data?.user)}`);
    }, [data]);

    return (
        <Container>
            <h1 className="display-1">{data?.user?.name}</h1>
            <p>{data?.user?.bio}</p>
            { data?.user && <RepositoryList query={data.user} /> }
        </Container>
    );
};

export default Profile;