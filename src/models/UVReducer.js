import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

const initState = {
    list : [],
};

export function UVReducer(state, action) {
    if (!state) return initState;

    const {type, payload} = action;

    if ( type === 'queryUVList' ) {
        return {
            ...state,
            list: [...payload]
        };
    }

    return state;
}

function* queryUVListSaga() {
    const response = yield call(axios.get, 'https://cors-anywhere.herokuapp.com/http://opendata.epa.gov.tw/ws/Data/UVSite/?format=json');
    const { data } = response;
    
    yield put({
        type: 'queryUVList', 
        payload: data.map( ({ County, SiteName, TWD97Lat }) => { 
            return { County, SiteName, TWD97Lat };
        })
    });
};
  
export const UVSaga = [
    takeEvery("queryUVListSaga", queryUVListSaga),
];
