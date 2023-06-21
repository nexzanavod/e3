import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { getAutomation,deleteAutomation } from '../actions';

function AutomationView({getAutomation,automations,selected,deleteAutomation}) {
    const [data,setData] = useState([]);
    const history = useHistory();
    useEffect(() =>{
        getAutomation();
    },[getAutomation])

const editUsers = (id) =>{
    history.push({
        pathname: '/users',
        search: `?id=${id}`
    })
}

    useEffect(() =>{
        const fetchAutomation = (automations) =>{
            const automationArr = automations?.map((dt) =>{
                let obj = {}
                obj.id = dt._id;
                obj.name = dt.name;
                return obj;
            })
            setData(automationArr);
        }
        fetchAutomation(automations);
    },[automations])
    
    const removeAutomation = (id) =>{
        if (window.confirm("Are you sure you want to delete this user?")) {
            deleteAutomation(id)
        }
    }
    
    return (
        <ListGroup flush>
            {data.map((row) => <ListGroupItem active={selected?.id === row.id} key={ row.id} className='d-flex align-items-center justify-content-between'>
                <div>
                    {row.name}
                </div>
                <span className='list-item-buttons ms-2 p-1 capsule bg-white gap-1'>
                    {/* <Button outline color='primary' size='xs' ><i className='fa fa-users'></i></Button> */}
                    <Button outline color='primary' size='xs' onClick={() => editUsers(row.id)}><i className='fa fa-pencil'></i></Button>
                    <Button outline color='danger' size='xs' onClick={() => removeAutomation(row.id)}><i className='fa fa-trash'></i></Button>
                </span>
            </ListGroupItem>)}
        </ListGroup>
    )
}
const mapStateToProps = (state) =>{
    return {
      automations:state.automations.automations
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        getAutomation,
        deleteAutomation
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(AutomationView);