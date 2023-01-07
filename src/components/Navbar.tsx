import { gql, useQuery } from "@apollo/client";
import { FC, FormEventHandler, useEffect } from "react"
import { useLocalStorage } from "usehooks-ts";

const GET_VIEWER_DATA = gql(`
  query GetViewerData {
    viewer {
      login
    }
  }
`);

// TODO: The response from useQuery is not typed!
const NavBar: FC = () => {
    const [apiToken, setApiToken] = useLocalStorage<string | undefined>("gh-token", undefined);
    const { data, loading } = useQuery(GET_VIEWER_DATA);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            token: { value: string };
        };
        console.log(`Token: ${target.token.value}`)

        setApiToken(target.token.value)
    }

    return (
        <nav>
            {
                (apiToken && data)
                    ? data.viewer.login 
                    : <form onSubmit={handleSubmit}>
                        <input name="token" />
                        <button>Log in</button>
                    </form>
            }
        </nav>
    );
}

export default NavBar;