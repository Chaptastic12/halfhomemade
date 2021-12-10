import React, { useState, useContext } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../Shared/context/auth-context';

import './BookAddPage.css'

const BookAddPage = props =>{

    const { userState } = useContext(AuthContext);

    const [ bookTitle, setBookTitle ] = useState('');
    const [ bookImg, setBookImg ] = useState('');

    const [ submitting, setSubmitting ] = useState(false);
    const [ error, setError ] = useState('');
    const genericErrorMsg = 'Something went wrong; please try again later';


    const submitBookToServer = e => {
        e.preventDefault();
        setSubmitting(true);

        //Put together what we will send to the server
        const JSONbody = {
            bookTitle,
            bookImg
        }

        //Reach out to our server
        fetch(process.env.REACT_APP_API_ENDPOINT + '/book/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(JSONbody)
        })
            .then(async response => {
                //We have our response, no longer submitting
                setSubmitting(false);

                //Check if we got a good response or not. If we did, set an error message
                if(response.ok === false){
                    if(response.status === 400){
                        setError('Please fill in all the fields.');
                    } else {
                        setError(genericErrorMsg);
                    }
                } 
            })
            .catch(err => {
                setSubmitting(false);
                setError(genericErrorMsg);
            })
    }

    //If they are not an admin, they should not be able to get here
    //Will need to safeguard on the API route as well incase they are able to manipulate the state somehow
    if(!userState.isAdmin){
        return <div>Access Denied.</div>
    }

    return (<>
        <h1>{ error }</h1>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" placeholder="Book Title"  onChange={ e => setBookTitle(e.target.value) }/>
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Book Image</Form.Label>
                <Form.Control type="file" />
            </Form.Group>

            <Button onClick={submitBookToServer}>{ submitting ? 'Submitting...' : 'Submit' }</Button>
        </Form>
    </>)
}

export default BookAddPage;