import React, { useEffect, useState, useContext } from 'react';

import { ListGroup } from 'react-bootstrap';

import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './UserPage.css'

const UserPage = props => {

    const [ userInfo, setUserInfo ] = useState([])
    const [ details, setDetails ] = useState('likes');

    const { userState } = useContext(AuthContext);
    const { sendRequest } = useHttp();

    useEffect(()=>{
        const getData = async() => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'auth/getUserInfoById/', 'GET', 'include', { Authorization: `Bearer ${userState.token}`}, null, true);
                setUserInfo(responseData);
            } catch {/* Errors handled in hook */}
        }
        getData();
    // eslint-disable-next-line
    }, []);

    let pageToShow;
    if(details === 'likes'){
        pageToShow = 'likes'
    } else if(details === 'settings'){
        pageToShow = 'settings';
    }


    if(!userState.id){
        return <div>Please login</div>
    } else {
        return (
            <div className='UserPage'>
                <div className='Header'>
                        <h1>Welcome, {userInfo.username}</h1>
                </div>
                <div className='d-block d-sm-none'>
                    <ListGroup horizontal>
                        <ListGroup.Item><strong>Navigation</strong></ListGroup.Item>
                        <ListGroup.Item className='option' onClick={() => setDetails('likes')}>Liked Recipes</ListGroup.Item>
                        <ListGroup.Item className='option' onClick={() => setDetails('settings')}>Settings</ListGroup.Item>
                    </ListGroup>
                </div>

                <div className='Contents'>
                    <div className='Nav d-none d-sm-block'>
                        <h2 style={{marginLeft: '5px'}}>Navigation</h2>
                        <ListGroup variant="flush">
                            <ListGroup.Item />
                            <ListGroup.Item className='option' onClick={() => setDetails('likes')}>Liked Recipes</ListGroup.Item>
                            <ListGroup.Item className='option' onClick={() => setDetails('settings')}>Settings</ListGroup.Item>
                            <ListGroup.Item />
                        </ListGroup>
                    </div>



                    <div className='Details'>
                        {pageToShow}
                    </div>
                </div>

            </div>
        )
    }
}

export default UserPage;