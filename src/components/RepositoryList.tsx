import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Pagination } from "react-bootstrap";
import { FragmentType, gql, useFragment } from "../__generated__";
import RepositoryCard, { REPOSITORY_CARD_FRAGMENT } from "./RepositoryCard";

// TODO: I'd like to have this on RepositoryOwner... but that hasn't been working for me
export const REPOSITORY_LIST_FRAGMENT = gql(`
    fragment RepositoryList on User {
        repositories(first: $first, after: $after, before: $before, orderBy: { field: UPDATED_AT, direction: DESC}) {
            edges {
                node {
                    ...RepositoryCard
                }
            }
            pageInfo {
                hasNextPage
                endCursor
                hasPreviousPage
                startCursor
            }
        }
    }
`);

type RepositoryListProps = {
    readonly query: FragmentType<typeof REPOSITORY_LIST_FRAGMENT>;
    readonly nextPage: () => void;
    readonly previousPage: () => void;
}

export const RepositoryList: FC<RepositoryListProps> = ({ query, nextPage, previousPage, }) => {
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
            <Pagination>
                <Pagination.Prev onClick={previousPage} className="d-flex flex-row align-items-center" disabled={!data.repositories.pageInfo.hasPreviousPage}>
                    <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                    Previous page
                </Pagination.Prev>
                <Pagination.Next onClick={nextPage} className="d-flex flex-row align-items-center gap-2" disabled={!data.repositories.pageInfo.hasNextPage}>
                    Next page
                    <FontAwesomeIcon icon={faChevronRight} className="ms-2"/>
                </Pagination.Next>
            </Pagination>
        </>
    )
};