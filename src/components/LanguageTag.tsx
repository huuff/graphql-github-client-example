import { FC } from "react";
import { FragmentType, gql, useFragment } from "../__generated__";

export const LANGUAGE_TAG_FRAGMENT = gql(`
    fragment LanguageTag on Language {
        name
        color
    }
`)

export type LanguageTagProps = {
    readonly query: FragmentType<typeof LANGUAGE_TAG_FRAGMENT>;
}

export const LanguageTag: FC<LanguageTagProps> = ({ query }) => {
    const data = useFragment(LANGUAGE_TAG_FRAGMENT, query);
    return (
        <span className="d-flex-inline flex-row align-items-center">
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" className="me-1">
                <circle cx="5" cy="5" r="5" fill={data.color || ""} />
            </svg>
            <span>{data.name}</span>
        </span>
    );
}