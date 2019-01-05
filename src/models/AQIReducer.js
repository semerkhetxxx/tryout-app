import axios from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';

const initState = {
    list: [],
    CountySet: [],
    SiteNameSet: [],
    StatusSet: [],
    editIndex: null 
};

export function AQIReducer(state, action) {
    if (!state) return initState;

    const {type, payload} = action;

    if ( type === 'initAQIdata' ) {
        return {
            ...state,
            CountySet: [...payload.CountySet],
            SiteNameSet: [...payload.SiteNameSet],
            StatusSet: [...payload.StatusSet],
            list: [...payload.data]
        }
    }
    if ( type === 'addAQIRecord' ) {
        return {
            ...state,
            list: [payload, ...state.list],
        }
    }
    if ( type === 'editAQIRecord' ) {
        return {
            ...state,
            list: [...state.list[state.editIndex] = payload],
            editIndex: null
        }
    }
    if ( type === 'changeEditIndex' ) {
        return {
            ...state,
            editIndex: payload
        }
    }
    if ( type === 'editAllAQIRecords' ) {
        return {
            ...state,
            list: [...payload]
        }
    }
    
    return state;
};

function* initAQIDataSaga() {
    const response = yield call(axios.get, 'http://opendata2.epa.gov.tw/AQI.json');
    const { data } = response;
    
    const payload = {
        data: [],
        CountySet: new Set([]),
        SiteNameSet: new Set([]),
        StatusSet: new Set([])
    };
    data.forEach( ({ County, SiteName, AQI, Status }) => {
        payload.CountySet.add(County);
        payload.SiteNameSet.add(SiteName);
        payload.StatusSet.add(Status);
        payload.data.push({ County, SiteName, AQI, Status });
    });

    yield put({
        type: 'initAQIdata', 
        payload  
    });
};
function* addAQIRecordSaga() {
    
    const payload = yield select(state => state.form.aqiForm.values)

    yield put({
        type: 'addAQIRecord', 
        payload
    });
};
function* editAQIRecordSaga() {
    
    const payload = yield select(state => state.form.aqiForm.values)

    yield put({
        type: 'editAQIRecord', 
        payload
    });
};
function* editAllAQIRecordsSaga() {

    const payload = yield select(state => state.form.aqiListForm.values.list)

    yield put({
        type: 'editAllAQIRecords', 
        payload
    });
}
  
export const AQISaga = [
    takeEvery("initAQIDataSaga", initAQIDataSaga),
    takeEvery("addAQIRecordSaga", addAQIRecordSaga), 
    takeEvery("editAQIRecordSaga", editAQIRecordSaga), 
    takeEvery("editAllAQIRecordsSaga", editAllAQIRecordsSaga), 
];

  