import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Table, Col, Row, Button, Modal} from 'react-bootstrap';
import ModalPerson from './Person';

export default class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            persons: [],
            isPersonFormVisible: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:8000/person/', {})
            .then(response => {return response.json()})
            .then(data => this.setState({persons: data}))
            .catch(err => console.log(err));
    }

    displayPerson = () => {     
        return this.state.persons.map(person => {
            return (
                <tr key={person._id}>
                    <td>{`${person.lastName}, ${person.firstName} ${person.middleName.substring(1)}`}</td>
                    <td>{new Date(person.birthDate).toLocaleDateString("en-US")}</td>
                    <td>{person.gender == 1? 'Male': 'Female'}</td>
                    <td>
                        <Button variant="warning" onClick = {() => this.handleUpdatePerson(person._id)}>Update</Button>
                    </td>
                    <td>
                        <Button variant="danger" onClick = {() => this.handleDeletePerson(person._id)}>Delete</Button>
                    </td>
                </tr>
            )
        });
    }

    handlePersonForm = () => {
        this.setState((state) => ({
            isPersonFormVisible: !state.isPersonFormVisible,
            id: ''
        }));
    }

    handleDeletePerson = (id) => {
        fetch('http://localhost:8000/person/delete', {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({personId: id})
        })
            .then(response => {
                this.state.persons.filter(person => person._id != id);
            })
            .catch(err => console.log(err));
    }

    handleUpdatePerson = (id) => {        
        this.setState((state) => ({
            isPersonFormVisible: !state.isPersonFormVisible,
            id
        }));
    }

    render(){
        return(
            <Container fluid="sm">
                <Row>
                    <Col>
                        <Button variant='primary' onClick={this.handlePersonForm}> Add a Person</Button>{' '}
                        <Link to='/createfamily'>
                            <Button variant='primary'> Create family</Button>
                        </Link>
                    </Col>
                </Row>
                <Table>
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Birthdate </th>
                            <th> Gender </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.persons && this.displayPerson()}
                    </tbody>
                </Table>
                <ModalPerson 
                    isVisible={this.state.isPersonFormVisible}
                    handlePersonForm={this.handlePersonForm}
                    id={this.state.id}
                />
            </Container>
        );
    }
}