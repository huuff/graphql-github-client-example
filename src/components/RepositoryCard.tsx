import { FC } from "react";
import Card from "react-bootstrap/Card";
import { FragmentType, gql, useFragment } from "../__generated__";
import { LanguageTag } from "./LanguageTag";
import { StargazersTag } from "./StargazersTag";


export const REPOSITORY_CARD_FRAGMENT = gql(`
    fragment RepositoryCard on Repository {
        resourcePath
        description
        ...StargazersTag
        languages(first: 1, orderBy: { field: SIZE, direction: DESC}) {
            edges {
                node {
                    ...LanguageTag
                }
            }
        }
    }
`); 

type RepositoryCardProps = {
    readonly className?: string;
    readonly query: FragmentType<typeof REPOSITORY_CARD_FRAGMENT>;
};

const RepositoryCard: FC<RepositoryCardProps> = ({ query, className }) => {
    const data = useFragment(REPOSITORY_CARD_FRAGMENT, query);

    const mainLanguage = data.languages?.edges?.[0]?.node;

    return (
        <Card className={className}>
            <Card.Body>
                <Card.Title as="h5">{data.resourcePath}</Card.Title>
                <Card.Text>
                    {data.description ?? ""}
                </Card.Text>

            </Card.Body>
            <Card.Footer className="d-flex flex-row gap-4 align-items-center">
                { mainLanguage && <LanguageTag query={mainLanguage} /> }
                <StargazersTag query={data} />
            </Card.Footer>
        </Card>
    );
};

export default RepositoryCard;