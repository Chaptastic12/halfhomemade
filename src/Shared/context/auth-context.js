import { createContext, useState } from 'react';

const AuthContext = createContext([{}, () => {}]);

const AuthProvider = props =>{

    let initialState = {};

    const [ userState, setUserState ] = useState(initialState);

    return (
        <AuthContext.Provider value = {{userState, setUserState}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext };

export default AuthProvider;