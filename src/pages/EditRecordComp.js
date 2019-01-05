import { connect } from 'react-redux';
import AQIFormComp from '../components/AQIFormComp';

const mapStateToProps = state => ({
    initialValues: state.aqi.list[state.aqi.editIndex],
    editMode: true,
});
const mapDispatchToProps = dispatch => ({
    submitFunc: () => dispatch({
        type: 'editAQIRecordSaga', 
    }),
});

export const EditRecordComp = connect( mapStateToProps, mapDispatchToProps )(AQIFormComp);
