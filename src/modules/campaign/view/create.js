import React, { useState } from 'react'
import { Card, Col, Row } from 'reactstrap';
import Page from '../../../components/Page'
import CampaignCreate from '../components/campaign-create'
import MessagePreview from '../components/message-preview';

function Campaign() {
  const [campaign,setCampaign] =useState();
  return (
    <Page title="Create Campaign">
      <Row>
        <Col md="8">
          <CampaignCreate onChange={(e) => {setCampaign(e)}} value={campaign}/>
        </Col>
        <Col md="4">
            <Card>
                <MessagePreview value={campaign ? campaign.message : ""} segments={campaign ? campaign.segments : ""}/>
            </Card>
        </Col>
      </Row>
    </Page>
  )
}

export default Campaign