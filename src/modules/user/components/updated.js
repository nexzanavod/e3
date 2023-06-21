import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { FormGroup, Label, Input, Form } from 'reactstrap';
import queryString from 'query-string';
import { bindActionCreators } from 'redux';
import { saveUsers, getUserById } from '../actions';
const { REACT_APP_AMANA_ADMIN_USERS } = process.env;



function UserCreate({ saveUsers, getUserById, user }) {
  const [initialState, setInitialState] = useState({
    name: '',
    email: '',
    password: '',
    permissions: {
      customers: { view: false, add: false, edit: false, delete: false },
      event: { view: false, add: false, edit: false, delete: false },
      segments: { view: false, add: false, edit: false, delete: false },
      campaigns: { view: false, add: false, edit: false, delete: false }

    }
  });


  const [name, setName] = useState(initialState.name);
  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);

  const [permissions, setPermissions] = useState(initialState.permissions);

  const object = JSON.parse(localStorage.getItem('auth'));
  const userId = object.id;
  const userName = object.name;
  const useremail = object.email;


  const history = useHistory();
  const { search } = useLocation();
  const { id } = queryString.parse(search);

  useEffect(() => {
    getUserById(id);
  }, [getUserById, id]);


  useEffect(() => {
    setName(userName);
    setEmail(useremail);


    setPermissions(prevPermissions => ({
      customers: {
        view: user.permissions?.[0]?.customers.view,
        add: user.permissions?.[0]?.customers.add,
        edit: user.permissions?.[0]?.customers.edit,
      },
      event: {
        view: user.permissions?.[0]?.event.view,
        add: user.permissions?.[0]?.event.add,
        edit: user.permissions?.[0]?.event.edit,
        delete: user.permissions?.[0]?.event.delete,
      },
      segments: {
        view: user.permissions?.[0]?.segments.view,
        add: user.permissions?.[0]?.segments.add,
        edit: user.permissions?.[0]?.segments.edit,
        delete: user.permissions?.[0]?.segments.delete,
      },
      campaigns: {
        view: user.permissions?.[0]?.segments.view,
        add: user.permissions?.[0]?.segments.add,
        edit: user.permissions?.[0]?.segments.edit,
        delete: user.permissions?.[0]?.segments.delete,
      }
    }));
  }, [user]);

  const handlePermissionChange = (permission, value) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [permission]: {
        ...prevPermissions[permission],
        [value]: !prevPermissions[permission][value]
      }
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userPermissions = {
      customers: { ...permissions.customers },
      event: { ...permissions.event },
      segments: { ...permissions.segments },
      campaigns: { ...permissions.campaigns }
    };
    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      token: localStorage.getItem('TOKEN'),
      permissions: userPermissions
    };
    setName(initialState.name);
    setEmail(initialState.email);
    setPassword(initialState.password);
    setPermissions(initialState.permissions);
    saveUsers(userId, userData);
    history.push(window.location.pathname);
  };

  const handleCancel = e => {
    e.preventDefault();
    setName(initialState.name);
    setEmail(initialState.email);
    setPassword(initialState.password);
    setPermissions(initialState.permissions);
    history.push(window.location.pathname);
  };

  return (
    <div>

      <CardHeader>{'Edit'} Users</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label><b>Name</b></Label>
            <Input type="text" value={name} onChange={e => setName(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label><b>Email</b></Label>


            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled />
          </FormGroup>
          <FormGroup>
            <Label><b>Password</b></Label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </FormGroup>
          <FormGroup>
          </FormGroup>
          <div className="d-flex justify-content-end">
 
            <button type="submit" className="btn btn-primary mx-2">{'Update'}</button>
            {/* {idArray.includes(userId) && (
            <button onClick={handleCancel} className="btn btn-secondary mx-2">Cancel</button>
            
            )} */}
          </div>
        </Form>
      </CardBody>

    </div>
  );
}
const mapStateToProps = (state) => {
  console.log("REDUX STATE", state.users.user);
  return {
    automations: state.automations.automations,
    automation: state.automations.automation,
    user: state.users.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveUsers,
    getUserById
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);