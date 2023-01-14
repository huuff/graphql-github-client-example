import { useQuery } from "@apollo/client";
import { FC, FormEventHandler, useContext } from "react"
import BootstrapNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { gql } from "../__generated__/gql";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../auth-context";
import Link from "next/link";
import { RateLimit } from "./RateLimit";

export const GET_VIEWER_DATA = gql(`
  query GetViewerData {
    viewer {
      login
      avatarUrl
    }
    rateLimit {
        ...RateLimitFragment
    }
  }
`);

const Navbar: FC = () => {
    const { isLoggedIn, logIn, logOut } = useContext(AuthContext);
    const { data, loading } = useQuery(GET_VIEWER_DATA); // TODO: Use loading

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            token: { value: string };
        };

        logIn(target.token.value)
    }

    const myProfileLink = data && {
        pathname: "/profile",
        query: { login: data.viewer.login },
    };

    return (
        <BootstrapNavbar bg="light" expand="lg">
            <Container fluid>
                <BootstrapNavbar.Collapse className="justify-content-end">
                    {
                        (isLoggedIn && data)
                            ? (
                                <>
                                    {
                                        data.rateLimit &&
                                            <RateLimit
                                                query={data.rateLimit}
                                                className="me-3"
                                            />
                                    }
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
                                            Signed in as <Link href={myProfileLink!} className="fw-bolder text-secondary">{data.viewer.login}</Link>
                                        </p>
                                        <NavDropdown.Divider />

                                        <Link href={myProfileLink!} passHref legacyBehavior>
                                            <NavDropdown.Item>My profile</NavDropdown.Item>
                                        </Link>

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