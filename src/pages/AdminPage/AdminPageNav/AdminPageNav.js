import React from 'react';

import { Nav } from 'react-bootstrap';

const AdminPageNav = props => {

    return(
        <Nav className="flex-column">
            <Nav.Link onClick={() => props.pageChange('addRecipe')}>Add Recipe</Nav.Link>
            <Nav.Link onClick={() => props.pageChange('addBook')}>Add Book</Nav.Link>
            <Nav.Link onClick={() => props.pageChange('viewRecipes')}>View All Recipes</Nav.Link>
            <Nav.Link onClick={() => props.pageChange('viewBooks')}>View All Books</Nav.Link>

        </Nav>
    )
}

export default AdminPageNav;