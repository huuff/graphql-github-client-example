import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import RepositoryCard, { REPOSITORY_CARD_FRAGMENT } from "../src/components/RepositoryCard";
import { gql } from "../src/__generated__";

export const USER_QUERY = gql`
    query GetUserData($login: String!) {
        user(login: $login) {
            bio
            name
            repositories(first: 10) {
                edges {
                    node {
                        ... RepositoryCard
                    }
                }
            }
        }
    }
    ${REPOSITORY_CARD_FRAGMENT}
`;

const Profile = () => {
    const router = useRouter();
    const { login } = router.query;


    const { data, loading } = useQuery(USER_QUERY, {
        variables: { login: login as string }
    });

    return (
        <Container>
            <h1 className="display-1">{ data?.user?.name }</h1>
            <p>{data?.user?.bio}</p>
            {
                data?.user?.repositories?.edges?.map((repository) => (
                    <RepositoryCard 
                        key={repository.resourcePath}
                        resourcePath={repository.resourcePath} 
                        description={repository.description}
                    />
                ))
            }
        </Container>
    );
};

export default Profile;