import React, { Component } from 'react';
import './style.css';

class RainingListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: props.companyName,
      contact: props.contact,
      phoneNumber: props.phoneNumber,
      rainAt: props.rainAt
    }
  }

  render() {
    return (
      <tr>
        <th className="raining-list-item"> {this.state.companyName} </th>
        <th className="raining-list-item"> {this.state.contact} </th>
        <th className="raining-list-item"> {this.state.phoneNumber} </th>
        <th className="raining-list-item"> {this.state.rainAt} </th>
      </tr>
    );
  }
}

export default RainingListItem;