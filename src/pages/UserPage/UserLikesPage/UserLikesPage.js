
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import { v4 as uuid } from 'uuid';

import SmallRecipeCard from "../../../Shared/components/BookCard/SmallRecipeCard/SmallRecipeCard";

const UserLikesPage = props =>{

    let likes = props.likes.map(like => <Col key={uuid()} xs={6} sm={6} md={3} as={NavLink} to={`/recipes/view/${ like._id }`} style={{textDecoration: 'none'}}><SmallRecipeCard data={like} /></Col> )

    return (
        <div >
            <h1>Your likes</h1>
            <Row>{ likes } </Row>
        </div>
    )
}

export default UserLikesPage;