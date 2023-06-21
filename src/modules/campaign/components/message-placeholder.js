import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { getCustomerSchema, getEventSchema, getScheduleSchema } from '../../schema/action';
import { bindActionCreators } from 'redux'

function MessagePlaceholder({ customerSchema, getCustomerSchema, onClick, placeholderData, eventFields, getScheduleSchema, scheduleSchema, scheduleFields }) {
  const [placeholders, setPlaceholders] = useState();
  const [eventProperties, setEventProperties] = useState();
  const [scheduleProperties, setScheduleProperties] = useState();
  useEffect(() => {
    getCustomerSchema();
    getEventSchema();
    getScheduleSchema();
  }, [getCustomerSchema, getEventSchema, getScheduleSchema])

  useEffect(() => {
    if (placeholderData) {
      // eslint-disable-next-line 
      placeholderData = Object.assign(customerSchema)
      setPlaceholders(placeholderData)
    } else {
      setPlaceholders(customerSchema)
    }
  }, [placeholderData, customerSchema])

  useEffect(() => {
    console.log("SCHEDULE INSIDE EVENT", scheduleFields);
    if (placeholderData) {
      let eventsAttributes = eventFields && Object.keys(eventFields).map((dt) => {
        if (dt.split('payload.')[1]) {
          return dt.split('payload.')[1]
        }
      })
      setEventProperties(eventsAttributes);
    }
  }, [eventFields, placeholderData])

  useEffect(() => {
    if (scheduleFields != '') {
      let schemaFields = scheduleSchema[Object.keys(scheduleSchema)[0]].subfields;
      let scheduleAttributes = schemaFields && Object.keys(schemaFields).map((dt) => {
        if (dt.split('payload.')[1]) {
          return dt.split('payload.')[1]
        }
      })
      setScheduleProperties(scheduleAttributes);
    }
  }, [scheduleFields])

  return (
    <>
      <div className='d-flex gap-1 flex-wrap mb-2'>
        {scheduleFields && scheduleFields != '' ? scheduleProperties && scheduleProperties.map((dt, index) => <Button size='sm' onClick={onClick} key={index} color="secondary" value={dt} outline>{dt}</Button>) : ""}
        {placeholderData && placeholderData ? eventProperties && eventProperties.map((d, index) => <Button size='sm' onClick={onClick} key={index} color="secondary" value={d} outline>{d}</Button>) : ""}
      </div>
      <div className='d-flex gap-1 flex-wrap'>
        {placeholders && Object.keys(placeholders).map((key, index) => <Button size='sm' onClick={onClick} key={index} color="primary" value={key} outline>{key}</Button>)}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    customerSchema: state.schema.customerSchema,
    eventSchema: state.schema.eventSchema,
    scheduleSchema: state.schema.scheduleSchema
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCustomerSchema,
    getEventSchema,
    getScheduleSchema
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePlaceholder);