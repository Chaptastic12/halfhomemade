import { createContext, useState } from 'react';
import { useHttp } from '../../Shared/hooks/http-hook';

const AuthContext = createContext([{}, () => {}]);

const AuthProvider = props =>{

    let initialState = {};

    const [ userState, setUserState ] = useState(initialState);
    const { sendRequest } = useHttp();

    const logoutUser = () => {

        const sendToServer = async () => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'auth/logout', 'POST', 'include', { 'Content-Type': 'application/json', Authorization: `Bearer ${userState.token}`}, null, true);
                if(responseData){
                    setUserState(oldValues => {
                        return { ...oldValues, details : undefined, token: null, isAdmin: null }
                    })
                    window.localStorage.setItem('logout', Date.now());
                }
            } catch(err){
                //Errors handled in hook
            }
        }
        sendToServer();
    }

    return (
        <AuthContext.Provider value = {{userState, setUserState, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext };

export default AuthProvider;