import React from 'react';
import { Button } from 'reactstrap';

const Contacts = () => {
    return <span className='p-1 capsule bg-white mb-3 d-inline-flex d-grid gap-1'>
        <Button color="primary" size='sm' onClick={() => { }} ><i className='fa fa-phone'></i></Button>
        <Button color="primary" size='sm' onClick={() => { }} ><i className='fa fa-comment'></i></Button>
        <Button color="primary" size='sm' onClick={() => { }} ><i className='fa fa-envelope'></i></Button>
    </span>;
}

export default Contacts;