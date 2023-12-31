import React, { useEffect } from 'react'
import { Importer, ImporterField } from 'react-csv-importer'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { getCustomerSchema } from '../../../schema/action';
import { updateCustomers } from '../../../customer/action';

function UploadContactsCampaign({onChange,getCustomerSchema,customerSchema,updateCustomers}) {
    useEffect(() =>{
        getCustomerSchema();
    },[getCustomerSchema])

    // const bulkUpload = (data) =>{
    //     let contact = [];
    //     data.forEach((dt) =>{
    //         let identity = {}
    //         contact.push(dt.mobile)
    //     })
    //     console.log(contact);
    //     onChange(contact);
    // }

    const bulkUpload = (data) =>{
        
        data.forEach((dt) =>{
            let identity = {}
            customerSchema && Object.keys(customerSchema).forEach((key) =>{
                if(customerSchema[key].isPii){
                    identity[key] = dt[key] ? dt[key] : "";
                }
            })
            let identify = Object.values(identity)[0];
            updateCustomers(identify,dt)
        })
    }
  return (
    <div className='md-8 col-md-8'>
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
                    bulkUpload(rows)
                    // mock timeout to simulate processing
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }}
                onComplete={({ file, fields }) => {
                    // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
                    console.log("finished import of file", file, "with fields", fields);
                }}
                onClose={() => {
                    // optional, invoked when import is done and user clicked "Finish"
                    // (if this is not specified, the widget lets the user upload another file)
                    console.log("importer dismissed");
                }}
                >
                {customerSchema && Object.keys(customerSchema).map((key) =>(
                    <ImporterField name={key} label={customerSchema[key].label} optional     />
                ))}
                {/* <ImporterField name="mobile" label="mobile" optional     /> */}
            </Importer>
    </div>
  )
}

const mapStateToProps = (state) =>{
    return {
        customerSchema:state.schema.customerSchema,
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        updateCustomers,
        getCustomerSchema
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadContactsCampaign);