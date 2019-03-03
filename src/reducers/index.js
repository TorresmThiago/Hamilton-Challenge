import { combineReducers } from 'redux'
import customerReducer from './customerReducer';

export default combineReducers({
  customerState: customerReducer
})