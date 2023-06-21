import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Page from '../../../components/Page'
import UsersCreate from '../components/create';
import UserView from '../components/view';
import Updated from '../components/updated';
const { REACT_APP_AMANA_ADMIN_USERS } = process.env;


function Automation() {
    const [selected, select] = useState();
    const history = useHistory();
    const onChange = (e) => {
        select(e)
        history.push({
            pathname: '/automations',
            search: `?automationId=${e.id}`
        })
    }

    const object = JSON.parse(localStorage.getItem('auth'));
    const userId = object.id;

    const userID = REACT_APP_AMANA_ADMIN_USERS;
    const idArray = userID.split(',');

    return (
        <Page title="Users">



            {idArray.includes(userId) ? (
                <div className='d-flex'>
                    <div style={{ width: 340 }} className="me-3">

                        <Card>
                            <CardBody className='p-0'>
                                <UserView selected={selected} onSelect={onChange} />
                            </CardBody>
                        </Card>

                    </div>
                    <div className='flex-grow-1'>
                        <Card>

                            <CardBody>
                                <UsersCreate />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            ) : (
                <Updated/>
            )}




        </Page>
    )
}

export default Automation;