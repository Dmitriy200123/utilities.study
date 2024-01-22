import Loader from './loader.gif';
import './LoadingAnimation.css';

export const LoadingAnimation = () => {
    return (
        <div className='loading'>
            <img src={Loader} width='800px' height='600px' alt='loading...'/>
        </div>
    );
};