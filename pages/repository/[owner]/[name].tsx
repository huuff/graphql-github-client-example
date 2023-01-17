import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { gql } from "../../../src/__generated__";
import { Converter as MdConverter } from "showdown";

export const GET_REPOSITORY_QUERY = gql(`
    query GetRepository($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
            name
            readme: object(expression: "master:README.md") {
                ... on Blob {
                    text
                }
            }
        }
    }
`)

const converter = new MdConverter();

const Repository = () => {
    const router = useRouter();
    const { owner, name } = router.query;

    const { data, error, loading } = useQuery(GET_REPOSITORY_QUERY, {
        variables: {
            owner: owner as string,
            name: name as string,
        }
    })

    // TODO: I need to narrow the type of readme to blob
    return (
        <Container className="d-flex flex-column align-items-center">
            <h1 className="display-3">{data?.repository?.name}</h1>
            {   data?.repository?.readme?.text && 
                <main 
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(data?.repository?.readme?.text) }} 
                    style={{maxWidth: "60rem"}}
                />
            }
        </Container>
    )
}

export default Repository;