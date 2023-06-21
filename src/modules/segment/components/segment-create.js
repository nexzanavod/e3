import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import CustomerQueryBuilder from '../components/query-builder'
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { saveSegment,getSegmentById,updateSegment } from '../actions';
import { getSchema,getCustomerSchema } from '../../schema/action';
import classnames from 'classnames';
import UploadContactsCampaign from './contacts/upload-contacts-campaign';
import Swal from 'sweetalert2';
const BASIC_SEGMENT = "BASIC_SEGMENT";
const RULED_SEGMENT = "RULED_SEGMENT";
function SegmentCreate({selected,segment,getSegmentById,saveSegment,getSchema,schemaData,getCustomerSchema,customerSchema}) {
    const [name,setName] = useState();
    const [condition,setCondition] = useState();
    const {search} = useLocation();
    const {segmentId,type} = queryString.parse(search)
    const [schema,setSchema] = useState();
    const [contacts,setContacts] = useState();
    const [radioBtnCheck, setRadioBtnCheck] = useState(false);
    const [radioBtnValue, setRadioBtnValue] = useState('RULED_SEGMENT');
    const history = useHistory();

    useEffect(() =>{
        getSchema();
        getCustomerSchema();
    },[getSchema,getCustomerSchema])
  
    useEffect(() =>{
        if(Object.keys(customerSchema).length > 0 ){
            const filterSchemaData = () =>{
                setSchema(customerSchema)
            }
            filterSchemaData();
        }
        console.log("ALL SCHEMA",customerSchema)
    },[customerSchema])

    useEffect(() =>{
        if(segmentId){
            getSegmentById(segmentId);
            if(type === RULED_SEGMENT){
                setRadioBtnCheck(false)
                setRadioBtnValue(type);
            }else{
                setRadioBtnCheck(true)
                setRadioBtnValue(type);
            }
        }
    },[getSegmentById,segmentId,type])

    useEffect(() =>{
        let rule = segment.query ? JSON.parse(segment.query) :"";
        setCondition(rule);
        setName(segment.name)
    },[segment])
    
    const createSegment = (e) => {
        e.preventDefault();
        if(radioBtnValue === BASIC_SEGMENT){
            console.log(name,segmentId)
            saveSegment({ name:name,id:segmentId?segmentId:"", type:BASIC_SEGMENT}, () => {
                cancel();
            });
        }
        if(radioBtnValue === RULED_SEGMENT){
            if (condition) {
                saveSegment({ name:name, query: condition, id:segmentId?segmentId:"",type:RULED_SEGMENT}, () => {
                    cancel();
                });
            }else{
                Swal.fire({
                    icon: 'info',
                    title: 'Fields Empty',
                    text: 'Query cannot be empty'
                })
            }
        }
    }

    const cancel = () =>{
        window.location.href="/segments";
    }

    const handleContactsUpload = (value) =>{
        setContacts(value);
    }

    const handleSelected = (value,status) =>{
        setRadioBtnValue(value);
        setRadioBtnCheck(status)
    }

    return (
        <Card>
            <CardHeader>
              {segmentId ? "Edit" : "Create"} Segment
            </CardHeader>
            <CardBody>
                <Form onSubmit={(e) => createSegment(e)}>
                    <FormGroup>
                        <Label>
                            Name
                        </Label>
                        <Input required onChange={(e) => {setName(e.target.value)}} placeholder='ex: Female customers age between 30 to 40' value={name} />
                    </FormGroup>
                    {/* <Nav  tabs>
                        <NavItem>
                            <NavLink 
                                className={classnames({ active: activeTab === 'ruled' })}
                                onClick={() => { toggle('ruled'); }}
                            >
                                Rule Based
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink 
                                className={classnames({ active: activeTab === 'basic' })}
                                onClick={() => { toggle('basic'); }} 
                            >
                                Basic
                            </NavLink>
                        </NavItem>
                    </Nav> */}
                    <FormGroup check inline>
                        <Label check>
                            <Input 
                                type='radio' 
                                checked={!radioBtnCheck}  
                                id={BASIC_SEGMENT} 
                                name="t" 
                                value={RULED_SEGMENT} 
                                onChange={(e)=>{handleSelected(e.target.value,false)}}  
                            /> Ruled
                        </Label>
                    </FormGroup>
                    {!segmentId && (
                    <FormGroup check inline>
                        <Label check>
                            <Input 
                                type='radio' 
                                checked={radioBtnCheck} 
                                id={BASIC_SEGMENT} 
                                name="t" 
                                value={BASIC_SEGMENT}
                                onChange={(e)=>{handleSelected(e.target.value,true)}}  
                            /> Basic
                        </Label>
                    </FormGroup>
                    )}
                    {!radioBtnCheck ? 
                        (
                            <CustomerQueryBuilder value={condition} segmentId={segmentId?segmentId:""} onChange={(e) => setCondition(e)} segment={selected} schema={schema}  />
                        ):""
                    }
                    {/* <TabContent activeTab={activeTab} >
                        <TabPane tabId="basic" >
                            <UploadContactsCampaign onChange={(e) =>{handleContactsUpload(e)}} />
                        </TabPane>
                        <TabPane tabId="ruled" >
                        </TabPane>
                    </TabContent> */}
                    <div className='d-flex flex-row-reverse d-grid gap-1'>
                        {segmentId ? (
                            <div>
                                <Button type='submit' className='btn-sm mt-3 me-2' color='primary' > Update</Button>
                                <Button onClick={() => cancel()} type="button" className='btn-sm mt-3' color='danger' > Cancel</Button>
                            </div>
                        ):(
                            <div>
                                <Button  type='submit'  className='btn-sm mt-3 me-2' color='primary' > Add</Button>
                                <Button onClick={() => cancel()} type="button" className=' btn-sm mt-3' color='danger' > Cancel</Button>
                            </div>
                        )}
                    </div>
                </Form>
            </CardBody>
        </Card>
    )
}

const mapStateToProps = (state) =>{
    return {
        segment:state.segments.segmentDetail,
        schemaData:state.schema.schema,
        customerSchema:state.schema.customerSchema
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        saveSegment,
        getSegmentById,
        updateSegment,
        getSchema,
        getCustomerSchema
    }, dispatch)
}

    export default connect(mapStateToProps,mapDispatchToProps)(SegmentCreate);