import React, { useState } from 'react';

import { Form, Button } from "react-bootstrap";

const UserSettingsPage = props =>{

    const [ updatedInfo, setUpdatedInfo ] = useState({username: '', email: '', password: '', confirmPassword: ''})

    let disabledButton;
    if(updatedInfo.username === '' && updatedInfo.email === '' && updatedInfo.password === '' && updatedInfo.confirmPassword === ''){
        disabledButton = true;
    } else { disabledButton = false }

    return (
        <Form style={{padding: '20px'}}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={updatedInfo.username} onChange={(e) => setUpdatedInfo({...updatedInfo, username: e.target.value}) } />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={updatedInfo.email} onChange={(e) => setUpdatedInfo({...updatedInfo, email: e.target.value}) } />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={updatedInfo.password} onChange={(e) => setUpdatedInfo({...updatedInfo, password: e.target.value}) } />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" value={updatedInfo.confirmPassword} onChange={(e) => setUpdatedInfo({...updatedInfo, confirmPassword: e.target.value}) } />
            </Form.Group>
            <Button disabled={disabledButton} onClick={() => props.updateInfo(updatedInfo)}>Submit</Button>
        </Form>
    )
}

export default UserSettingsPage;