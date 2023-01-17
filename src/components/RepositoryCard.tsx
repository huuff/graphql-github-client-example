import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import Card from "react-bootstrap/Card";
import { FragmentType, gql, useFragment } from "../__generated__";
import { LanguageTag } from "./LanguageTag";
import { StargazersTag } from "./StargazersTag";


export const REPOSITORY_CARD_FRAGMENT = gql(`
    fragment RepositoryCard on Repository {
        resourcePath
        description
        updatedAt
        isArchived
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

function formatDate(date: string) {
    const options = { year: "numeric", month: "long", day: "numeric"} as const;
    return (new Date(date)).toLocaleDateString("en-US", options);
}

type RepositoryCardProps = {
    readonly className?: string;
    readonly query: FragmentType<typeof REPOSITORY_CARD_FRAGMENT>;
};

const RepositoryCard: FC<RepositoryCardProps> = ({ query, className }) => {
    const data = useFragment(REPOSITORY_CARD_FRAGMENT, query);

    const mainLanguage = data.languages?.edges?.[0]?.node;

    return (
        <Card className={className} style={{width: "42rem"}}>
            <Card.Body>
                <Card.Title as="h5">{data.resourcePath}</Card.Title>
                <Card.Text>
                    {data.description ?? ""}
                </Card.Text>

            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-between align-items-center">
                <div  className="d-flex flex-row gap-4 align-items-center" >
                    { mainLanguage && <LanguageTag query={mainLanguage} /> }
                    <StargazersTag query={data} />
                    <span className="text-muted">Updated {formatDate(data.updatedAt)}</span>
                </div>
                <div className="d-flex flex-row gap-4 align-items-center">
                    {data.isArchived && <FontAwesomeIcon icon={faBoxArchive} /> }
                </div>
            </Card.Footer>
        </Card>
    );
};

export default RepositoryCard;