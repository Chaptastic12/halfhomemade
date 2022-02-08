import React, { useContext, useEffect, useState } from 'react';

import { ServerContext } from '../../Shared/context/server-context';
import { AuthContext } from '../../Shared/context/auth-context';

import BookCard from '../../Shared/components/BookCard/BookCard';

import './BookPage.css';

const BookPage = props =>{

    const { books, getBooksFromServer, getRecipesFromServer } = useContext(ServerContext);
    const { userState } = useContext(AuthContext);

    const [ deletedBook, setDeletedBook ] = useState(false);

    //If we deleted a book, get our updated books
    useEffect(() =>{
        getBooksFromServer();
        getRecipesFromServer();
    //eslint-disable-next-line
    }, [deletedBook]);
    
    return (
        <div className='BookPage'>
            <div className='Header'>
                <span style={{marginLeft: '25px'}}>All of our books</span>
            </div>
            <div className='SubHeader'>
                <span style={{marginLeft: '5vw'}}>Click on a recipe to learn more about it!</span>
            </div>
            {books.map( book => <BookCard key={book._id} data={book} isAdmin={userState.isAdmin} userToken={userState.token} setDeletedBook={setDeletedBook} /> )}
        </div>
    )
}

export default BookPage;