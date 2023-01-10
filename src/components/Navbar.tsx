import { useQuery } from "@apollo/client";
import { FC, FormEventHandler, useContext } from "react"
import { useLocalStorage } from "usehooks-ts";
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { gql } from "../__generated__/gql";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../auth-context";

export const GET_VIEWER_DATA = gql(`
  query GetViewerData {
    viewer {
      login
      avatarUrl
    }
  }
`);

const Navbar: FC = () => {
    const { isLoggedIn, logIn, logOut } = useContext(AuthContext);
    const { data, loading } = useQuery(GET_VIEWER_DATA);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            token: { value: string };
        };

        logIn(target.token.value)
    }

    return (
        <BootstrapNavbar bg="light" expand="lg">
            <Container fluid>
                <BootstrapNavbar.Collapse className="justify-content-end">
                    {
                        (isLoggedIn && data)
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

                                            <NavDropdown.Item onClick={logOut}>
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