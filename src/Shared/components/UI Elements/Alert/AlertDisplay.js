import React from 'react';

import { Alert } from 'react-bootstrap';

const AlertDisplay = props => {

    if(props.lg){
        return (
            <Alert variant="danger" onClose={() => props.closeAlert('')} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>{ props.alertText }</p>
        </Alert>
        )
    }

    return ( <Alert variant='danger'>
        {props.alertText}
    </Alert> )
}

export default AlertDisplay;