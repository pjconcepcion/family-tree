import React, {Component} from 'react';
import {Container, Button, Form} from 'react-bootstrap';

export default class Family extends Component {
    constructor(props){
        super(props);
        this.state = {
            male: [],
            female: [],
            fatherId: '',
            motherId: '',
            createdFamily: false,
            firstName: '',
            lastName: '',
            birthDate: '',
            gender: ''
        }
    }

    componentDidMount(){
        fetch('http://localhost:8000/person/available/1')
            .then(response => {return response.json()})
            .then(data => this.setState({male: data}))
            .catch(err => console.log(err));
        
        fetch('http://localhost:8000/person/available/0')
                .then(response => {return response.json()})
                .then(data => this.setState({female: data}))
                .catch(err => console.log(err));
        
    }
    
    displayMale = () => {     
        return this.state.male.map(person => {
            return (
                <option key={person._id} value={person._id}>{`${person.lastName}, ${person.firstName} ${person.middleName.substring(1)}`}</option>
            )
        });
    }

    displayFemale = () => {     
        return this.state.female.map(person => {
            return (
                <option key={person._id} value={person._id}>{`${person.lastName}, ${person.firstName} ${person.middleName.substring(1)}`}</option>
            )
        });
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.dataset.name] : e.target.value
        })        
    }

    onSubmitFamily = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/family/create', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fatherId: this.state.fatherId,
                motherId: this.state.motherId
            })
        })
            .then(response => this.setState({createdFamily: true}))
            .catch(err => console.log(err));
    }

    onSubmitChildren = (e) => {
        e.preventDefault();
        let fatherLastName = this.state.male.find(person => person._id = this.state.fatherId);
        let motherLastName = this.state.female.find(person => person._id = this.state.motherId);
        fetch('http://localhost:8000/person/add', {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: this.state.firstName,
                    lastName: fatherLastName.lastName,
                    middleName: motherLastName.lastName,
                    birthDate: this.state.birthDate,
                    gender: this.state.gender
                })
            })
                .then(response => {return response.json()})
                .then(data => {
                    console.log(data)
                    fetch('http://localhost:8000/family/member/add', {
                        method: 'POST',
                        mode: 'cors',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            fatherId: this.state.fatherId,
                            motherId: this.state.motherId,
                            childId: data._id,
                        })
                    })
                        .then(response => this.setState({
                            firstName: '',
                            lastName: '',
                            birthDate: '',
                            gender: '',
                        }))
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
    }

    displayChildren = () => {
        return (
                <Form onSubmit={this.onSubmitChildren}>
                    <Form.Label>Children</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Enter first name" data-name='firstName' required onChange={this.onValueChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Birthdate</Form.Label>
                        <Form.Control type="date" required data-name='birthDate' required onChange={this.onValueChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select aria-label="Default select example" data-name='gender' onChange={this.onValueChange}>
                            <option disabled selected>Select Gender</option>
                            <option value={true}>Male</option>
                            <option value={false}>Female</option>
                        </Form.Select>
                    </Form.Group>
                    <Button style={{float: 'right'}} variant="success" type="submit">
                        Add
                    </Button>
                </Form>
        );
    }

    render(){
        return (
            <Container>
                <h1> Create a family </h1>
                <Form onSubmit={this.onSubmitFamily}>
                    <Form.Group className="mb-3">
                        <Form.Label>Father</Form.Label>
                        <Form.Select aria-label="Default select example" data-name='fatherId' onChange={this.onValueChange}>
                            <option disabled selected>Select father</option>
                            {this.state.male && this.displayMale()}
                        </Form.Select>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Mother</Form.Label>
                        <Form.Select aria-label="Default select example" data-name='motherId' onChange={this.onValueChange}>
                            <option disabled selected>Select mother</option>
                            {this.state.female && this.displayFemale()}
                        </Form.Select>
                    </Form.Group>
                    {!this.state.createdFamily &&
                        <Button style={{float: 'right'}} variant="success" type="submit">
                            Create
                        </Button>
                    }
                </Form>
                <br/>
                {this.state.createdFamily && this.displayChildren()}
            </Container>
        );
    }
}
