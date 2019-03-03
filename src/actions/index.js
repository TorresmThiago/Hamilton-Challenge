import axios from 'axios';
import { ADD_CUSTOMER, LIST_CUSTOMERS, REMOVE_CUSTOMER, EDIT_CUSTOMER } from './actionTypes';

const apiUrl = 'http://localhost:8000';
const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=';
const weatherApiID = '&APPID=bca951d05679e93b77013819709ce3f5';

export const addCustomer = (customerData) => {
  return dispatch => {
    return axios.post(`${apiUrl}/add/`, customerData)
      .then(response => {
        dispatch(createCustomerSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  }
};

export const createCustomerSuccess = value => ({
  type: ADD_CUSTOMER,
  payload: {
    id: value._id,
    company: value.company_name,
    contact: value.contact,
    phoneNumber: value.phone_number,
    location: value.location,
    numberOfEmployees: value.number_employees
  }
});

export const listCustomers = () => {
  return dispatch => {
    return axios.post(`${apiUrl}/list/`)
      .then(response => {
        dispatch(listCustomersSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  }
};

export const listCustomersWeather = (cityID) => {
  return axios.post(`${weatherApiUrl}${cityID}${weatherApiID}`)
    .then(response => {
      return response.data;
    })
    .then(weatherReport => {
      const WheatherReport = weatherReport.list.filter(report => {
        return report.weather;
      })
      return WheatherReport;
    }).then(report => {
      const isItRaining = report.filter ( item => {
        return item.weather[0].main.indexOf('Rain') > -1;
      })
      return isItRaining;
    })
    .catch(error => {
      throw (error);
    });
};

export const listCustomersSuccess = value => ({
  type: LIST_CUSTOMERS,
  payload: value
});


export const removeCustomer = (customerId) => {
  return dispatch => {
    return axios.post(`${apiUrl}/remove/${customerId}/`)
      .then(response => {
        dispatch(removeCustomersSuccess(response.data));
      })
      .catch(error => {
        throw (error);
      });
  }
};

export const removeCustomersSuccess = value => ({
  type: REMOVE_CUSTOMER,
  payload: value
});

export const editCustomer = (customerData) => {
  return dispatch => {
    const index = customerData.id;
    return axios.post(`${apiUrl}/edit/${index}/`, customerData)
      .then(response => {
        dispatch(editCustomerSuccess(response));
      })
      .catch(error => {
        throw (error);
      });
  }
};

export const editCustomerSuccess = value => ({
  type: EDIT_CUSTOMER,
  payload: {
    _id: value._id,
    company: value.company_name,
    contact: value.contact,
    phoneNumber: value.phone_number,
    location: value.location,
    numberOfEmployees: value.number_employees
  }
});