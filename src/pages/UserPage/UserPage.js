import React, { useEffect, useState, useContext } from 'react';

import { ListGroup } from 'react-bootstrap';

import UserLikesPage from './UserLikesPage/UserLikesPage';
import UserSettingsPage from './UserSettingsPage/UserSettingsPage';
import AlertDisplay from '../../Shared/components/UI Elements/Alert/AlertDisplay';

import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './UserPage.css'

const UserPage = props => {

    const [ userInfo, setUserInfo ] = useState([])
    const [ details, setDetails ] = useState('likes');
    const [ localError, setLocalError ] = useState('');
    const [ refreshPage, setRefreshPage ] = useState(false);

    const { userState } = useContext(AuthContext);
    const { sendRequest } = useHttp();

    useEffect(()=>{
        if(userState.token){
            const getData = async() => {
                try{
                    const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'auth/getUserInfoById/', 'GET', 'include', { Authorization: `Bearer ${userState.token}`}, null, true);
                    setUserInfo(responseData);
                } catch(err) {/* Errors handled in hook */}
            }
            getData();
        }
    // eslint-disable-next-line
    }, [refreshPage]);

    const submitUpdatedInfo = async( info ) =>{
        const { username, email, password, confirmPassword } = info;

        if( password !== confirmPassword ){
            setLocalError('Passwords do not match; please try again')
            return;
        }
        setLocalError('');

        let JSONbody = { username: '', email: '', password: '', confirmPassword: '' };
        //If password is not empty, add it
        if(password !== ( '' || undefined || null)){
            JSONbody.password = password;
        }
        //If username is not empty, add it..etc
         if( username !== ('' || undefined || null)){
            JSONbody.username = username;
         }
         //If email is not empty, add it..etc
         if( email !== ('' || undefined || null)){
            JSONbody.email = email;
         }
         //If email is not empty, add it..etc
         if( confirmPassword !== ('' || undefined || null)){
            JSONbody.confirmPassword = confirmPassword;
         }

        try{
            await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'auth/updateUserInfo/', 'POST', 'include', { Authorization: `Bearer ${userState.token}`, 'Content-Type': 'application/json', 'Accept': 'application/json'}, JSON.stringify(JSONbody), true);
            setRefreshPage(prevState => !prevState)
        } catch(err) { /* Errors handled in hook */}
    }

    let pageToShow;
    if(userInfo.username){
        if(details === 'likes'){
            pageToShow = userInfo.likes.length > 0 ? <UserLikesPage likes={userInfo.likes} /> : <div>No likes...</div>
        } else if(details === 'settings'){
            pageToShow = <UserSettingsPage data={userInfo} updateInfo={(info) => submitUpdatedInfo(info)}/>
        }
    }

    if(!userState.id){
        return <div>Please login</div>
    } else {
        return (
            <div className='UserPage'>

                <div className='Header'>
                        <h1>Welcome, {userInfo.username}</h1>
                </div>

                { localError && <AlertDisplay lg={true} closeAllert={(change) => setLocalError('')} alertText={localError} /> }

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