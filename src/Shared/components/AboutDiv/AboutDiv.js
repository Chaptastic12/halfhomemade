import React from 'react';

import DiagonalCard from '../UI Elements/DiagonalCard/DiagonalCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import HoneyHam from '../../Img/Food/Honey_roasted_ham.jpg';
import MafuTofu from '../../Img/Food/Mafu_tofu.jpg'

import './AboutDiv.css';

const AboutDiv = props =>{

    return(
        <>
            <div className='AboutDiv'>
                <Row>
                    <Col>
                        <DiagonalCard backgroundImage={HoneyHam} cardTitle='HoneyHam' left={true}>Hi</DiagonalCard>
                    </Col>
                    <Col></Col>
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