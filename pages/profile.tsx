import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import RepositoryCard, { REPOSITORY_CARD_FRAGMENT } from "../src/components/RepositoryCard";
import { gql, useFragment } from "../src/__generated__";

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
            <h1 className="display-1">{data?.user?.name}</h1>
            <p>{data?.user?.bio}</p>
            {
                data?.user?.repositories?.edges?.filter((r) => !!(r?.node))
                                                .map((r) => r?.node)
                                                .map((repository) => {
                                                    // TODO: This doesn't look ok
                                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                                    const key = useFragment(REPOSITORY_CARD_FRAGMENT, repository)!.resourcePath;
                                                    return (
                                                        <RepositoryCard
                                                            key={key}
                                                            className="my-2"
                                                            query={repository!}
                                                        />
                                                    );
                                                })
            }
        </Container>
    );
};

export default Profile;