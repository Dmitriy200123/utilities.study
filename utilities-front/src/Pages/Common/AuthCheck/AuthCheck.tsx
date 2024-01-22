import {Navigate} from "react-router-dom";
import * as React from "react";
import {ReactElement} from "react";
import {LoadingAnimation} from "../LoadingAnimation/LoadingAnimation";
import {useAuth} from "../Hooks/useAuth";

export const AuthCheck: React.FC<{ children: ReactElement }> = ({children}) => {
    const authInfo = useAuth();
    if (authInfo.isLoading)
        return <LoadingAnimation/>

    return authInfo.isAuthorized ? children : <Navigate to="/login"/>;
};