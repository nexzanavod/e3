import React, { useEffect, useState } from 'react'
import { Importer, ImporterField } from "react-csv-importer";
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import {bindActionCreators}  from 'redux';
import { getSchema,getCustomerProductSchema,getCustomerSchema } from '../../schema/action';
import { insertCustomerProducts } from '../action';

function CustomerProductsCsvImporter({schema,customerSchema,customerProductSchema,getCustomerProductSchema,getCustomerSchema,insertCustomerProducts}) {
    const [eventSubfield,setEventSubfield] = useState({})
    const [eventName,setEventName] = useState("");
    const history = useHistory();

    useEffect(() =>{
        getCustomerProductSchema();
        getCustomerSchema();
    },[getCustomerProductSchema,getCustomerSchema])

    useEffect(() =>{
        if(schema){
            setEventName(schema.label);
            let subfields = schema.subfields;
            subfields && Object.keys( subfields).forEach((key) =>{
                if(key.startsWith('payload.')){
                    let replaced_key = key.replace('payload.','');
                    subfields[replaced_key] = subfields[key];
                    delete subfields[key];
                }
            })
            setEventSubfield(subfields)
        }
    },[customerProductSchema])

    const bullkEventsUpload = (data) =>{
        data.forEach((dt) =>{
            let customerProductObj = {
                time:dt.time,
                product:dt.policy_number,
                payload:dt
            }
            delete customerProductObj.payload.time
            delete customerProductObj.payload.nic
            customerSchema && Object.keys(customerSchema).forEach((key) =>{
                if(customerSchema[key].isPii){
                    customerProductObj[key] = dt[key];
                }
            })

            customerProductSchema && Object.keys(customerProductSchema).forEach((key) =>{
                if(customerProductSchema[key].isPii){
                    customerProductObj[key] = dt[key];
                    delete customerProductObj.payload[key]
                }
            })
            console.log(customerProductObj)
            insertCustomerProducts(customerProductObj);
        })
    }

    return (
        <div className='ms-3'>
            <Importer
                chunkSize={10000} // optional, internal parsing chunk size in bytes
                assumeNoHeaders={false} // optional, keeps "data has headers" checkbox off by default
                restartable={false} // optional, lets user choose to upload another file when import is complete
                onStart={({ file, fields }) => {
                    // optional, invoked when user has mapped columns and started import
                    console.log("starting import of file", file, "with fields", fields);
                }}
                processChunk={async (rows) => {
                    // required, receives a list of parsed objects based on defined fields and user column mapping;
                    // may be called several times if file is large
                    // (if this callback returns a promise, the widget will wait for it before parsing more data)
                    console.log("received batch of rows", rows);
                    bullkEventsUpload(rows)
                    // mock timeout to simulate processing
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }}
                onComplete={({ file, fields }) => {
                    // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
                    console.log("finished import of file", file, "with fields", fields);
                    history.push('/customer')
                }}
                onClose={() => {
                    // optional, invoked when import is done and user clicked "Finish"
                    // (if this is not specified, the widget lets the user upload another file)
                    console.log("importer dismissed");
                    history.push('/customer')
                }}
                >
                {customerSchema && Object.keys(customerSchema).map((key) =>(
                    (customerSchema[key].isPii) ?  <ImporterField name={key} label={customerSchema[key].label} optional />   : ""
                ))}
                {eventSubfield && Object.keys(eventSubfield).map((key) =>(
                    <ImporterField name={key} label={eventSubfield[key].label} optional />
                ))}
            </Importer>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        customerSchema:state.schema.customerSchema,
        customerProductSchema:state.schema.customerProductSchema
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getSchema,
        getCustomerSchema,
        getCustomerProductSchema,
        insertCustomerProducts
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomerProductsCsvImporter);