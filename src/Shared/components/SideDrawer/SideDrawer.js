import React, { useContext } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { SideDrawerContext } from '../../context/sidedrawer-context';

import './SideDrawer.css';

const SideDrawer = props =>{

    const { showSideDrawer, toggleDrawer } = useContext(SideDrawerContext);

    return (
            <div className={`SideDrawer${showSideDrawer ? '-Open' : ''}`}>
                Hi
                <Row>
                    <Col><div className='SidedDrawer-Close'><i className="far fa-window-close" onClick={()=>toggleDrawer()} /></div></Col>
                </Row>
                <Row>
                    <Col></Col>
                </Row>
            </div>
            )
}

export default SideDrawer;