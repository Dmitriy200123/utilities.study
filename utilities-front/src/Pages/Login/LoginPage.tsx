import {observer} from "mobx-react-lite";
import {GithubLogo} from "./img/GithubLogo";
import {GITHUB_AUTH_URL} from "../../Configs/AuthConstants/Constants";
import './LoginPageStyle.css';
import {useAuth} from "../Common/Hooks/useAuth";
import {LoadingAnimation} from "../Common/LoadingAnimation/LoadingAnimation";
import {Navigate} from "react-router-dom";
import * as React from "react";

export const LoginPage = observer(() => {
    const authInfo = useAuth();
    if (authInfo.isLoading)
        return <LoadingAnimation/>

    return authInfo.isAuthorized
        ? <Navigate to="/"/>
        : (
            <div className="page">
                <main className="pageContent">
                    <h1 className='pageContent__title loginPageContent__title'>Developer utilities</h1>
                    <div className="githubAuth">
                        <label className="githubAuth__label">Log in with Github</label>
                        <a className="githubAuth__link" href={GITHUB_AUTH_URL}>
                            <GithubLogo/>
                        </a>
                    </div>
                </main>
            </div>
        );
});