import React, { useEffect } from 'react';
import Page from '../../../components/Page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router-dom';
import { getAllCustomer } from '../action';
import { getCustomersBySegment } from '../../segment/actions';
import { getSchema, getCustomerSchema } from '../../schema/action';
import { getUser } from '../../user/actions';
import CustomerView from '../components/customer-view';
import { Card } from 'reactstrap';

function Customers({
  getSchema,
  getCustomerSchema,
  customerSchema,
  getUser,
  user,
}) {
  const history = useHistory();
  const object = JSON.parse(localStorage.getItem('auth'));
  const userId = object.id;

  useEffect(() => {
    getSchema();
    getCustomerSchema();
    getUser(userId);
  }, [getSchema, getCustomerSchema, getUser]);

  const createCustomers = () => {
    history.push({
      pathname: '/customer/create',
    });
  };

  const createBulkCustomerUpload = () => {
    history.push({
      pathname: '/customer/bulkupload',
    });
  };

  const actions = [
    {
      label: 'Create Customer',
      action: createCustomers,
    },
    {
      label: 'Upload Customers',
      action: createBulkCustomerUpload,
    },
  ];

  const customersView = user?.permissions?.[0]?.customers?.view;
    const showCustomerView = customersView && customerSchema;

  return (
    <Page title="Customers">
      {showCustomerView ? (
        <Card>
          <CustomerView />
        </Card>
      ) : (
        <p>Access to this page is not granted</p>
      )}
    </Page>
  );
}

const mapStateToProps = (state) => {
  return {
    customerData: state.customers.customers,
    customersBySegment: state.segments.customersBySegment,
    schemaData: state.schema.schema,
    customerSchema: state.schema.customerSchema,
    customerPii: state.customers.customerProfile.pii,
    user: state.users.user,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getAllCustomer,
      getCustomersBySegment,
      getSchema,
      getCustomerSchema,
      getUser,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
