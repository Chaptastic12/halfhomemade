import React from 'react';

import { Row, Col, Container } from 'react-bootstrap';

import { v4 as uuid } from 'uuid';

import './EducationDiv.css';

const EducationDiv = props =>{

    const educationItems = [
        { icon: <i className="fas fa-users icon" />, subTitle: 'Learn with others, or on your own time.', desc: `Tune into live classes and ask questions on the fly! For those who can't make it, recordings are saved and made available on our YouTube channel.`, iconLeft: true },
        { icon: <i className="fas fa-play-circle icon" />, subTitle: `Educational videos at your fingertips`, desc: `Trying one of our recipes? Follow along from your book, and along side our experienced chef! Everything is explained for even the most novice of chefs.`, iconLeft: false },
        { icon: <i className="fas fa-piggy-bank icon" />, subTitle: `Best of yet...`, desc: `All of this is provided to you - free of charge. If you want a hardcopy of our recipes though, you are more than welcome to add our book to your collection.`, iconLeft: true }
    ]

    let itemsToDisplay = educationItems.map(item => {
        return  <Row key={uuid()}>
                    <Col className='d-none d-sm-block' xs={item.iconLeft ? {order: 'first'} : {order: 'last'}}>
                        <div className='box-shadow-small EducationDiv-Box'>
                            {item.icon}
                        </div>
                    </Col>
                    <Col xs={item.iconLeft ? {order: 'last'} : {order: 'first'}}>
                        <div className='EducationDiv-Box'>
                            <div>
                                <p className='EducationDiv-SubTitle'>{item.subTitle}</p>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
    })

    return(
        <div className='EducationDiv d-flex justify-content-center'>
            <div className='text-center' >
                <h1 className='EducationDiv-Title'>Learn with us</h1>
                <Container >
                    {itemsToDisplay}
                </Container>
                <br />
            </div>
        </div>
    )
}

export default EducationDiv;