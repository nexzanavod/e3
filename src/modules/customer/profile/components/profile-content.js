import React, { useEffect, useState } from 'react'
import _ from 'lodash';
import {getCustomerSchema, getEventSchema} from '../../../schema/action';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';

function ProfileContent({ customerProfile,getEventSchema,customerSchema,getCustomerSchema}) {
    const [schema,setSchema] = useState([]);
    useEffect(() =>{
        getCustomerSchema();
        getEventSchema();
    },[getCustomerSchema,getEventSchema])

    useEffect(() =>{
        if(Object.keys(customerSchema).length > 0 ){
            const fetchSchemaData = () =>{
                let labelArr = [];
                Object.keys(customerSchema).forEach((dt) =>{
                    labelArr.push(customerSchema[dt]);
                })
                // Object.keys(pii).forEach((dt) =>{
                //     piiLabelArr.push(pii[dt]);
                // })
                setSchema(labelArr);
                // setSchemaPii(piiLabelArr)
            }
            fetchSchemaData();
        }
    },[customerSchema])

    const convertDateOfBirth = (dateStr) => {
        return moment.utc(dateStr).format('YYYY-MM-DD');
    }

    return (
        <div className='mt-3'>
            <h2>
       
                {  customerProfile && Object.keys(customerProfile).map((key) => (
                         key === 'name' && schema?.forEach((dt) =>{
                                delete customerProfile._id
                                if(dt.primaryValue){
                                    return customerProfile[(_.lowerCase(dt.label))];
                                }else if(dt.secondaryValue){
                                    return customerProfile[(_.lowerCase(dt.label))];
                                }
                            })
                ))}
            </h2>
            {
                    customerProfile && Object.keys(customerProfile).map((key) => (
                        <p className="mt-2 mb-0">
                            <small>
                            { customerSchema && Object.keys(customerSchema).map((dt) =>(
                                (dt === key) ? customerSchema[dt].labelHidden ? '': _.upperCase(customerSchema[dt].label):''
                            ))}
                            </small>
                            <br/>
                            <b>
                            { customerSchema && Object.keys(customerSchema).map((dt) =>(
                                (dt === key) && customerProfile[dt] ?  customerSchema[dt].type === 'date' ? convertDateOfBirth(customerProfile[key]) :customerProfile[key] : ''
                            ))}
                            </b>
                        </p>
                    ))
                     
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log("REDUX", state)
    return {
        customerSchema:state.schema.customerSchema
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getEventSchema,
        getCustomerSchema
    }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileContent);