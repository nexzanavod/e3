import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { CardBody, Card } from 'reactstrap'
import EventCsvImporter from './event-csv-importer'
import { bindActionCreators } from 'redux';
import { getEventSchema } from '../../schema/action'
import StepZilla from "react-stepzilla";
import Page from '../../../components/Page'


function EventsBulkUpload({ events, getEventSchema, eventSchema }) {
  const [options, setOptions] = useState();
  const [importer, setImporter] = useState("");

  useEffect(() => {
    getEventSchema();
  }, [getEventSchema])

  useEffect(() => {
    let optArr = [];
    eventSchema && Object.keys(eventSchema).forEach((key) => {
      eventSchema[key].label = key;
      eventSchema[key].value = key
      optArr.push(eventSchema[key]);
    })
    console.log("OPTION ARRAY", optArr)
    setOptions(optArr);
  }, [eventSchema])

  const steps = [
    {
      name: 'Step 1', component: <div className='col-md-4 offset-md-4 pt-5'>
        <Select
          options={options}
          onChange={(e) => { setImporter(e) }}
        />
      </div>
    },
    { name: 'Step 2', component: <EventCsvImporter schema={importer} /> },
  ]

  return (
    <Page title="Upload Bulk Customer Events">
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
    eventSchema: state.schema.eventSchema,
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getEventSchema
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsBulkUpload);