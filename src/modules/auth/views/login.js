import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../action';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    login(e) {
        this.props.login(this.state);
        e.preventDefault();
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Form onSubmit={(e) => this.login(e)}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" required value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} placeholder="Enter the registered email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" required value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} placeholder="Enter the Password" />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login
    }, dispatch);
}

export default (connect(null, mapDispatchToProps)(Login));
