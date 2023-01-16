import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { FragmentType, gql, useFragment } from "../__generated__";
import { useMutation } from "@apollo/client";
import { StargazersTagFragment } from "../__generated__/graphql";

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

function buildOptimisticResponse(
    { id, stargazerCount }: StargazersTagFragment,
    mutation: "add" | "remove"
) {
    switch (mutation) {
        case "add":
            return {
                addStar: {
                    starrable: {
                        id,
                        stargazerCount: stargazerCount + 1,
                        viewerHasStarred: true,
                    }
                }
            }
        case "remove":
            return {
                removeStar: {
                    starrable: {
                        id,
                        stargazerCount: stargazerCount - 1,
                        viewerHasStarred: false,
                    }
                }
            }
    }
}

export type StargazersTagProps = {
    readonly query: FragmentType<typeof STARGAZERS_TAG_FRAGMENT>;
}

// TODO: I'm not sure the optimistic response is working since it still feels slow...
// maybe it's not getting the stargazer count from the cache?
export const StargazersTag: FC<StargazersTagProps> = ({ query }) => {
    const stargazer = useFragment(STARGAZERS_TAG_FRAGMENT, query);
    const { id, stargazerCount, viewerHasStarred } = stargazer;
    const [addStar] = useMutation(ADD_STAR_MUTATION);
    const [removeStar] = useMutation(REMOVE_STAR_MUTATION);
    return (
        <span>
            <FontAwesomeIcon
                icon={viewerHasStarred ? faSolidStar : faRegularStar}
                onClick={() => viewerHasStarred
                    ? removeStar({
                        variables: { id },
                        optimisticResponse: buildOptimisticResponse(stargazer, "remove")
                    })
                    : addStar({
                        variables: { id },
                        optimisticResponse: buildOptimisticResponse(stargazer, "add")
                    })}
                style={{
                    color: viewerHasStarred ? "yellow" : "black",
                    cursor: "pointer",
                }}
            />
            <span className="ms-1">{stargazerCount}</span>
        </span>
    );
}