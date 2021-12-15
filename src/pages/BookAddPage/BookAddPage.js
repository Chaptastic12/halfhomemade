import React, { useState, useContext, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';

import { AuthContext } from '../../Shared/context/auth-context';
import { useHttp } from '../../Shared/hooks/http-hook';

import './BookAddPage.css'

const BookAddPage = props =>{

    const { userState } = useContext(AuthContext);
    const { submitting, error, sendRequest } = useHttp();

    const [ bookTitle, setBookTitle ] = useState('');
    const [ bookImg, setBookImg ] = useState('');
    const [ localError, setLocalError ] = useState('');
    const [ imagePreview, setImagePreview ] = useState();

    useEffect(()=>{
        if(!bookImg){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImagePreview(fileReader.result);
        };
        fileReader.readAsDataURL(bookImg);

    }, [bookImg])
    
    const submitBookImage = image =>{
        if(image && image.length === 1){
            const chosenFile = image[0];
            setBookImg(chosenFile);
        } else {
            setBookImg(undefined);
        }
    }

    const submitBookToServer = e => {
        e.preventDefault();

        //Make sure we are sent good data; If not, return an error and end the function
        if(bookTitle === '' || bookImg === ''){
            setLocalError('Book title or Book Image cannot be empty.');
            return;
        }

        //Put together what we will send to the server
        const formData = new FormData();
        formData.append('bookTitle', bookTitle);
        formData.append('bookImage', bookImg)

        //Reach out to our server
        const sendToServer = async () => {
            try{
                const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'books/add', 'POST', 'include', {Authorization: `Bearer ${userState.token}`}, formData, true);
                console.log(responseData);
            } catch(err){
                //Errors handled in hook
            }
        }
        sendToServer();
    }

    //If they are not an admin, they should not be able to get here
    //Will need to safeguard on the API route as well incase they are able to manipulate the state somehow
    if(!userState.isAdmin){
        return <div>Access Denied.</div>
    }

    return (<>
        <h1>{ error } { localError }</h1>
        <Form className='bookPageAdd'>
            <Row>
                { imagePreview && <img src={imagePreview } className='bookPageAdd-Image' alt='Recipe Preview' /> }
                { !imagePreview && <p>Please pick an image to see a preview</p> }
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" placeholder="Book Title"  onChange={ e => setBookTitle(e.target.value) }/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Upload Recipe Image</Form.Label>
                        <Form.Control type="file" name='bookImg' accept='.jpg,.png,.jpeg' onChange={  e => submitBookImage(e.target.files) }/>
                    </Form.Group>
                </Col>
            </Row>

            <Button onClick={submitBookToServer}>{ submitting ? 'Submitting...' : 'Submit' }</Button>
        </Form>
    </>)
}

export default BookAddPage;