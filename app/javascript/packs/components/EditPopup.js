import React from 'react';
import { Modal, Form, Button, FormGroup, FormLabel , FormControl } from 'react-bootstrap';
import { fetch } from './Fetch';
import UserSelect from './UserSelect';

export default class EditPopup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      task: {
        id: null,
        name: '',
        description: '',
        state: null,
        author: {
          id: null,
          first_name: null,
          last_name: null,
          email: null
        },
        assignee: {
          id: null,
          first_name: null,
          last_name:  null,
          email: null
        }
      },
      isLoading: true,
    }
  }

  loadCard = (cardId) => {
    this.setState({ isLoading: true });
    fetch('GET', window.Routes.api_v1_task_path(cardId, {format: 'json'})).then(({data}) => {
      this.setState({ task: data});
      this.setState({ isLoading: false });
    });
  }

  componentDidUpdate (prevProps) {
    if (this.props.cardId != null && this.props.cardId !== prevProps.cardId) {
      this.loadCard(this.props.cardId);
    };
  }

  handleNameChange = (e) => {
    this.setState({ task: { ...this.state.task, name: e.target.value }});
  }

  handleDecriptionChange = (e) => {
    this.setState({ task: { ...this.state.task, description: e.target.value }});
  }

  handleCardEdit = () => {
    fetch('PUT', window.Routes.api_v1_task_path(this.props.cardId, {format: 'json'}), {
      name: this.state.task.name,
      description: this.state.task.description,
      author_id: this.state.task.author.id,
      assignee_id: this.state.task.assignee.id
    }).then( response => {
      if (response.statusText == 'OK') {
        this.props.onClose(this.state.task.state);
      }
      else {
        alert('Update failed! ' + response.status + ' - ' + response.statusText);
      }
    });
  }

  handleCardDelete = () => {
    fetch('DELETE', window.Routes.api_v1_task_path(this.props.cardId, { format: 'json' }))
      .then( response => {
        if (response.statusText == 'OK') {
          this.props.onClose(this.state.task.state);
        }
        else {
          alert('DELETE failed! ' + response.status + ' - ' + response.statusText);
        }
      });
  }

  handleAuthorChange = (value) => {
    this.setState({ task: { ...this.state.task, author: value }});
  }

  handleAssigneeChange = (value) => {
    this.setState({ task: { ...this.state.task, assignee: value }});
  }

  render () {
    if (this.state.isLoading) {
      return (
        <Modal animation={false} show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Info
            </Modal.Title>
          </Modal.Header>
           <Modal.Body>
            Your task is loading. Please be patient.
          </Modal.Body>
           <Modal.Footer>
            <Button onClick={this.props.onClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <div>
        <Modal animation={false} show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Task # {this.state.task.id} [{this.state.task.state}]
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formTaskName">
                <Form.Label>Task name:</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.task.name}
                  placeholder='Set the name for the task'
                  onChange={this.handleNameChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescriptionName">
                <Form.Label>Task description:</Form.Label>
                <Form.Control
                  as="textarea"
                  value={this.state.task.description}
                  placeholder='Set the description for the task'
                  onChange={this.handleDecriptionChange}
                />
              </Form.Group>
              <Form.Group controlId="formTaskAssignee">
              <Form.Label>Assignee:</Form.Label>
                <UserSelect
                  id="Assignee"
                  isDisabled={false}
                  value={this.state.task.assignee}
                  onChange={this.handleAssigneeChange}
                />
              </Form.Group>
              <Form.Group controlId="formTaskAuthor">
              <Form.Label>Author:</Form.Label>
                <UserSelect
                  id="Author"
                  isDisabled={true}
                  value={this.state.task.author}
                  onChange={this.handleAuthorChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.handleCardDelete}>Delete</Button>
            <Button onClick={this.props.onClose}>Close</Button>
            <Button variant="primary" onClick={this.handleCardEdit}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}