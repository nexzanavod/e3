import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap';
import logo from '../assets/logo.png';
import text from '../assets/texts.json';
import Login from '../modules/auth/views/login';

class LoginScreen extends Component {

  render() {
    return (
      <div className="bg-light text-dark app flex-row align-items-center">
        <Container>
          <div className="mb-5">
            <img src={logo} alt={text.title} className="mb-3" style={{ maxWidth: 80 }} />
            <h4>{text.title}</h4>
            <small>{text.description}</small>
          </div>
          <Row className="justify-content-center">
            <Col md="6">
              <Card>
                <CardHeader>Login</CardHeader>
                <CardBody>
                  <Login />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginScreen;