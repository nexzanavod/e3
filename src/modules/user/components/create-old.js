import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useLocation,useHistory } from 'react-router';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { FormGroup, Label, Input, Form, } from 'reactstrap'
import queryString from 'query-string';

import { bindActionCreators } from 'redux';
import { saveUsers, getUserById } from '../actions';



function UserCreate({ saveUsers, getUserById, user }) {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //Permissions
  const [CustomersView, setCustomersView] = useState(false);
  const [CustomersAdd, setCustomersAdd] = useState(false);
  const [CustomersEdit, setCustomersEdit] = useState(false);
  const [CustomersDelete, setCustomersDelete] = useState(false);
  const [EventView, setEventView] = useState(false);
  const [EventAdd, setEventAdd] = useState(false);
  const [EventEdit, setEventEdit] = useState(false);
  const [EventDelete, setEventDelete] = useState(false);
  const [SegmentsView, setSegmentsView] = useState(false);
  const [SegmentsAdd, setSegmentsAdd] = useState(false);
  const [SegmentsEdit, setSegmentsEdit] = useState(false);
  const [SegmentsDelete, setSegmentsDelete] = useState(false);
  const [CampaignsView, setCampaignsView] = useState(false);
  const [CampaignsAdd, setCampaignsAdd] = useState(false);
  const [CampaignsEdit, setCampaignsEdit] = useState(false);
  const [CampaignsDelete, setCampaignsDelete] = useState(false);
  const [ReportsView, setReportsView] = useState(false);
  const [ReportsAdd, setReportsAdd] = useState(false);
  const [ReportsEdit, setReportsEdit] = useState(false);
  const [ReportsDelete, setReportsDelete] = useState(false);
  const [MessagesView, setMessagesView] = useState(false);
  const [MessagesAdd, setMessagesAdd] = useState(false);
  const [MessagesEdit, setMessagesEdit] = useState(false);
  const [MessagesDelete, setMessagesDelete] = useState(false);


 

  const history = useHistory();
  const { search } = useLocation();
  const { id } = queryString.parse(search);



  useEffect(() => {
    getUserById(id);
  }, [id]);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setCustomersView(user.permissions?.[0]?.customers.view)
    setCustomersAdd(user.permissions?.[0]?.customers.add)
    setCustomersEdit(user.permissions?.[0]?.customers.edit)
    setCustomersDelete(user.permissions?.[0]?.customers.delete)
    setEventView(user.permissions?.[0]?.event.view)
    setEventAdd(user.permissions?.[0]?.event.add)
    setEventEdit(user.permissions?.[0]?.event.edit)
    setEventDelete(user.permissions?.[0]?.event.delete)
    setSegmentsView(user.permissions?.[0]?.segments.view)
    setSegmentsAdd(user.permissions?.[0]?.segments.add)
    setSegmentsEdit(user.permissions?.[0]?.segments.edit)
    setSegmentsDelete(user.permissions?.[0]?.segments.delete)
    setCampaignsView(user.permissions?.[0]?.campaigns.view)
    setCampaignsAdd(user.permissions?.[0]?.campaigns.add)
    setCampaignsEdit(user.permissions?.[0]?.campaigns.edit)
    setCampaignsDelete(user.permissions?.[0]?.campaigns.delete)
    setReportsView(user.permissions?.[0]?.reports.view)
    setReportsAdd(user.permissions?.[0]?.reports.add)
    setReportsEdit(user.permissions?.[0]?.reports.edit)
    setReportsDelete(user.permissions?.[0]?.reports.delete)
    setMessagesView(user.permissions?.[0]?.messages.view)
    setMessagesAdd(user.permissions?.[0]?.messages.add)
    setMessagesEdit(user.permissions?.[0]?.messages.edit)
    setMessagesDelete(user.permissions?.[0]?.messages.delete)




  }, [user]);


  // }
  const createUsers = (e) => {
    e.preventDefault();
    let userId = '';
    if (id) {
      userId = id;
    }

    let userPermissions = {
      customers: {
        view: CustomersView,
        add: CustomersAdd,
        edit: CustomersEdit,
        delete: CustomersDelete
      },
      event: {
        view: EventView,
        add: EventAdd,
        edit: EventEdit,
        delete: EventDelete
      },
      segments: {
        view: SegmentsView,
        add: SegmentsAdd,
        edit: SegmentsEdit,
        delete: SegmentsDelete
      },
      campaigns: {
        view: CampaignsView,
        add: CampaignsAdd,
        edit: CampaignsEdit,
        delete: CampaignsDelete
      },
      reports: {
        view: ReportsView,
        add: ReportsAdd,
        edit: ReportsEdit,
        delete: ReportsDelete
      },
      messages: {
        view: MessagesView,
        add: MessagesAdd,
        edit: MessagesEdit,
        delete: MessagesDelete
      },


    };

    let userData = {
      name: name === null ? '' : name,
      password: password === null ? '' : password,
      email: email === null ? '' : email,
      token: localStorage.getItem('TOKEN'),
      permissions: userPermissions,
    };


    saveUsers(userId, userData);
    setName(null);
    setEmail(null);
    setPassword(null);
    setCustomersView(false)
    setCustomersAdd(false)
    setCustomersEdit(false)
    setCustomersDelete(false)
    setEventView(false)
    setEventAdd(false)
    setEventEdit(false)
    setEventDelete(false)
    setSegmentsView(false)
    setSegmentsAdd(false)
    setSegmentsEdit(false)
    setSegmentsDelete(false)
    setCampaignsView(false)
    setCampaignsAdd(false)
    setCampaignsEdit(false)
    setCampaignsDelete(false)
    setReportsView(false)
    setReportsAdd(false)
    setReportsEdit(false)
    setReportsDelete(false)
    setMessagesView(false)
    setMessagesAdd(false)
    setMessagesEdit(false)
    setMessagesDelete(false)
    history.push(window.location.pathname);


    
  };

  const addCustomer = (e) => {
    e.preventDefault();
    console.log(id)
    setName(null);
    setEmail(null);
    setPassword(null);
    setCustomersView(false)
    setCustomersAdd(false)
    setCustomersEdit(false)
    setCustomersDelete(false)
    setEventView(false)
    setEventAdd(false)
    setEventEdit(false)
    setEventDelete(false)
    setSegmentsView(false)
    setSegmentsAdd(false)
    setSegmentsEdit(false)
    setSegmentsDelete(false)
    setCampaignsView(false)
    setCampaignsAdd(false)
    setCampaignsEdit(false)
    setCampaignsDelete(false)
    setReportsView(false)
    setReportsAdd(false)
    setReportsEdit(false)
    setReportsDelete(false)
    setMessagesView(false)
    setMessagesAdd(false)
    setMessagesEdit(false)
    setMessagesDelete(false)
    history.push(window.location.pathname);
  }
  return (
    <div>
      <CardHeader>{id ? 'Edit' : 'Create'} Users</CardHeader>
      <Form onSubmit={createUsers}>
        <CardBody>

          <FormGroup>
            <Label><b>Name</b></Label>
            <Input value={name || ''} onChange={(e) => setName(e.target.value)} required />
          </FormGroup>
          <FormGroup>
            <Label><b>Email</b></Label>
            <Input
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              pattern="[^ @]*@[^ @]*"
              required
            />
          </FormGroup>
          <FormGroup>
          
              <div>
                <Label><b>Password</b></Label>
                <Input value={password || ''} onChange={(e) => setPassword(e.target.value)} type="password" minLength="8" required />
              </div>
          </FormGroup>



          <Label> <b> Permissions</b></Label>


          <Table hover>
            <thead>
              <tr>
                <th >Feature</th>
                <th className="text-center">View</th>
                <th className="text-center">Add</th>
                <th className="text-center">Edit</th>
                <th className="text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Customers</th>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={CustomersView} onChange={() => setCustomersView(!CustomersView)} />
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={CustomersAdd} onChange={() => setCustomersAdd(!CustomersAdd)} />
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={CustomersEdit} onChange={() => setCustomersEdit(!CustomersEdit)} />
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={CustomersDelete} onChange={() => setCustomersDelete(!CustomersDelete)} />
                  </FormGroup>
                </td>
              </tr>
              <tr>
                <th scope="row">Events</th>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={EventView} onChange={() => setEventView(!EventView)} />
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={EventAdd} onChange={() => setEventAdd(!EventAdd)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={EventEdit} onChange={() => setEventEdit(!EventEdit)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={EventDelete} onChange={() => setEventDelete(!EventDelete)} />

                  </FormGroup>
                </td>
              </tr>
              <tr>
                <th scope="row">Segments</th>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={SegmentsView} onChange={() => setSegmentsView(!SegmentsView)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={SegmentsAdd} onChange={() => setSegmentsAdd(!SegmentsAdd)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={SegmentsEdit} onChange={() => setSegmentsEdit(!SegmentsEdit)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={SegmentsDelete} onChange={() => setSegmentsDelete(!SegmentsDelete)} />

                  </FormGroup>
                </td>
              </tr>

              <tr>
                <th scope="row">Campaigns</th>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={CampaignsView} onChange={() => setCampaignsView(!CampaignsView)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={CampaignsAdd} onChange={() => setCampaignsAdd(!CampaignsAdd)} />
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={CampaignsEdit} onChange={() => setCampaignsEdit(!CampaignsEdit)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={CampaignsDelete} onChange={() => setCampaignsDelete(!CampaignsDelete)} />

                  </FormGroup>
                </td>
              </tr>

              <tr>
                <th scope="row">Reports</th>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={ReportsView} onChange={() => setReportsView(!ReportsView)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={ReportsAdd} onChange={() => setReportsAdd(!ReportsAdd)} />
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={ReportsEdit} onChange={() => setReportsEdit(!ReportsEdit)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={ReportsDelete} onChange={() => setReportsDelete(!ReportsDelete)} />

                  </FormGroup>
                </td>
              </tr>

              <tr>
                <th scope="row">Messages</th>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={MessagesView} onChange={() => setMessagesView(!MessagesView)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={MessagesAdd} onChange={() => setMessagesAdd(!MessagesAdd)} />
                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={MessagesEdit} onChange={() => setMessagesEdit(!MessagesEdit)} />

                  </FormGroup>
                </td>
                <td className="text-center">
                  <FormGroup check>
                    <Input type="checkbox" checked={MessagesDelete} onChange={() => setMessagesDelete(!MessagesDelete)} />
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>

          <FormGroup>
  <div className="row">
    <div className="col-md-2 mb-3">
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </div>
    <div className="col-md-10 mb-3">
      {id && (
        <button className="btn btn-primary" type="submit" onClick={addCustomer}>
          Add New Customer
        </button>
      )}
    </div>
  </div>
</FormGroup>
        </CardBody>

      </Form>
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