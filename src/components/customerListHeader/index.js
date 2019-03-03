import React, { Component } from 'react';
import './style.css';

class ListHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerItens: props.headerItens
    }
  }

  listHeaderItens = () => {
    return this.state.headerItens.map((item, index) => {
      return <th className="header-element" key={index} > {item} </th>;
    });
  }

  render() {
    return (
      <tr>
        {this.listHeaderItens()}
      </tr>
    );
  }
}

export default ListHeader;