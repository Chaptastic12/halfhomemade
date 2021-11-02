import React, { useContext } from 'react';

import DiagonalCard from '../UI Elements/DiagonalCard/DiagonalCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import HoneyHam from '../../Img/Food/Honey_roasted_ham.jpg';
import MafuTofu from '../../Img/Food/Mafu_tofu.jpg'

import { MobileContext } from '../../context/mobile-context';

import './AboutDiv.css';

const AboutDiv = props =>{

    const { isMobile } = useContext(MobileContext);

    return(
        <>
            <div className='AboutDiv'>
                <Row>
                    {!isMobile && <Col>
                        <DiagonalCard backgroundImage={HoneyHam} cardTitle='HoneyHam' left={true}>Hi</DiagonalCard>
                    </Col> }
                    <Col className='d-flex justify-content-center align-items-center'>
                        <div className='AboutDiv-BookText text-center'>
                            <h1>Learn about us</h1>
                            <p>Starting from some great ideas, and putting our own twist on them, enjoy our take on some classic recipes</p>
                            <p className='AboutDiv-LearnMore'>Learn more about us <i className="far fa-arrow-alt-circle-right" /></p>
                        </div>
                    </Col>
                    <Col>
                        <DiagonalCard backgroundImage={MafuTofu} cardTitle='MafoTofu' left={false}>Hi</DiagonalCard>
                    </Col>
                </Row>
            </div>
            <div className='Section-Divider' />
        </>

    )
}

export default AboutDiv;