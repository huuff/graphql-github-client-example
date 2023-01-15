import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FragmentType, gql, useFragment } from "../__generated__";
import { useMutation } from "@apollo/client";

export const STARGAZERS_TAG_FRAGMENT = gql(`
    fragment StargazersTag on Repository {
        id
        stargazerCount
        viewerHasStarred
    }
`)

export const ADD_STAR_MUTATION = gql(`
    mutation AddStar($id: ID!) {
        addStar(input: { starrableId: $id }) {
            starrable {
                id
                stargazerCount
                viewerHasStarred
            }
        }
    }
`);

export const REMOVE_STAR_MUTATION = gql(`
    mutation RemoveStar($id: ID!) {
        removeStar(input: { starrableId: $id }) {
            starrable {
                id
                stargazerCount
                viewerHasStarred
            }
        }
    }
`);

export type StargazersTagProps = {
    readonly query: FragmentType<typeof STARGAZERS_TAG_FRAGMENT>;
}

export const StargazersTag: FC<StargazersTagProps> = ({ query }) => {
    const { stargazerCount, viewerHasStarred, id } = useFragment(STARGAZERS_TAG_FRAGMENT, query);
    const [addStar] = useMutation(ADD_STAR_MUTATION);
    const [removeStar] = useMutation(REMOVE_STAR_MUTATION);
    return (
        <span>
            <span className="me-1">{stargazerCount}</span>
            <FontAwesomeIcon
                icon={faStar}
                onClick={() => viewerHasStarred
                    ? removeStar({
                        variables: { id },
                        optimisticResponse: {
                            removeStar: {
                                starrable: {
                                    id,
                                    stargazerCount: stargazerCount - 1,
                                    viewerHasStarred: false,
                                }
                            }
                        }
                    })
                    : addStar({
                        variables: { id },
                        optimisticResponse: {
                            addStar: {
                                starrable: {
                                    id,
                                    stargazerCount: stargazerCount + 1,
                                    viewerHasStarred: true,
                                }
                            }
                        }
                    })}
                style={{
                    color: viewerHasStarred ? "yellow" : "black",
                    cursor: "pointer",
                }}
            />
        </span>
    );
}