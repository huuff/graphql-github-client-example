import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";

export type AuthState = {
    apiToken?: string;
    logIn: (token: string) => void;
    logOut: () => void;
}

// TODO: Finish this
export function useAuth(localStorageKey: string): AuthState {
    const [ tokenInLocalStorage, setTokenInLocalStorage ] = useLocalStorage<string | undefined>(localStorageKey, undefined);

    return {
        apiToken: tokenInLocalStorage,
        logIn: (token) => setTokenInLocalStorage(token),
        logOut: () => setTokenInLocalStorage(undefined),
    }
}

export const AuthContext = createContext<AuthState>({
    logIn: (token) => {},
    logOut: ()
});