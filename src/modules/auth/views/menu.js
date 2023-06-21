import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import Avatar from 'react-avatar';
import { logout } from '../action';
import { useHistory } from 'react-router-dom';


const AuthMenu = ({ auth, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const history = useHistory();


  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    history.push({
        pathname: '/',
      });
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Dropdown nav className="d-md-down-none" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle nav>
          {auth ? (
            <span>
              <Avatar color="#207fff" textSizeRatio={2} round maxInitials={2} name={auth.name} size="34" /> {auth.name}
            </span>
          ) : (
            ''
          )}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-lg" right>
          <DropdownItem onClick={handleLogout}>
            <i className="fa fa-sign-out"></i> Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthMenu);