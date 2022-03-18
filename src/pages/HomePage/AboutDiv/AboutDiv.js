import React from 'react';

import DiagonalCard from '../../../Shared/components/UI Elements/DiagonalCard/DiagonalCard';
import { Col, Row } from 'react-bootstrap';
import { NavHashLink } from 'react-router-hash-link';

import HoneyHam from '../../../Shared/Img/Food/webp/Honey_roasted_ham.webp';
import MafuTofu from '../../../Shared/Img/Food/webp/Mafu_tofu.webp'

import useProgressiveImage from '../../../Shared/hooks/lazyLoad-hook';

import './AboutDiv.css';
import FadeInSection from '../../../Shared/components/UI Elements/FadeInSection/FadeInSection';

const AboutDiv = props =>{

    const loadedHoney = useProgressiveImage(HoneyHam);
    const loadedMafu = useProgressiveImage(MafuTofu)

    return (
      <FadeInSection>
        <div className="AboutDiv">
          <Row>
            <Col className="d-none d-md-block">
              <DiagonalCard
                backgroundImage={loadedHoney}
                cardTitle="HoneyHam"
                left={true}
              />
            </Col>
            <Col className="Details d-none d-md-block">
              <div className="BookText">
                <h1>Learn more about us</h1>
                <br />
                <p>
                  Starting from some great ideas, and putting our own twist on
                  them, enjoy our take on some classic recipes. The food you see
                  here is just the beginning. We'll take you on an taste
                  adventure around the world, strap in!
                </p>
                <br />
                <p className="LearnMore">
                  <NavHashLink to="/about/#about">
                    Learn more about us{" "}
                    <i className="far fa-arrow-alt-circle-right" />
                  </NavHashLink>
                </p>
              </div>
            </Col>
            <Col>
              <DiagonalCard
                backgroundImage={loadedMafu}
                cardTitle="MafoTofu"
                left={false}
              />
            </Col>
          </Row>
        </div>
      </FadeInSection>
    );
}

export default AboutDiv;