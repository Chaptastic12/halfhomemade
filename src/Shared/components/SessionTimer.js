import { useState, useEffect, useContext  } from 'react';

import moment from 'moment';
import { useHistory } from 'react-router-dom';

import PopupModal from './UI Elements/Modal/Modal';

import { AuthContext } from '../context/auth-context';

const SessionTimer = props => {

    const { logoutUser } = useContext(AuthContext);
    const history = useHistory();

    const [ runningTimer, setRunningTimer ] = useState(false);
    const [ showWarning, setShowWarning ] = useState(false);

    let difference;
    const trackSessionTime = () =>{
        const sessionStart = window.sessionStorage.getItem('sessionStart');

        if(sessionStart !== null){
            const loginTime = sessionStart;
            let timeNow = moment();
            difference = (moment(timeNow.diff(loginTime)) / 1000 / 60);

            //Warn our user that logout is approaching
            if(difference >= 10 && difference <= 11){
                setShowWarning(true);
            }
            //Log them out before the server does
            if(difference >= 11){
                setRunningTimer(false);
                setShowWarning(false);
                setTimeout(() =>{ logoutUser() });
            }
        } else {
           //No session active, shouldn't do anything but continue to check
        }
    }

    useEffect(() => {
        setRunningTimer(true);
    }, []);

    useEffect(() => { 
        if(!runningTimer){ return; } 

        const intervalId = setInterval(() => { trackSessionTime(); }, 60000 ); 

        return () => { clearInterval(intervalId); 
        }
        // eslint-disable-next-line
    }, [runningTimer]);

    const logOutAndRedirectTologin = () =>{
        setShowWarning(false);
        logoutUser();
        //Need to wait for the modal to properly close
        setTimeout(() =>{ history.push('/login') }, 1000)
    }

    return <div>
            <PopupModal show={showWarning} body='Your session with the server is about to end, please finish what you are doing and login again. You will be auto logged out;' title='Session is about to end' handleClose={() => setShowWarning(false)}
                directTo='Login Page' directToFunction={ () => logOutAndRedirectTologin() } directToRoute={'/login'} />
            { props.children }
        </div>;
}

export default SessionTimer;

