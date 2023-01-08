import { useQuery } from "@apollo/client";
import { FC, FormEventHandler } from "react"
import { useLocalStorage } from "usehooks-ts";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { gql } from "../__generated__/gql";

export const GET_VIEWER_DATA = gql(`
  query GetViewerData {
    viewer {
      login
      avatarUrl
    }
  }
`);

const Navbar: FC = () => {
    const [apiToken, setApiToken] = useLocalStorage<string | undefined>("gh-token", undefined);
    const { data, loading } = useQuery(GET_VIEWER_DATA);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            token: { value: string };
        };

        setApiToken(target.token.value)
    }

    return (
        <BootstrapNavbar bg="light" expand="lg">
            <Container>
                <BootstrapNavbar.Collapse className="justify-content-end">
                    {
                        (apiToken && data)
                            ? (
                                <BootstrapNavbar.Text>
                                    Signed in as: <a href="#login">{data.viewer.login}</a>
                                </BootstrapNavbar.Text>
                            )
                            : <form onSubmit={handleSubmit}>
                                <input name="token" />
                                <button>Log in</button>
                            </form>
                    }
                </BootstrapNavbar.Collapse>

            </Container>
        </BootstrapNavbar >
    );
}

export default Navbar;