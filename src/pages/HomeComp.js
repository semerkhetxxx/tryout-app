import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function HomeComp(props) {
    
    return (<div className="mb-auto">Home
        <div>
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
                    { props.list.map(({ County, SiteName, AQI, Status }, index) => {
                        return(
                            <tr key={index}>
                                <td>{County}</td>
                                <td>{SiteName}</td>
                                <td>{AQI}</td>
                                <td>{Status}</td>
                                <td><Link to='/edit' onClick={ () => props.handleEdit(index) }>Edit</Link></td>
                            </tr>
                        );
                    }) }                    
                </tbody>
            </table>
        </div>
    </div>
    );
}

const mapStateToProps = state => ({
    list: state.aqi.list
});
const mapDispatchToProps = dispatch => ({
    handleEdit:(index) => dispatch({
        type: 'changeEditIndex',
        payload: index
    })
});
        
export default connect(mapStateToProps, mapDispatchToProps) (HomeComp);