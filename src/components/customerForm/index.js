import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCustomer } from '../../actions';
import './style.css';

class CustomerForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      company: '',
      contact: '',
      telephone: '',
      location: '',
      numberOfEmployees: ''
    }
  }

  handleCompanyChange = event => {
    this.setState({ company: event.target.value })
  }

  handleContactChange = event => {
    this.setState({ contact: event.target.value })
  }

  handleTelephoneChange = event => {
    this.setState({ telephone: event.target.value })
  }

  handleLocationChange = event => {
    this.setState({ location: event.target.value })
  }

  handleNumberOfEmployeesChange = event => {
    this.setState({ numberOfEmployees: event.target.value })
  }

  addCustomerFromForm = () => {
    const customer = {
      company_name: this.state.company,
      contact: this.state.contact,
      phone_number: this.state.telephone,
      location: this.state.location,
      number_employees: this.state.numberOfEmployees
    }
    this.setState({
      company: '',
      contact: '',
      telephone: '',
      location: '',
      numberOfEmployees: ''
    })
    this.props.addCustomer(customer);
    console.log(this.props.addedCustomer)
  }

  render() {
    return (
      <form className="form-component">
        <div className="inline-input">
          <span>Company Name:</span>
          <input type="text" value={this.state.company} onChange={this.handleCompanyChange} />
          <span>Contact:</span>
          <input type="text" value={this.state.contact} onChange={this.handleContactChange} />
          <span>Telephone:</span>
          <input type="text" value={this.state.telephone} onChange={this.handleTelephoneChange} />
        </div>
        <div className="inline-input">
          <span>Location:</span>
          <input type="text" value={this.state.location} onChange={this.handleLocationChange} />
          <span>Number of Employees:</span>
          <input type="text" value={this.state.numberOfEmployees} onChange={this.handleNumberOfEmployeesChange} />
          <button onClick={this.addCustomerFromForm} className="add-customer">Adicionar</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = store => ({
  addedCustomer: store.customerState
})

const mapDispatchToProps = dispatch => bindActionCreators({ addCustomer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);