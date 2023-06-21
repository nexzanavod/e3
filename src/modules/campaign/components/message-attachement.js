import React from 'react'
import { Button } from 'reactstrap'

function MessageAttachment() {
  return (
    <div className='m-3'>
        <input type="file" />
        <Button className='btn btn-primary'>Upload</Button>
    </div>
  )
}

export default MessageAttachment