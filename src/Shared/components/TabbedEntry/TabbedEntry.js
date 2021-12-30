import React from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

import { v4 as uuid } from 'uuid';

import './TabbedEntry.css';

const TabbedEntry = props => {
    let entry = [];
    for(let i = 0; i < props.entries; i++){
        entry.push(<Tab key={uuid()} eventKey={i} title={i+1}>
                        <Form.Group className="mb-3" id={i}>
                            <Form.Control type="text" as='textarea' placeholder={props.entryType + ' ' + (i+1)} value={props.loadedDetails && props.loadedDetails[i].value} onChange={ e => props.updateRecipeSteps(i, e.target.value, props.entryType)} />
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