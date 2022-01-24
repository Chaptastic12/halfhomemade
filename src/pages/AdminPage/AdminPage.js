import React, { useContext, useState } from 'react';

import AdminPageNav from './AdminPageNav/AdminPageNav';
import RecipeAddPage from '../RecipeAddPage/RecipeAddPage_OLD';
import BookAddPage from '../BookAddPage/BookAddPage';
import RecipePage from '../RecipePage/RecipePage';

import { AuthContext } from '../../Shared/context/auth-context';
import { Col, Row } from 'react-bootstrap';

const AdminPage = () => {

    const { userState } = useContext(AuthContext);
    const [ showPage, setShowPage ] = useState({addRecipe: true, addBook: false, viewRecipes: false});

    const changePageHandler = component => {
        const stateCopy = { ...showPage };
        Object.keys(stateCopy).forEach(p => stateCopy[p] = false );
        stateCopy[component] = true;
        setShowPage(stateCopy);
    }
 

    //Ensure only admin users can access
    if(!userState.isAdmin){
        return <div>Access Denied</div>
    } else {
        return (
            <div>
                <Row>
                    <Col xs={1}>
                        <AdminPageNav pageChange={changePageHandler} />
                    </Col>
                    <Col xs={11}>
                        {showPage.addRecipe && <RecipeAddPage />}
                        {showPage.addBook && <BookAddPage />}
                        {showPage.viewRecipes && <RecipePage admin/>}

                    </Col>
                </Row>
            </div>
        )
    }
}

export default AdminPage;