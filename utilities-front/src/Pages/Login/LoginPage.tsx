import {observer} from "mobx-react-lite";
import {GithubLogo} from "./img/GithubLogo";
import {GITHUB_AUTH_URL} from "../../Configs/AuthConstants/Constants";
import './LoginPageStyle.css';

export const LoginPage = observer(() => {
    return (
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
    )
});