import {observer} from "mobx-react-lite";
import GithubLogo from "./img/github-logo.png";
import {GITHUB_AUTH_URL} from "../../Configs/AuthConstants/Constants";

export const LoginPage = observer(() => {
    return (
        <div className="page">
            <main className="pageContent">
                <h1 className='pageContent__title'>Developer utilities</h1>
                <div className="social-login">
                    <a className="btn btn-block social-btn google" href={GITHUB_AUTH_URL}>
                        <img src={GithubLogo} alt="Google" /> Log in with Google
                    </a>
                </div>
            </main>
        </div>
    )
});