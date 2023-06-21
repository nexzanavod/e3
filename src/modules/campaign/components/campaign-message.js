import React, { useRef, useState } from 'react'
import { Col, Row, Button,Label } from 'reactstrap';
import ButtonBar from '../../../components/ButtonBar';
import MessagePlaceholder from './message-placeholder';
import insertTextAtCursor from 'insert-text-at-cursor';


function CampaginMessage({onChange,value,placeholderData,eventFields,scheduleFields}) {
    const [activeIcon, setActiveIcon] = useState('1');
    const toggle = (icon) => {
        if (activeIcon !== icon) setActiveIcon(icon);
    }
    const ref = useRef();

    const utils = {
        // "1": {
        //     icon: "fa-address-card",
        //     component: <MessagePlaceholder onClick={onClick}/>
        // },
        // "2": {
        //     icon: "fa-paperclip",
        //     component: <MessageAttachment />
        // },
        // "3": {
        //     icon: "fa-hand-pointer-o",
        //     component: <MessageCallToAction />
        // }
    }

    const handleMessagePlaceholder = (value) =>{
        let placeholder =  '${'+value+"}";
        insertTextAtCursor(ref.current, placeholder);
    }

    return (
        <Row>
            <Col md="6">
                <Label>Message <span className="red-asterisk">*</span></Label>
                <textarea className='form-control' maxlength="990" onChange={onChange} value={value} ref={ref} rows={8} required></textarea>
            </Col>
            <Col md="6">
                <ButtonBar>
                    {Object.keys(utils).map((a) => (
                        <Button key={a} size='xs' color='primary' outline={activeIcon !== a} onClick={() => { toggle(a) }}><i className={`fa ${utils[a].icon}`}></i></Button>
                    ))}
                </ButtonBar>
                <div className="mt-4 p-3 shadow-sm bg-light">
                    <MessagePlaceholder onClick={(e) =>{handleMessagePlaceholder(e.target.value)}} placeholderData={placeholderData} eventFields={eventFields} scheduleFields={scheduleFields}/>
                    {/* {utils[activeIcon].component} */}
                </div>
            </Col>
        </Row>
    )
}

export default CampaginMessage