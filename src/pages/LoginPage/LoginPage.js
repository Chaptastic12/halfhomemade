import React, { useContext, useState } from 'react';

import Container from 'react-bootstrap/Container';
import LoginForm from '../../Shared/components/LoginForm/LoginForm';

import Button from 'react-bootstrap/Button';

import { MobileContext } from '../../Shared/context/mobile-context';

import './LoginPage.css';

const LoginPage = props =>{

    const { isMobile } = useContext(MobileContext);

    const [ toggleLogin, setToggleLogin ] = useState(true);

    const switchToSignUp = () =>{
        setToggleLogin(prevState => !prevState)
    }

    let output;
    if(!isMobile){
        output = <Container className='LoginPage'>
                    <LoginForm isLogin={toggleLogin} />
                </Container>
    }else{
        output = <div>
                    <LoginForm isLogin={toggleLogin}/>
                </div>
    }

    return(<>
            <div className='text-center'>
                <div className='LoginPage-Header'>{toggleLogin ? 'Login' : 'Register'}</div>
                <Button onClick={()=>switchToSignUp()}>
                    {toggleLogin ? 'Click to Register' : 'Click to Login'}
                </Button>
            </div>
            {output}
        </>)
}

export default LoginPage;