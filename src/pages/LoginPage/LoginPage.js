import React, { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import LoginForm from '../../Shared/components/LoginForm/LoginForm';
import PageHeader from '../../Shared/components/PageHeader/PageHeader';

import { MobileContext } from '../../Shared/context/mobile-context';

import './LoginPage.css';

const LoginPage = props =>{

    const { isMobile } = useContext(MobileContext);

    let output;
    if(!isMobile){
        output = <Container className='LoginPage'>
                    <LoginForm />
                </Container>
    }else{
        output = <div>
                    <LoginForm />
                </div>
    }

    return(<>
            <PageHeader />
            {output}
        </>)
}

export default LoginPage;