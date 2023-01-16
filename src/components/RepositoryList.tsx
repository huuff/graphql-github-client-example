import { FC } from "react";
import { FragmentType, gql, useFragment } from "../__generated__";
import RepositoryCard, { REPOSITORY_CARD_FRAGMENT } from "./RepositoryCard";

// TODO: Parameters for pagination
// TODO: I'd like to have this on RepositoryOwner... but that hasn't been working for me
export const REPOSITORY_LIST_FRAGMENT = gql(`
    fragment RepositoryList on User {
        repositories(first: 10) {
            edges {
                node {
                    ...RepositoryCard
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`);

type RepositoryListProps = {
    readonly query: FragmentType<typeof REPOSITORY_LIST_FRAGMENT>;
}

export const RepositoryList: FC<RepositoryListProps> = ({ query }) => {
    const data = useFragment(REPOSITORY_LIST_FRAGMENT, query);

    return (
        <>
            {
                data?.repositories?.edges?.filter((r) => !!(r?.node))
                                                .map((r) => r?.node)
                                                .map((repository) => {
                                                    // TODO: This doesn't look ok
                                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                                    const key = useFragment(REPOSITORY_CARD_FRAGMENT, repository)!.resourcePath;
                                                    return (
                                                        <RepositoryCard
                                                            key={key}
                                                            className="my-2"
                                                            query={repository!}
                                                        />
                                                    );
                                                })
            }
        </>
    )
};