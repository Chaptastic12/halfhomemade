import { useState, useEffect  } from 'react';

import moment from 'moment';

import PopupModal from './UI Elements/Modal/Modal';

const SessionTimer = props => {

    const [ runningTimer, setRunningTimer ] = useState(false);
    const [ showWarning, setShowWarning ] = useState(false);

    let difference;
    const trackSessionTime = () =>{
        const sessionStart = window.sessionStorage.getItem('sessionStart');

        if(sessionStart !== null){
            const loginTime = sessionStart;
            let timeNow = moment();
            difference = (moment(timeNow.diff(loginTime)) / 1000 / 60);

            if(difference >= 1){
                setRunningTimer(false);
                setShowWarning(true);
            }
        } else {
            console.log('no session active');
        }
    }

    useEffect(() => {
        setRunningTimer(true);
    }, []);

    useEffect( () => { 
        if(!runningTimer){ return; } 

        const intervalId = setInterval(() => { trackSessionTime(); }, 60000 ); 

        return () => { clearInterval(intervalId); 
        }
        // eslint-disable-next-line
    }, [runningTimer]);

    return <div>
            <PopupModal show={showWarning} body='Your session with the server is about to end, please finish what you are doing and login again.' title='Session is about to end' handleClose={() => setShowWarning(false)}/>
            { props.children }
        </div>;
}

export default SessionTimer;

