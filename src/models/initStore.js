import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga'

import { all } from 'redux-saga/effects'
import { AQIReducer, AQISaga } from './AQIReducer.js';
import { UVReducer, UVSaga } from './UVReducer.js';

function* rootSaga() {
    yield all([
      ...AQISaga,
      ...UVSaga
    ]);
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    combineReducers({
        aqi: AQIReducer,
        uv: UVReducer,
        form: formReducer
    }),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);