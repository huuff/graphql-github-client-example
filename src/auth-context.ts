import { createContext } from "react";
import { useLocalStorage } from "usehooks-ts";

export type AuthState = {
    apiToken?: string;
    isLoggedIn: boolean;
    logIn: (token: string) => void;
    logOut: () => void;
}

const LOCAL_STORAGE_KEY = "gh-api-token";
export function useAuth(): AuthState {
    const [ tokenInLocalStorage, setTokenInLocalStorage ] = useLocalStorage<string | undefined>(LOCAL_STORAGE_KEY, undefined);

    return {
        apiToken: tokenInLocalStorage,
        isLoggedIn: !!tokenInLocalStorage,
        logIn: (token) => setTokenInLocalStorage(token),
        logOut: () => setTokenInLocalStorage(undefined),
    }
}

export const AuthContext = createContext<AuthState>({
    logIn: (token) => {},
    logOut: () => {},
    isLoggedIn: false,
});