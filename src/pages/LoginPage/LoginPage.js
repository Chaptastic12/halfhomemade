import React, { useState } from 'react';

import { Container, Button } from 'react-bootstrap';
import LoginForm from '../../Shared/components/LoginForm/LoginForm';

import './LoginPage.css';

const LoginPage = props =>{

    const [ toggleLogin, setToggleLogin ] = useState(true);

    const switchToSignUp = () =>{
        setToggleLogin(prevState => !prevState)
    }

    return(<>
            <div className='text-center'>
                <div className='LoginPage-Header'>{toggleLogin ? 'Login' : 'Register'}</div>
                <Button size='sm' onClick={()=>switchToSignUp()}>
                    {toggleLogin ? 'Click to Register' : 'Click to Login'}
                </Button>
            </div>
            <Container className='LoginPage d-none d-md-block'>
                <LoginForm isLogin={toggleLogin} />
            </Container>
            <div className='d-md-none'>
                <LoginForm isLogin={toggleLogin}/>
            </div>
        </>)
}

export default LoginPage;