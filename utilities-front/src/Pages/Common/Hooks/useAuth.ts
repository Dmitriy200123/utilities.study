import {useEffect, useState} from "react";
import {TokensStorage} from "../../../AuthTokenStorages/TokensStorage";
import {UsersTransport} from "../../../UserStores/Transports/UsersTransport";

interface IAuthInfo {
    isLoading: boolean,
    isAuthorized: boolean
}

export const useAuth: () => IAuthInfo = () => {
    const [isLoading, setLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = TokensStorage.accessToken;
        if (!token) {
            setIsAuthorized(false);
        }

        UsersTransport
            .getCurrentUser()
            .then(() => {
                setIsAuthorized(true);
            })
            .catch(async () => {
                setIsAuthorized(false);
                return;
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        isLoading: isLoading,
        isAuthorized: isAuthorized
    }
};