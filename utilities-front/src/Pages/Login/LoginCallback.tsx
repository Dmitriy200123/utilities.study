import {observer} from "mobx-react-lite";
import {Navigate, useSearchParams} from "react-router-dom";
import React from "react";
import {TokensStorage} from "../../AuthTokenStorages/TokensStorage";

export const LoginCallback = observer(() => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') as string;

    if (token) {
        TokensStorage.setAccessToken(token);
        return <Navigate to='/'/>;
    } else {
        return <Navigate to='/login'/>;
    }
});