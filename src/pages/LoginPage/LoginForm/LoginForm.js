import React, { useState, useContext, useEffect } from 'react';

import moment from 'moment';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { encryptData } from '../../../Shared/utils/util';

import { AuthContext } from '../../../Shared/context/auth-context'
import { useHttp } from '../../../Shared/hooks/http-hook';

import './LoginForm.css';

const LoginForm = props =>{

    const [ localError, setLocalError ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ verifyPassword, setVerifyPassword ] = useState('');
    const [ username, setUsername ] = useState('');

    const { submitting, error, sendRequest } = useHttp();

    const { userState, setUserState } = useContext(AuthContext);
    const history = useHistory();

    useEffect(()=>{
        if(userState.token){ history.goBack(); }
    },[history, userState])

    const submitFormHandler = e =>{
        e.preventDefault()

        let registerOrLogin;
        let JSONbody;
        //If we are logging in...
        if(props.isLogin){
            registerOrLogin = 'auth/login';
            JSONbody = { username, password }

        } else {
            //Ensure passwords match. If they do not, kick them out
            if(password !== verifyPassword){
                setLocalError('Passwords do not match!');
                return;
            }
            registerOrLogin = 'auth/register';
            JSONbody = { username, email, password }      
        }

        //Reach out to our server
        const sendToServer = async () => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT +  registerOrLogin, 'POST', 'include', {'Content-Type': 'application/json', 'Accept': 'application/json'}, JSON.stringify(JSONbody), true);

                if(responseData === undefined){
                    return;
                } else {
                    window.sessionStorage.setItem('sessionStart', moment());
                    setUserState(oldValues => {
                        let encryptedID = encryptData(responseData.id, process.env.REACT_APP_CRYPSALT);
                        return { ...oldValues, token: responseData.token, isAdmin: responseData.isAdmin, id: encryptedID }
                    });
                }
            } catch(err){
                //Errors handled in hook
            }
        }
        sendToServer();
    }

    return(<>
            {error && <h1>{ error }</h1>} {localError && <h1>{ localError }</h1>}
            <Form className='LoginForm' onSubmit={submitFormHandler}>
                {!props.isLogin && <>   
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={ e => setEmail(e.target.value) } />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                </>}
                
                    <Form.Group className="mb-3">
                        <Form.Label>Userame</Form.Label>
                        <Form.Control type="text" placeholder="Enter your username" onChange={ e => setUsername(e.target.value) }/>
                    </Form.Group>
                

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } />
                </Form.Group>

                {!props.isLogin && 
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={ e => setVerifyPassword(e.target.value) } />
                    </Form.Group>
                }

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check to be notified when new recipes are posted" />
                </Form.Group> */}

                <Button variant="primary" type="submit" disabled={submitting}>
                    {props.isLogin ? (submitting ? 'Logging in' : 'Login') : (submitting ? 'Registering' : 'Register') }
                </Button>
            </Form>
        </>)
}

export default LoginForm;