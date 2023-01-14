import { FC } from "react";
import { FragmentType, gql, useFragment } from "../__generated__";

export const RATE_LIMIT_FRAGMENT = gql(`
  fragment RateLimitFragment on RateLimit {
    used
    limit
  }
`);

export type RateLimitProps = {
    readonly query: FragmentType<typeof RATE_LIMIT_FRAGMENT>;
    readonly className?: string;
};

export const RateLimit: FC<RateLimitProps> = ({ query, className }) => {
    const data = useFragment(RATE_LIMIT_FRAGMENT, query);
    return (
        <span className={className}>
            <span>{data.used}</span> / <span>{data.limit}</span>
        </span>
    );
}