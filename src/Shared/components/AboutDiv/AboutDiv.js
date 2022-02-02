import React from 'react';

import DiagonalCard from '../UI Elements/DiagonalCard/DiagonalCard';
import { Col, Row } from 'react-bootstrap';

import HoneyHam from '../../Img/Food/webp/Honey_roasted_ham.webp';
import MafuTofu from '../../Img/Food/webp/Mafu_tofu.webp'

import useProgressiveImage from '../../hooks/lazyLoad-hook';

import './AboutDiv.css';

const AboutDiv = props =>{

    const loadedHoney = useProgressiveImage(HoneyHam);
    const loadedMafu = useProgressiveImage(MafuTofu)

    return(
        <div className='AboutDiv'>
            <Row>
                <Col className='d-md-none'>
                    <DiagonalCard backgroundImage={loadedHoney} cardTitle='HoneyHam' left={true} />
                </Col>
                <Col className='Details d-none d-md-block'>
                    <div className='BookText'>
                        <h1>Learn more about us</h1>
                        <br />
                        <p>Starting from some great ideas, and putting our own twist on them, enjoy our take on some classic recipes. The food you see here is just the beginning.
                            We'll take you on an taste adventure around the world, strap in!
                        </p>
                        <br />
                        <p className='LearnMore'>Learn more about us <i className="far fa-arrow-alt-circle-right" /></p>
                    </div>
                </Col>
                <Col>
                    <DiagonalCard backgroundImage={loadedMafu} cardTitle='MafoTofu' left={false} />
                </Col>
            </Row>
        </div>
)
}

export default AboutDiv;