import { FC } from "react";
import Card from "react-bootstrap/Card";
import { gql } from "../__generated__";
import { LanguageTag, LanguageTagProps } from "./LanguageTag";

export const REPOSITORY_CARD_FRAGMENT = gql(`
    fragment RepositoryCard on Repository {
        resourcePath
        description
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
    readonly className?: string;
};

const RepositoryCard: FC<RepositoryCardProps> = ({ resourcePath, description, languageTag, className }) => {
    return (
        <Card className={className}>
            <Card.Body>
                <Card.Title as="h5">{resourcePath}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>

            </Card.Body>
            <Card.Footer>
                <LanguageTag {...languageTag} />
            </Card.Footer>
        </Card>
    );
};

export default RepositoryCard;