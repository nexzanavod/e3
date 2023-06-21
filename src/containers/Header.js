import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import { AppSidebarToggler } from '@coreui/react';
import logo from '../assets/logo.png';
import AuthMenu from '../modules/auth/views/menu';

class Header extends Component {
  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <a
          href="/"
        >
          <img src={logo} style={{ height: 30 }} alt="" />
        </a>
        <Nav className="ml-auto px-3" navbar>
          <AuthMenu />
        </Nav>
      </React.Fragment>
    );
  }
}

export default Header;
