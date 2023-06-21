import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from '../../../components/Page';
import { get } from '../action';
import { Card, CardHeader, CardBody } from 'reactstrap';

class Sample extends Component {
    componentWillMount() {
        this.props.fetchData();
    }

    render() {
        const { data } = this.props;

        return (
            <Page title="Test Page">
                <Card>
                    <CardHeader>Title</CardHeader>
                    <CardBody>
                        <div className="animated fadeIn">
                            <h1>Sample Page</h1>
                            <p>{data}</p>
                        </div>
                    </CardBody>
                </Card>
            </Page>
        );
    }
}

function mapStateToProps({ sampleData }) {
    return {
        data: sampleData
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchData: get
    }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(Sample));
