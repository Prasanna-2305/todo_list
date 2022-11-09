import { combineReducers } from 'redux'

import TodoReducer from "./reducers";

const rootReducer = combineReducers({ TodoReducer })

export default rootReducer; 