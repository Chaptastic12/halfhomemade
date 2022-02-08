import React, { useContext } from 'react';

import { ServerContext } from '../../Shared/context/server-context';
import { AuthContext } from '../../Shared/context/auth-context';

import BookCard from '../../Shared/components/BookCard/BookCard';

import './BookPage.css';

const BookPage = props =>{

    const { books } = useContext(ServerContext);
    const { userState } = useContext(AuthContext)

    return (
        <div className='BookPage'>
            <div className='Header'>
                <span style={{marginLeft: '25px'}}>All of our books</span>
            </div>
            <div className='SubHeader'>
                <span style={{marginLeft: '5vw'}}>Click on a recipe to learn more about it!</span>
            </div>
            {books.map( book => <BookCard key={book._id} data={book} isAdmin={userState.isAdmin} /> )}
        </div>
    )
}

export default BookPage;