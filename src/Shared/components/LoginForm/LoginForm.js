import React, { useState, useContext, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context'

import './LoginForm.css';

const LoginForm = props =>{

    const [ submitting, setSubmitting ] = useState(false);
    const [ error, setError ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ verifyPassword, setVerifyPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');

    const { userState, setUserState } = useContext(AuthContext);
    const history = useHistory();

    useEffect(()=>{
        if(userState.token){
            history.push('/');
        }
    },[history, userState])

    const submitFormHandler = e =>{
        e.preventDefault()
        setSubmitting(true);
        setError('');

        const genericErrorMsg = 'Something went wrong; please try again later';

        let registerOrLogin;
        let JSONbody;
        //If we are logging in...
        if(props.isLogin){
            registerOrLogin = 'auth/login';
            JSONbody = { username: email, password }

        } else {
            //Ensure passwords match. If they do not, kick them out
            if(password !== verifyPassword){
                setError('Passwords do not match!');
                return;
            }

            registerOrLogin = 'auth/register';
            JSONbody = { username: email, email, password, firstName, lastName }      
        }

        //Reach out to our API endpoint and send our data
        fetch(process.env.REACT_APP_API_ENDPOINT + registerOrLogin, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify(JSONbody)
        })
            .then(async response => {
                //We have our response, no longer submitting
                setSubmitting(false);

                //Check if we got a good response or not. If we did, set an error message
                if(response.ok === false){
                    if(response.status === 400){
                        setError('Please fill in all the fields.');
                    } else if(response.status === 401){
                        setError('Invalid email and password combination');
                    } else {
                        setError(genericErrorMsg);
                    }
                } else {
                    //If we did get good data, update our userState
                    const data = await response.json();
                    console.log(data);
                    setUserState(oldValues => {
                        return { ...oldValues, token: data.token, isAdmin: data.isAdmin }
                    });
                }
            })
            .catch(err => {
                setSubmitting(false);
                setError(genericErrorMsg);
            })
    }

    return(<>
            {error && <h1>{ error }</h1>}
            <Form className='LoginForm' onSubmit={submitFormHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={ e => setEmail(e.target.value) } />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                {!props.isLogin && <>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your first name" onChange={ e => setFirstName(e.target.value) }/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your last name" onChange={ e => setLastName(e.target.value) } />
                    </Form.Group>
                </>}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={ e => setPassword(e.target.value) } />
                </Form.Group>

                {!props.isLogin && 
                    <Form.Group className="mb-3" controlId="formBasicPassword">
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