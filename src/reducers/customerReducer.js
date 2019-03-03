import { ADD_CUSTOMER, REMOVE_CUSTOMER, EDIT_CUSTOMER, LIST_CUSTOMERS } from '../actions/actionTypes';

export default function postReducer(state = [], action) {
  switch (action.type) {
    case ADD_CUSTOMER:
      return {...state, addedCustomer: action.payload};
    case REMOVE_CUSTOMER:
      return {...state, removedId: action.payload};
    case EDIT_CUSTOMER:
      return {...state, editedCustomer: action.payload};
    case LIST_CUSTOMERS:
      return {...state, customersList: action.payload};
    default:
      return state;
  }
}