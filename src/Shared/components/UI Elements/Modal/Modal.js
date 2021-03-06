import { Modal, Button } from 'react-bootstrap';

const PopupModal = props => {

    return(
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.directToFunction} >
                    { props.directTo }
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default PopupModal;