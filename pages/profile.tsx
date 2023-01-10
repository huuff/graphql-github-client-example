import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { gql } from "../src/__generated__";

export const USER_QUERY = gql(`
    query GetUserData($login: String!) {
        user(login: $login) {
            bio
            name
        }
    }
`);

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
        </Container>
    );
};

export default Profile;