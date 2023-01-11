import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import RepositoryCard from "../src/components/RepositoryCard";
import { gql } from "../src/__generated__";

export const USER_QUERY = gql(`
    query GetUserData($login: String!) {
        user(login: $login) {
            bio
            name
            repositories(first: 10) {
                edges {
                    node {
                        ...RepositoryCard
                    }
                }
            }
        }
    }
`);

const Profile = () => {
    const router = useRouter();
    const { login } = router.query;


    const { data, loading, error } = useQuery(USER_QUERY, {
        variables: { login: login as string }
    });

    useEffect(() => {
        console.log(JSON.stringify(data));
    }, [data]);

    return (
        <Container>
            <h1 className="display-1">{ data?.user?.name }</h1>
            <p>{data?.user?.bio}</p>
            {
                data?.user?.repositories?.edges?.map((repository) => (
                    <RepositoryCard 
                        key={repository?.node}
                        resourcePath={repository.resourcePath} 
                        description={repository.description}
                    />
                ))
            }
        </Container>
    );
};

export default Profile;