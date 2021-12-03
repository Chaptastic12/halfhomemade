import { createContext, useState } from 'react';

const AuthContext = createContext([{}, () => {}]);

const AuthProvider = props =>{

    let initialState = {};

    const [ userState, setUserState ] = useState(initialState);

    const logoutUser = () => {
        fetch(process.env.REACT_APP_API_ENDPOINT + 'auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'applicaiton/json',
                Authorization: `Bearer ${userState.token}`
            }
        })
        .then( async response => {
            setUserState(oldValues => {
                return { ...oldValues, details : undefined, token: null }
            })
            console.log('successful logout');
            window.localStorage.setItem('logout', Date.now());
        })
    }
    return (
        <AuthContext.Provider value = {{userState, setUserState, logoutUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext };

export default AuthProvider;