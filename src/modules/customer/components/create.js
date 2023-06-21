import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { Button, CardBody, Card, Form, Row, Col} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { getSchema } from '../../schema/action';
import { updateCustomers, getCustomerById } from '../action';
import { getCustomerSchema } from '../../schema/action';
import DropDown from './dropdown';
import MultipleInputs from './multiple-inputs';
import moment from 'moment';
import Page from '../../../components/Page'
import Swal from 'sweetalert2';


function CustomerCreate({ getSchema, getCustomerSchema, updateCustomers, attributes, pii, getCustomerById, customerData, customerAttributes, customerPii, customerSchema,customerProfile }) {
    const [inputValues, setInputValues] = useState({})
    const { search } = useLocation();
    const { id } = queryString.parse(search)
    let history = useHistory();
    useEffect(() => {
        getSchema();
        getCustomerSchema();
    }, [getSchema, getCustomerSchema])

    useEffect(() => {
        if (id) {
            getCustomerById(id , (data) =>{
                setInputValues(data)
            });
        }
    }, [getCustomerById, id])

    // useEffect(() => {
    //     if (customerProfile) {
    //         setInputValues(customerProfile);
    //     }
    // }, [customerProfile])

    const convertDateOfBirth = (dateStr) => {
        return moment(dateStr).format('YYYY-MM-DD');
    }

    // useEffect(() => {
    //     if (customerPii) {
    //         let multiValue = [];
    //         pii && Object.keys(pii).map((key) => {
    //             if (pii[key].inputType === 'multiple') {
    //                 multiValue.push(key);
    //             }
    //         })
    //         let piiArr = [];
    //         let multiArr = [];
    //         let obj = {};
    //         customerPii.map((dt) => {
    //             if (dt.type.includes(multiValue)) {
    //                 multiArr.push(dt.value)
    //                 obj[dt.type] = multiArr;
    //             } else {
    //                 obj[dt.type] = dt.value;
    //             }
    //             piiArr.push(obj);
    //         })
    //         console.log("dddddd", piiArr)
    //         setPiiInputValues(piiArr[0])

    //     }
    // }, [customerPii, customerSchema])
    const handleChange = (id, value) => {
        setInputValues({
            ...inputValues,
            [id]: value
        })
    }

    const createCustomer = (e) => {
        e.preventDefault();
        let identity = {}
        customerSchema && Object.keys(customerSchema).forEach((key) => {
            if (customerSchema[key].isPii) {
                if (customerSchema[key].inputType === 'multiple') {
                    identity[key] = inputValues[key] ? inputValues[key][0] : "";
                } else {
                    identity[key] = inputValues[key];
                }
            }
        })

        let identify = Object.values(identity)[0];
        updateCustomers(identify, inputValues)
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Campaign ${id ? 'Edited' : 'Inserted'} Successfully`
        }).then(() => {
            history.push("/customer")
            setInputValues("");
        })
       
    }
    return (
        <Page title=  {id ? "Edit Customer" : "Create Customers"}  >
      <Card className='px-3 '>
        <div>
            <CardBody>
                <Form onSubmit={createCustomer} >
                    <Row>
                        {customerSchema && Object.keys(customerSchema).map((key) => {
                            return (
                                <Col key={key} md="4">
                                    <label for="formGroupExampleInput" className="form-label mb-0">{customerSchema[key].label}</label>
                                    {customerSchema[key].inputType === 'multiple' ? (
                                        <MultipleInputs type={customerSchema[key].type} id={key} onChange={(value) => handleChange(key, value)} value={inputValues ? inputValues[key] : [""]} />
                                    ) : customerSchema[key].type === 'select' ? (
                                        <DropDown data={customerSchema[key].fieldSettings} id={key} onChange={handleChange} value={inputValues[key]} />
                                    ) : (
                                        <input
                                            type={customerSchema[key].type}
                                            className="form-control  mb-3"
                                            placeholder={customerSchema[key].label}
                                            value={customerSchema[key].type === 'date' ? inputValues[key] ? convertDateOfBirth(inputValues[key]) : "": inputValues[key]}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                        />
                                    )}
                                </Col>
                            )
                        })}
                    </Row>
                    <div className='text-right'>
                        <Button color='primary' >{id ? "Update" : "Create"}</Button>
                    </div>
                </Form>
            </CardBody>
        </div>
        </Card>
        </Page>
    )
}

const mapStateToProps = (state) => {
    console.log("REDUX REDUX",state);
    return {
        attributes: state.schema.schema.attributes,
        pii: state.schema.schema.pii,
        customerSchema: state.schema.customerSchema,
        customerAttributes: state.customers.customerProfile.attributes,
        customerPii: state.customers.customerProfile.pii,
        customerProfile:state.customers.customerProfile
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getSchema,
        updateCustomers,
        getCustomerById,
        getCustomerSchema
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCreate);