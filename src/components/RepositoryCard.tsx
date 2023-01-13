import { FC } from "react";
import Card from "react-bootstrap/Card";
import { gql } from "../__generated__";
import { LanguageTag, LanguageTagProps } from "./LanguageTag";
import { StargazersTag, StargazersTagProps } from "./StargazersTag";


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
    readonly resourcePath: string;
    readonly description: string;
    readonly languageTag: LanguageTagProps;
    readonly stargazersTag: StargazersTagProps;
    readonly className?: string;
};

const RepositoryCard: FC<RepositoryCardProps> = ({ resourcePath, description, stargazersTag, languageTag, className }) => {
    return (
        <Card className={className}>
            <Card.Body>
                <Card.Title as="h5">{resourcePath}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>

            </Card.Body>
            <Card.Footer className="d-flex flex-row gap-4 align-items-center">
                <LanguageTag {...languageTag} />
                <StargazersTag {...stargazersTag} />
            </Card.Footer>
        </Card>
    );
};

export default RepositoryCard;