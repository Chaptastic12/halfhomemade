import React from 'react';

import { Tabs, Tab, Form } from 'react-bootstrap';

import './TabbedEntry.css';

const TabbedEntry = props => {
    let entry = [];
    for(let i = 0; i < props.entries; i++){
        //If we are editing a recipe and we add additional fields, we need to ensure we handle those correctly
        //Without this we throw undefined value errors on loadedDetails[i]
        let value = '';
        try{
            value = props.loadedDetails[i].value;
        } catch(e){
            value = '';
        }
        entry.push(<Tab key={`ren${i+1}`} eventKey={i} title={i+1}>
                        <Form.Group className="mb-3" id={i}>
                            <Form.Control type="text" as='textarea' placeholder={props.entryType + ' ' + (i+1)} value={value} onChange={ e => props.updateRecipeSteps(i, e.target.value, props.entryType)} />
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