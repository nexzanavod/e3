import React from 'react';
import { Button } from 'reactstrap';
import { CSVLink } from "react-csv";

const Page = (props) => {
  const {
    children, title = "", actions = []
  } = props;


  const renderActionButton= ({ label, color, action, type,data,headers })=>{
    console.log("Ddddddddddd",type)
    if(type==="download"){
      if(data?.length > 0){
        return <CSVLink key={label}  data={data} headers={headers} filename={"hourly-trend.csv"}>
        <Button  color={color || 'primary'}><i className='fa fa-download'></i> {label}</Button>
    </CSVLink>
      }
    }else{
      return <Button key={label} color={color || 'primary'} onClick={action} >{label}</Button>
    }
  }

  return (
    <div className="animated fadeIn">
      <div className='d-flex px-4 pt-3 justify-content-between'>
        {title ? <h1 className='page-title'>{title}</h1> : ""}
        <div className='d-flex gap-1 align-items-center'>
          {actions.map((action) => (
                renderActionButton(action)      
          )
          
          )}
        </div>
      </div>
      <div className="container-fluid mt-2">
        {children}
      </div>
    </div>
  );
}

export default Page;