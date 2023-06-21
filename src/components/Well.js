import React from 'react';

const Well = ({ children, title, bg = "bg-light" }) => {
    return <div className={`rounded p-3 mb-4 ${bg} shadow-sm`}>
        {title ? <div className='mb-3'><h6 className="text-primary">{title}</h6></div> : ""}
        <div>
            {children}
        </div>
    </div>;
}

export default Well;