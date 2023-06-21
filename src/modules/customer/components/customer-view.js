import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { getAllCustomer } from '../action';
import { getCustomersBySegment,removeCustomerFromSegment } from '../../segment/actions';
import { getSchema } from '../../schema/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCustomerSchema } from '../../schema/action';
import { Button, Card } from 'reactstrap';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import loadingGif from "../../../assets/gif/cusloadingif.gif"; 
const BASIC_SEGMENT = "BASIC_SEGMENT";
const RULED_SEGMENT = "RULED_SEGMENT";
const INITIAL_PAGE = 1;
const INITIAL_PAGESIZE = 10


function CustomerView({getAllCustomer,customerData,customerCount,customersBySegment,getCustomersBySegment,getSchema,schemaData,getCustomerSchema,customerSchema,removeCustomerFromSegment,countBySegment}) {
    const { SearchBar } = Search;
    const [data, setData] = useState([]);
    const { search } = useLocation();
    const { segment,type } = queryString.parse(search)
    const [columns, setColumns] = useState([]);
    const [searchTerm,setSearchTerm] = useState();
    const history = useHistory();
    useEffect(() =>{
        getCustomerSchema();
    },[getCustomerSchema])

    // comment added
    useEffect(() =>{
        if(Object.keys(customerSchema).length > 0 ){
            const getSchemaData = () =>{
                    let columnsArr = customerSchema ?  changeSchemaPropertiesRelateTable(customerSchema) : '';
                    const actionButtonsArr = [
                        {
                            dataField: "id",
                            text: "",
                            classes: "text-right",
                            formatter: (cell) => (
                                <div className='d-flex gap-1 justify-content-end'>
                                    <Button outline color="primary" size='xs' onClick={() => { rowEvents(cell) }} ><i className='fa fa-eye'></i></Button>
                                    {/* <Button outline color="primary" size='xs' onClick={() => { editRowEvent(cell) }} ><i className='fa fa-pencil'></i></Button> */}
                                    {(segment && type && type === BASIC_SEGMENT) ? <Button outline color="danger" size='xs' onClick={() => {removeFromSegment(cell)}} ><i className='fa fa-minus'></i></Button> : ""}
                                </div>
                            ),
                            sort: true,
                        }
                    ]
                    columnsArr = [...columnsArr,...actionButtonsArr];
                    setColumns(columnsArr);
            }
            getSchemaData();
        }
         // eslint-disable-next-line 
    },[schemaData,customerSchema,type,segment])


    const changeSchemaPropertiesRelateTable  =  (anonymouseObj) =>{
        let columnsArr = [];
        Object.keys(anonymouseObj).forEach((key) => {
            let attriPiiObjects = anonymouseObj[key];
            //change schema label key into text in order to react bootstrap table
            if (attriPiiObjects.label) {
                attriPiiObjects.text = attriPiiObjects.label
                attriPiiObjects.dataField = key;
                 // eslint-disable-next-line 
                if (attriPiiObjects.hidden != '') {
                    attriPiiObjects.hidden = true;
                } else {
                     // eslint-disable-next-line 
                    attriPiiObjects.hidden = attriPiiObjects.hidden;
                }
                delete attriPiiObjects.label;
            }
            columnsArr.push(attriPiiObjects);

        })
        return columnsArr;
    }

    useEffect(() => {
        if (!segment) {
            getAllCustomer(INITIAL_PAGE,INITIAL_PAGESIZE);
        } else {
            getCustomersBySegment(segment,INITIAL_PAGE,INITIAL_PAGESIZE);
        }
    }, [segment, getAllCustomer, getCustomersBySegment]);

    useEffect(() => {
        const fetchCustomerData = (dtArr) => {
                let dataArr = [];
                dtArr?.forEach((cus) => {
                        let dataObj = {};
                        if(cus){
                            dataObj =  { ...cus} 
                        }
                        dataObj.id = cus._id;
                        dataObj.dob = convertDateOfBirth(cus.dob);
                        dataArr.push(dataObj);
                });
                setData(dataArr);
        }
        if (!segment) {
            fetchCustomerData(customerData);
        } else {
            fetchCustomerData(customersBySegment);
        }
    }, [customerData, segment, customersBySegment]);

    const editRowEvent = (id) => {
        history.push({
            pathname: '/customer/create',
            search: `?id=${id}`
        })
    }
    const rowEvents = (id) => {
        history.push(`/customer/profile/${id}`)
    };

    const removeFromSegment = (id) =>{
        if(segment){
            let objDt = {
                customerId:id,
                segmentId:segment
            }
            removeCustomerFromSegment(objDt)
        }        
    }
    const convertDateOfBirth = (dateStr) => {
        return moment(dateStr).format('YYYY-MM-DD');
    }

    const handleTableChange = (type, { page, sizePerPage }) => {
        // Handle page change event
        if (type === 'pagination') {
            if (!segment) {
                getAllCustomer(page, sizePerPage);
            } else {
                getCustomersBySegment(segment,page, sizePerPage);
            }
        }
    };

    const searchCustomers = () => {
        getAllCustomer(INITIAL_PAGE,INITIAL_PAGESIZE,searchTerm)   
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {!customerData ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={loadingGif} alt="Loading" style={{ margin: "auto" }} />
            {/* <h4 style={{ textAlign: "center" }}>Please wait, Customers are Updating...</h4> */}
          </div>
  ) : (
    <div className="w-100 card customer-view">
        <div className="d-flex align-items-center gap-2 mb-0 m-4">
            <input className='form-control' placeholder='Search By Name' style={{width:'300px'}} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />
            <Button color='primary' onClick={searchCustomers} >Search</Button>
        </div>
      {columns.length && Object.keys(data).length !== 0 ? (
        <ToolkitProvider   
          keyField="id"
          data={data}
          columns={columns}
          search={{
            searchFormatted: true
          }}
        >
          {props => (
            <div className="m-4 w-100">
              {/* <div className="d-flex align-items-center gap-2 mb-1">
                <SearchBar {...props.searchProps} />
                <input className='form-control' style={{width:'300px'}} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  />
                <Button color='primary' onClick={searchCustomers} >Search</Button>
              </div> */}
              <BootstrapTable
                classes="tbl-striped"
                bordered={false}
                keyField="id"
                remote
                onTableChange={handleTableChange}
                pagination={paginationFactory({ sizePerPage: 10, totalSize: !segment ? customerCount : countBySegment ? countBySegment: "" })}
                {...props.baseProps}
              />
            </div>
          )}
        </ToolkitProvider>
      ) : null}
    </div>
  )}
</div>
    )
}

const mapStateToProps = (state) => {
    console.log("REDUX", state)
    return {
        customerData: state.customers.customers.data?.rows,
        customerCount: state.customers.customers.data?.total,
        customersBySegment: state.segments.customersBySegment?.data,
        countBySegment: state.segments.customersBySegment?.total,
        schemaData:state.schema.schema,
        customerSchema:state.schema.customerSchema,
        customerPii:state.customers.customerProfile.pii,
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllCustomer,
        getCustomersBySegment,  
        getSchema,
        getCustomerSchema,
        removeCustomerFromSegment,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerView)