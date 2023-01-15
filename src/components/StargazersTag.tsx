import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FragmentType, gql, useFragment } from "../__generated__";

export const STARGAZERS_TAG_FRAGMENT = gql(`
    fragment StargazersTag on Repository {
        stargazerCount
        viewerHasStarred
    }
`)

export type StargazersTagProps = {
    readonly query: FragmentType<typeof STARGAZERS_TAG_FRAGMENT>;
}

// TODO: Clicking toggles starred
export const StargazersTag: FC<StargazersTagProps> = ({ query }) => {
    const stargazers = useFragment(STARGAZERS_TAG_FRAGMENT, query);
    return (
        <span>
            <span className="me-1">{stargazers.stargazerCount}</span>
            <FontAwesomeIcon 
                icon={faStar} 
                style={{ 
                    color: stargazers.viewerHasStarred ? "yellow" : "black",
                    cursor: "pointer",
                }} 
            />
        </span>
    );
}