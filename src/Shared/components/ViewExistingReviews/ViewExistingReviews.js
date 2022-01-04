import { Col, Row, Button } from 'react-bootstrap';

import Stars from '../UI Elements/Stars/Stars';

import './ViewExistingReviews.css'

const ViewExistingReviews = props => {

    let mostRecentAmount = (-Math.abs(props.amount))
    let reviewsToShow = props.data.slice(mostRecentAmount).map(review => {
        review.updatedAt = review.updatedAt.toString().split('T')[0];
        return ( <div className='Review' key={review._id}>
            <Row>
                <Col xs={2}>
                    <i className="fas fa-user-circle Review-Icon" />
                </Col>
                <Col xs={8}>
                    <Row>
                        <Stars item={review.rating} />
                        { review.author.username } 
                    </Row>
                    <Row> {review.text} </Row>
                    <Row> {review.updatedAt} </Row>
                </Col>
                <Col xs={2}>
                    { ( ( props.userID === review.author.id ) || props.isAdmin ) && <Row>
                        <div className='Review-Buttons d-flex align-items-center justify-content-center'>
                            <Button variant='warning'>Edit</Button>
                            <Button variant='danger' onClick={() => props.delete('delete', null, null, null, review._id)}>Delete</Button>
                        </div>
                    </Row>}
                </Col>
            </Row>
        </div>);
    })

    return reviewsToShow 
}

export default ViewExistingReviews;