import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { gql } from "../__generated__";

export const STARGAZERS_TAG_FRAGMENT = gql(`
    fragment StargazersTag on Repository {
        stargazerCount
        viewerHasStarred
    }
`)

export type StargazersTagProps = {
    readonly stargazerCount: number;
    readonly viewerHasStarred: boolean;
}

// TODO: Yellow star when viewerHasStarred
// TODO: Clicking toggles starred
export const StargazersTag: FC<StargazersTagProps> = ({ stargazerCount, viewerHasStarred }) => {
    return (
        <span>
            <span className="me-1">{stargazerCount}</span><FontAwesomeIcon icon={faStar} />
        </span>
    );
}