import { connect } from 'react-redux';
import AQIFormComp from '../components/AQIFormComp';

const mapStateToProps = state => ({
    //initialValues: state.aqi.newRecord,
});
const mapDispatchToProps = dispatch => ({
    submitFunc: () => dispatch({
        type: 'addAQIRecordSaga', 
    }),
});

export const AddRecordComp = connect( mapStateToProps, mapDispatchToProps )(AQIFormComp) ;
