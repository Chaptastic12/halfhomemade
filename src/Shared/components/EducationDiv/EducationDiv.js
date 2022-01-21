import React from 'react';

import { Row, Col, Container } from 'react-bootstrap';

import './EducationDiv.css';

const EducationDiv = props =>{

    return(
        <div className='EducationDiv d-flex justify-content-center'>
            <div className='text-center' >
                <h1 className='EducationDiv-Title'>Learn with us</h1>
                <Container >
                    <Row>
                        <Col className='d-none d-sm-block'>
                            <div className='box-shadow-small EducationDiv-Box'>
                            <i className="fas fa-users icon" />
                            </div>
                        </Col>
                        <Col>
                            <div className='EducationDiv-Box'>
                                <div>
                                    <p className='EducationDiv-SubTitle'>Learn with others, or on your own time.</p>
                                    <p>Tune into live classes and ask questions on the fly! For those who can't make it, recordings are saved and made available on our YouTube channel.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className='EducationDiv-Box'>
                                <div>
                                    <p className='EducationDiv-SubTitle'>Education videos at your fingertips</p>
                                    <p>Trying one of our recipes? Follow along from your book, and along side our experienced chef! Everything is explained for even the most novice of chefs.</p>
                                </div>
                            </div>
                        </Col>
                        <Col className='d-none d-sm-block'>
                            <div className='box-shadow-small EducationDiv-Box'>
                                <i className="fas fa-play-circle icon" />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='d-none d-sm-block'>
                            <div className='box-shadow-small EducationDiv-Box'>
                                <i className="fas fa-piggy-bank icon" />
                            </div>
                        </Col>
                        <Col>
                            <div className='EducationDiv-Box'>
                                <div>
                                    <p className='EducationDiv-SubTitle'>Best of yet...</p>
                                    <p>All of this is provided to you - free of charge. If you want a hardcopy of our recipes though, you are more than welcome to add our book to your collection.</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <br />
            </div>
        </div>
    )
}

export default EducationDiv;