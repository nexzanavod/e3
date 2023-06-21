import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Page from '../../../components/Page'
import AutomationCreate from '../components/automation-create';
import AutomationView from '../components/view';

function Automation() {
    const [selected, select] = useState();
    const history = useHistory();
    const onChange = (e) =>{
        select(e)
        history.push({
            pathname:'/automations',
            search:`?automationId=${e.id}`
        })
    }
    return (
        <Page title="Automations">
            <div className='d-flex'>
                <div style={{ width: 340 }} className="me-3">
                    <Card>
                        <CardBody className='p-0'>
                            <AutomationView selected={selected} onSelect={onChange} />
                        </CardBody>
                    </Card>
                </div>
                <div className='flex-grow-1'>
                    <Card>
                        <CardHeader>
                            {selected ? "Edit" : "Create"} Automation
                        </CardHeader>
                        <CardBody>
                            <AutomationCreate />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </Page>
    )
}

export default Automation;