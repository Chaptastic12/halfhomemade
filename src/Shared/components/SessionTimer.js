import { useState, useEffect  } from 'react';

import moment from 'moment';

import PopupModal from './UI Elements/Modal/Modal';

const SessionTimer = props => {

    const [ runTimer, setRunTimer ] = useState(false);
    const [ message, setMessage ] = useState(false);

    useEffect(() => {
        setRunTimer(true);
    }, []);

    if(runTimer){
        const sessionTimer = setInterval(() =>{
            const sessionStart = window.sessionStorage.getItem('sessionStart');

            if(sessionStart !== null){
                const loginTime = sessionStart;
                let timeNow = moment();
                let difference = (moment(timeNow.diff(loginTime)) / 1000 / 60);

                if(difference >= 9 && message !== true){
                    clearInterval(sessionTimer);
                    setRunTimer(false);
                    setMessage(true);
                }
            } else {
                console.log('no session active');
            }
        }, 60000);
    } 

    return <div>
            <PopupModal show={message} body='Your session with the server is about to end, please re-login soon.' title='Session is about to end' handleClose={() => setMessage(false)}/>
            { props.children }
        </div>;
}

export default SessionTimer;

