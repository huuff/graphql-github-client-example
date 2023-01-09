import { useQuery } from "@apollo/client";
import { FC, FormEventHandler } from "react"
import { useLocalStorage } from "usehooks-ts";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { gql } from "../__generated__/gql";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";

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
            <Container fluid>
                <BootstrapNavbar.Collapse className="justify-content-end">
                    {
                        (apiToken && data)
                            ? (
                                <>
                                    <NavDropdown title={
                                        // TODO: Use width and height instead of inline style
                                            <Image
                                            src={data.viewer.avatarUrl}
                                            alt="avatar"
                                            roundedCircle
                                            style={{ maxWidth: "30px" }}
                                        />
                                    }
                                        align="end"
                                    >
                                            <p className="px-1">
                                                Signed in as <a href="#" className="fw-bolder text-secondary">{data.viewer.login}</a>
                                            </p>
                                            <NavDropdown.Divider />

                                            <NavDropdown.Item onClick={() => setApiToken(undefined)}>
                                                Log out
                                            </NavDropdown.Item>
                                    </NavDropdown>

                                </>
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