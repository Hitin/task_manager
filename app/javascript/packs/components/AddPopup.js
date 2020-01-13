import React from 'react';
import { Modal, Form,  Button, FormGroup, FormLabel , FormControl } from 'react-bootstrap';
import { fetch } from './Fetch';

export default class AddPopup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      assignee: {
        id: null,
        first_name: null,
        last_name:  null,
        email: null
      }
    }
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleDecriptionChange = (e) => {
    this.setState({ description: e.target.value });
  }

  handleCardAdd = () => {
    fetch('POST', window.Routes.api_v1_tasks_path(), {
      task: {
        name: this.state.name,
        description: this.state.description,
        assignee_id: this.state.assignee.id
      }
    }).then( response => {
    if (response.statusText == 'Created') {
        this.props.onClose(true);
      }
      else {
        alert(response.status + ' - ' + response.statusText);
      }
    });
  }

  render () {
    return <div>
      <Modal animation={false} show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            New task
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task name:</Form.Label>
              <Form.Control
                type="text"
                value={this.state.name}
                placeholder='Set the name for the task'
                onChange={this.handleNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescriptionName">
              <Form.Label>Task description:</Form.Label>
              <Form.Control
                as="textarea"
                value={this.state.description}
                placeholder='Set the description for the task'
                onChange={this.handleDecriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onClose}>Close</Button>
          <Button variant="primary" onClick={this.handleCardAdd}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
}