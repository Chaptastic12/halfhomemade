
import { Row, Col, Container } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

import './FlippingTextIcon.css';

const FlippingTextIcon = props =>{

    let output = props.items.map(item => {
        return  <Row key={uuid()} className='FlippingTextIcon'>
                    <Col className='d-none d-sm-block' xs={item.iconLeft ? {order: 'first'} : {order: 'last'}}>
                        <div className='Box box-shadow-small'>
                            {item.icon}
                        </div>
                    </Col>
                    <Col xs={item.iconLeft ? {order: 'last'} : {order: 'first'}}>
                        <div className='Box'>
                            <div>
                                { item.subTitle !== null && <p className='SubTitle'>{item.subTitle}</p> }
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
    })
    
    return <Container> { output } </Container>;
}

export default FlippingTextIcon;