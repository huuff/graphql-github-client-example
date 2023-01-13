import { FC } from "react";
import Card from "react-bootstrap/Card";
import { gql } from "../__generated__";
import { LanguageTag, LanguageTagProps } from "./LanguageTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export const REPOSITORY_CARD_FRAGMENT = gql(`
    fragment RepositoryCard on Repository {
        resourcePath
        description
        stargazerCount
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
    readonly stargazerCount: number;
    readonly languageTag: LanguageTagProps;
    readonly className?: string;
};

const RepositoryCard: FC<RepositoryCardProps> = ({ resourcePath, description, stargazerCount, languageTag, className }) => {
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
                <span>
                    {/* TODO: This in its own component */}
                    <span className="me-1">{stargazerCount}</span><FontAwesomeIcon icon={faStar}/>
                </span>
            </Card.Footer>
        </Card>
    );
};

export default RepositoryCard;