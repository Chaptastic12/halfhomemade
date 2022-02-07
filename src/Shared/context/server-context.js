import { createContext, useState } from 'react';
import { useHttp } from '../hooks/http-hook';

const ServerContext = createContext([{}, () => {}]);

const ServerProvider = props =>{

    const { sendRequest } = useHttp();

    const [ books, setBooks ] = useState([]);
    const [ allRecipes, setAllRecipes ] = useState([]);
    const [ loadedReviews, setLoadedReviews ] = useState([]);

    //Get our books that can be chosen as a source for the recipe
    const getBooksFromServer = async() => {
        try{
            const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'books/getAllBooks');
            setBooks(responseData);
        } catch(err){ /*Errors handled in hook*/ }
    }

    //Make a call to our API to get our recipes
    const getRecipesFromServer = async() => {
        try{
            const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'recipes/showAllRecipes');
            setAllRecipes(responseData);
        } catch(err){ /* Errors handled in hook */ }
    }

    //Get our product reviews
    const getProductReviewsFromServer = async() => {
        try{
            const responseData = await sendRequest(process.env.REACT_APP_API_ENDPOINT + 'shop/getAllReviewsForProducts/');
            setLoadedReviews(responseData);
        } catch(err){ /*Errors handled in hook */ }
    }

    return (
        <ServerContext.Provider value = {{ books, getBooksFromServer, allRecipes, getRecipesFromServer, loadedReviews, getProductReviewsFromServer }}>
            {props.children}
        </ServerContext.Provider>
    )
}

export { ServerContext };

export default ServerProvider;