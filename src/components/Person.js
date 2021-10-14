import React, {PureComponent} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

export default class ModalPerson extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            middleName: '',
            lastName: '',
            birthDate: '',
            gender: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.dataset.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        if(this.props.id){
            fetch('http://localhost:8000/person/update', {
                method: 'PUT',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    middleName: this.state.middleName,
                    lastName: this.state.lastName,
                    birthDate: this.state.birthDate,
                    gender: this.state.gender,
                    personId: this.props.id,
                })
            })
                .then(response => this.props.handlePersonForm())
                .catch(err => console.log(err));
        }else{
            fetch('http://localhost:8000/person/add', {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state)
            })
                .then(response => this.props.handlePersonForm())
                .catch(err => console.log(err));
        }
    }

    render(){
        return (
            <Modal show={this.props.isVisible} onHide={this.props.handlePersonForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Person</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First name" data-name='firstName' required onChange={this.onValueChange}/>
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Middle name"  data-name='middleName'onChange={this.onValueChange}/>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last name" data-name='lastName' required onChange={this.onValueChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control type="date" required data-name='birthDate' required onChange={this.onValueChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gender</Form.Label>
                            <Form.Check type="radio" name="gender" label="Male" value={1} c required onChange={()=> this.setState({gender: 1})}/>
                            <Form.Check type="radio" name="gender" label="Female" value={0} c required onChange={()=> this.setState({gender: 0})}/>
                        </Form.Group>
                        <Button style={{float: 'right'}} variant="success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}