import { FC } from "react";
import Card from "react-bootstrap/Card";
import { gql } from "../__generated__";

export const REPOSITORY_CARD_FRAGMENT = gql(`
    fragment RepositoryCard on Repository {
        resourcePath
        description
    }
`); 

type RepositoryCardProps = {
    readonly resourcePath: string;
    readonly description: string;
    readonly className?: string;
};

const RepositoryCard: FC<RepositoryCardProps> = ({ resourcePath, description, className }) => {
    return (
        <Card className={className}>
            <Card.Body>
                <Card.Title>{resourcePath}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default RepositoryCard;