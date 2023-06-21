import React, { useEffect, useState } from 'react'
import { CardBody,Card} from 'reactstrap'
import CsvImporter from './csv-importer'
import Page from '../../../components/Page'
import Select from 'react-select';
import SegmentSingleDropdown from '../../segment/components/segment-single-dropdown';
import { useLocation } from 'react-router';
import queryString from 'query-string';
const BASIC_SEGMENT = "BASIC_SEGMENT"

function BulkUpload() {
  const {search} = useLocation();
  const {segmentId} = queryString.parse(search)
  const [basicSegmentId,setSegment] = useState();
  useEffect(() =>{
    if(segmentId){
      setSegment(segmentId)
    }
  },[segmentId])
  return (
    <div >
      <Page title={`Upload Bulk Customers ${segmentId ? 'To Basic Segment' : ''}`}>
        <Card className='px-3 '>
          <CardBody>
            <CsvImporter basicSegmentId={basicSegmentId} />
          </CardBody>
        </Card>
      </Page>
    </div>
  )
}

export default BulkUpload