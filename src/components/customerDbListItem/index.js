import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeCustomer, editCustomer } from '../../actions';
import './style.css';

class CustomerDbListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: props.companyName,
      contact: props.contact,
      phoneNumber: props.phoneNumber,
      location: props.location,
      numberOfEmployees: props.numberOfEmployees,
      activeItem: '',
      edit: false
    }
  }

  removeCustomerFromDb = () => {
    this.setState({ activeItem: 'active-item' })
    this.props.removeCustomer(this.props.id);
  }

  editCustomerFromDb = () => {
    if(this.state.edit){
      this.setState({edit: false});
      const customer = {
        id: this.props.id,
        company_name: this.state.companyName,
        contact: this.state.contact,
        phone_number: this.state.phoneNumber,
        location: this.state.location,
        number_employees: this.state.numberOfEmployees,
      }
      this.props.editCustomer(customer);
    } else {
      this.setState({edit: true});
    }
  }

  editListItem = (state, change) => {
    return <input value={state}  onChange={change} />
  }


  handleCompanyChange = event => {
    this.setState({ companyName: event.target.value })
  }

  handleContactChange = event => {
    this.setState({ contact: event.target.value })
  }

  handleTelephoneChange = event => {
    this.setState({ phoneNumber: event.target.value })
  }

  handleLocationChange = event => {
    this.setState({ location: event.target.value })
  }

  handleNumberOfEmployeesChange = event => {
    this.setState({ numberOfEmployees: event.target.value })
  }


  render() {
    return (
      <tr className={this.state.activeItem}>
        <th className="db-list-item"> {this.state.edit ? this.editListItem(this.state.companyName, this.handleCompanyChange) : this.state.companyName} </th>
        <th className="db-list-item"> {this.state.edit ? this.editListItem(this.state.contact, this.handleContactChange) : this.state.contact} </th>
        <th className="db-list-item"> {this.state.edit ? this.editListItem(this.state.phoneNumber, this.handleTelephoneChange) : this.state.phoneNumber}</th>
        <th className="db-list-item"> {this.state.edit ? this.editListItem(this.state.location, this.handleLocationChange) : this.state.location}</th>
        <th className="db-list-item"> {this.state.edit ? this.editListItem(this.state.numberOfEmployees, this.handleNumberOfEmployeesChange) : this.state.numberOfEmployees}</th>
        <th className="db-list-item">
          <button onClick={this.editCustomerFromDb} className="db-list-edit">  {this.state.edit ? 'Save' : 'Edit'} </button>
          <button onClick={this.removeCustomerFromDb} className="db-list-remove">Remove</button>
        </th>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ removeCustomer, editCustomer }, dispatch);

export default connect(null, mapDispatchToProps)(CustomerDbListItem);