import React from 'react';

const ButtonBar = ({ children, ...props }) => {
    return <div className='d-flex gap-1' props>
        {children}
    </div>;
}

export default ButtonBar;