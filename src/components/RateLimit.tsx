import { FC } from "react";
import { gql } from "../__generated__";

export const RATE_LIMIT_FRAGMENT = gql(`
  fragment RateLimitFragment on RateLimit {
    used
    limit
  }
`);

export type RateLimitProps = {
    readonly used: number;
    readonly limit: number;
    readonly className?: string;
};

export const RateLimit: FC<RateLimitProps> = ({ used, limit, className }) => {
    return (
        <span className={className}>
            <span>{used}</span> / <span>{limit}</span>
        </span>
    );
}