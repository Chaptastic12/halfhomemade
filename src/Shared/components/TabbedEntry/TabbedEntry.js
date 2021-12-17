import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

import './TabbedEntry.css';

const TabbedEntry = props => {
    let entry = [];
    for(let i = 0; i < props.entries; i++){
        entry.push(<Tab eventKey={i} title={i+1}>
                        <Form.Group className="mb-3" id={i}>
                            <Form.Control type="text" as='textarea' placeholder={props.entryType + ' ' + (i+1)}  onChange={ e => props.updateRecipeSteps(i, e.target.value)} />
                        </Form.Group>
                    </Tab>)
    }

    return(
        <div className='Tabs'>
            <Tabs defaultActiveKey={0} className="mb-3">
                {entry}
            </Tabs>
        </div>
    );
}

export default TabbedEntry;