import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { CardBody, Card } from 'reactstrap'
import EventCsvImporter from './customer-products-csv-importer'
import { bindActionCreators } from 'redux';
import { getEventSchema,getCustomerProductSchema } from '../../schema/action'
import StepZilla from "react-stepzilla";
import Page from '../../../components/Page'
import CustomerProductsCsvImporter from './customer-products-csv-importer'


function EventsBulkUpload({ events, getCustomerProductSchema, customerProductSchema }) {
  const [options, setOptions] = useState();
  const [importer, setImporter] = useState("");

  useEffect(() => {
    getCustomerProductSchema();
  }, [getCustomerProductSchema])

  useEffect(() => {
    console.log(customerProductSchema);
    let optArr = [];
    customerProductSchema && Object.keys(customerProductSchema).forEach((key) => {
      customerProductSchema[key].label = key;
      customerProductSchema[key].value = key
      optArr.push(customerProductSchema[key]);
    })
    console.log("OPTION ARRAY", optArr)
    setOptions(optArr);
  }, [customerProductSchema])

  const steps = [
    {
      name: 'Step 1', component: <div className='col-md-4 offset-md-4 pt-5'>
        <Select
          options={options}
          onChange={(e) => { setImporter(e) }}
        />
      </div>
    },
    { name: 'Step 2', component: <CustomerProductsCsvImporter schema={importer} /> },
  ]

  return (
    <Page title="Upload Bulk Customer Products">
      <Card className='px-3 '>
    <div>
      <CardBody>
        <div className='step-progress ms-2'>
          <StepZilla steps={steps} />
        </div>
      </CardBody>
    </div>
    </Card>
    </Page>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.schema.schema.events,
    customerProductSchema:state.schema.customerProductSchema
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCustomerProductSchema
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsBulkUpload);