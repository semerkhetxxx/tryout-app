import React from 'react';
import { withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form'
import { CountySelect, SiteNameSelect, StatusSelect, TextInput } from './InputComps.js';

function AQIFormComp(props) {

    return<div className="mb-auto"> { props.editMode ? "Edit Record" : "Add Record"} <form onSubmit={ props.handleSubmit(props.submitFunc) } >
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
                <tr >
                    <td><Field
                        name="County" 
                        component={CountySelect}
                    /></td>
                    <td><Field 
                        name="SiteName"
                        component={SiteNameSelect}
                    /></td>
                    <td><Field 
                        name="AQI" 
                        component={TextInput}
                        type="text"
                        placeholder="AQI"
                    /></td>
                    <td><Field 
                        name="Status"
                        component={StatusSelect}
                    /></td>
                </tr>
                <tr >
                    <td><button type="submit">Submit</button></td>
                    <td>{ props.editMode && <button onClick={ props.history.goBack }>Cancel</button> }</td>
                    <td></td>
                    <td></td>
                </tr>                   
            </tbody>
        </table>
    </form></div> 
    
};

const validate = values => {
    const errors = {}
    if (!values.AQI) {
      errors.AQI = 'Required'
    } else if (isNaN(values.AQI)) {
      errors.AQI = 'Input must be number'
    }
    if (!values.County) {
        errors.County = 'Required'
    }
    if (!values.SiteName) {
        errors.SiteName = 'Required'
    }
    if (!values.Status) {
        errors.Status = 'Required'
    }

    return errors
}

export default reduxForm({ 
    form:'aqiForm',
    validate 
})(withRouter(AQIFormComp));