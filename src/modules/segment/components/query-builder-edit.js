import React, { useEffect, useState } from 'react'
import { QueryBuilder } from 'react-querybuilder';
import { formatQuery } from 'react-querybuilder/dist/formatQuery';
import { parseSQL } from 'react-querybuilder/dist/parseSQL';
import mongoToSqlConverter from 'mongo-to-sql-converter';
import {
    bootstrapControlClassnames,
    bootstrapControlElements,
    } from '@react-querybuilder/bootstrap';
import { getSegmentById,updateSegment,getAutomationById } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from 'react-router';

const fields = [
    { name: 'attributes.name', label: 'Name' },
    { name: 'attributes.age', label: 'Age', inputType: 'number' },
    { name: 'attributes.address', label: 'Address' },
    { name: 'attributes.phone', label: 'Phone' },
    { name: 'attributes.nic', label: 'Nic' },
    { name: 'attributes.gender', label: 'Gender' },
];

function QueryBuilderEdit({id,getSegmentById,updateSegment,segment}) {
    const history = useHistory();
    const [query, setQuery] = useState({
        combinator: 'and',
        rules: [
            {
              field: 'first_name',
              operator: 'beginsWith',
              value: 'Stev',
            },
            {
              field: 'last_name',
              operator: 'in',
              value: 'Vai, Vaughan',
            },
        ],
    });
    const [mongoQuery,setMongoQuery] = useState();
    const [segmentName,setName] = useState("");
    useEffect(() =>{
        getSegmentById(id)
    },[id,getSegmentById])

    useEffect(() =>{
        if(segment){
            console.log(segment)
            setName(segment.name)
            console.log(segment.query)
            if(segment.query){
                let query2 = parseMongo(segment.query)
                setQuery(query2)
                console.log("SQL TO RULES",query2);
            }
            // let dd = formatQuery(segment.query);
        }
    },[segment])

    const parseMongo = (dt) =>{
        const SQLQuery = mongoToSqlConverter.convertToSQL(`db.user.find(${dt});`, true)
        const query2 = parseSQL(
            SQLQuery
          );
        return query2
    }

    const editSegment = (queryMongo) => {
        let editSegmentObj = {
            name:segmentName,
            query:queryMongo
        }
        console.log(editSegmentObj);
        updateSegment(id,editSegmentObj);
        setName("");
        setMongoQuery("")
        history.push('/segments');
    }
    return (
        <div style={{flex:'3'}} >
            <div className='mb-4 text-right d-flex justify-content-between'>
                <button className='btn btn-primary' onClick={() => editSegment(formatQuery(query, 'mongodb'))}>Edit Segment</button>
                <input value={segmentName} className='form-control ml-2 w-50' placeholder='Segment Name' onChange={(e) => {setName(e.target.value)} } /> 
            </div>
            <QueryBuilder 
                fields={fields} 
                query={query} 
                onQueryChange={q => setQuery(q)} 
                controlClassnames={bootstrapControlClassnames}
                controlElements={bootstrapControlElements}
            />
            <h4>Query</h4>
            <pre>
                <code>{mongoQuery}</code>
            </pre>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        segment:state.segments.segmentDetail
    }
}

const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        getSegmentById,
        updateSegment,
        getAutomationById
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(QueryBuilderEdit);