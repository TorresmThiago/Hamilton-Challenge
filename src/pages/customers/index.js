import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listCustomers } from '../../actions';

import Header from '../../components/header/';
import Footer from '../../components/footer/';
import CustomerForm from '../../components/customerForm/';
import CustomerListHeader from '../../components/customerListHeader/';
import CustomerListItem from '../../components/customerDbListItem/';
import './style.css'

class Customers extends Component {

  componentWillMount() {
    this.props.listCustomers();
  }

  listCustomersDatabase = () => {
    console.log(this.props.customers)
    if (this.props.customers !== undefined) {
      return this.props.customers.map((customer, index) => {
        return <CustomerListItem key={index} id={customer.id} companyName={customer.company_name} contact={customer.contact} phoneNumber={customer.phone_number} location={customer.location} numberOfEmployees={customer.number_employees} />;
      })
    }
  }

  componentDidUpdate() {
    console.log(this.props.customers)
  }

  render() {
    return (
      <div className="customers-component">
        <Header />
        <div className="customers-content">
          <div className="customers-form-container">
            <h1>Add new customers!</h1>
            <CustomerForm />
          </div>
          <div className="customers-list-container">
            <h1>See your customers information</h1>
            <table>
              <tbody>
                <CustomerListHeader headerItens={['Company', 'Contact', 'Telephone', 'Location', 'Number of employees', 'Action']} />
                {this.listCustomersDatabase()}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    customers: store.customerState.customersList,
    newCustomer: store.customerState.addedCustomer
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ listCustomers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Customers);