import React, { useEffect, useState } from 'react'
import { searchEvents,getEvents } from '../action';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';


function EventTab({ event, customerId, searchEvents, eventSchema,getEvents }) {
  const [events, setEvent] = useState([]);
  const [columns, setColumns] = useState([]);

  console.log("searchEvents",event)
  useEffect(() => {
    if (event)
      getEvents({id:customerId,searchTerm:event}, (data) => {
        let dataArr = data?.map((dt) =>{
          return dt;
        })
        setEvent(dataArr)
        console.log("data",dataArr)
      });
       // eslint-disable-next-line 
  }, [event, searchEvents])


  useEffect(() => {
    if (eventSchema) {
      const schema = eventSchema[event];
      const col = [{
        dataField: 'time',
        text: 'Timestamp',
        sort: true,
        formatter: (cell) => {
          return moment(cell).format("YYYY-MM-DD HH:mm:ss")
        }
      }];

      if (schema && schema.subfields) {
        Object.keys(schema.subfields).forEach(key => {
          col.push({
            dataField: key,
            text: schema.subfields[key].label,
            hidden: schema.subfields[key].hidden
          });
        })
      } else {
        col.push({
          dataField: "payload",
          text: "Payload",
          formatter: (cell) => {
            return <pre className='wrapped-pre'>{JSON.stringify(cell, null, 2)}</pre>
          }
        });
      }

      setColumns(col);
    }
  }, [eventSchema, event])

  return (
    <div>
      {events.length ?
        <ToolkitProvider
          keyField="id"
          data={events}
          columns={columns}
          search={{
            searchFormatted: true
          }}
        >
          {
            props => (
              <div className='mt-3'>
                <BootstrapTable
                  {...props.baseProps}
                />
              </div>
            )
          }
        </ToolkitProvider> : "No events found"}
    </div>

  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    searchEvents,
    getEvents
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    events: state.customers.searchEvents,
    eventSchema: state.schema.eventSchema
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventTab); 