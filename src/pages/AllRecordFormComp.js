import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { CountySelect, SiteNameSelect, StatusSelect, TextInput } from '../components/InputComps.js';

const renderFields = ({ fields }) => (
    
    fields.map((elem, index) => (
        <tr key={index}>
            <td><Field
                key={index}
                name={`${elem}.County`} 
                component={CountySelect}
            /></td>
            <td><Field 
                key={index}
                name={`${elem}.SiteName`}
                component={SiteNameSelect}
            /></td>
            <td><Field
                key={index} 
                name={`${elem}.AQI`} 
                component={TextInput}
            /></td>
            <td><Field 
                key={index}
                name={`${elem}.Status`} 
                component={StatusSelect}
            /></td>
        </tr>
    ))
      
);

function AllRecordFormComp(props) {

    return<div className="mb-auto">AddRecord<form onSubmit={ props.handleSubmit(props.submitFunc) } >
        <table>
            <thead>
                <tr>
                    <td>County</td>
                    <td>SiteName</td>
                    <td>AQI</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                <FieldArray name="list" component={renderFields}/>
                <tr >
                    <td><button type="submit">Submit</button></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>                   
            </tbody>
        </table>
    </form></div>
}

const validate = values => {
    const errors = {}
    
    if (values && values.list) {

        errors.list = values.list.map((elem)=>{
            let error = {};
            if (!elem.AQI) {
                error.AQI = 'Required'
            } else if (isNaN(elem.AQI)) {
                error.AQI = 'Input must be number'
            }
            if (!elem.County) {
                error.County = 'Required'
            }
            if (!elem.SiteName) {
                error.SiteName = 'Required'
            }
            if (!elem.Status) {
                error.Status = 'Required'
            }
            return error;
        });
    }    
    
    return errors
}

const mapStateToProps = state => ({
    initialValues: { list: [...state.aqi.list] },
    enableReinitialize : true
});
const mapDispatchToProps = dispatch => ({
    submitFunc: () => dispatch({
        type: 'editAllAQIRecordsSaga', 
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ 
    form:'aqiListForm',
    validate
})(AllRecordFormComp)); 