import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { gql } from "../src/__generated__";

export const USER_QUERY = gql(`
    query GetUserData($user: String!) {
        user(login: $user) {
            bio
        }
    }
`);

const Profile = () => {
    const router = useRouter();
    const { login } = router.query;


    const { data, loading } = useQuery(USER_QUERY, {
        variables: { user: login as string }
    });

    return (
        <div>
            <p>{ data?.user?.bio }</p>
        </div>
    );
};

export default Profile;