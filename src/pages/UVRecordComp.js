import React from 'react';
import { connect } from 'react-redux';

function UVRecordComp(props) {

    return <div className="mb-auto">
        
        UVRecord<div>
        <table>
            <thead>
                <tr>
                    <td>County</td>
                    <td>SiteName</td>
                    <td>TWD97Lat</td>
                </tr>
            </thead>
            <tbody>
                { props.list.map(({ County, SiteName, TWD97Lat }, index) => {
                    return(
                        <tr key={index}>
                            <td>{County}</td>
                            <td>{SiteName}</td>
                            <td>{TWD97Lat}</td>
                        </tr>
                    );
                }) }                
            </tbody>
        </table>
    </div></div>
}

const mapStateToProps = state => ({
    list: state.uv.list
});
const mapDispatchToProps = dispatch => ({
    
});
        
export default connect(mapStateToProps, mapDispatchToProps) (UVRecordComp); 