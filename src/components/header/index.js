import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import './style.css'

import fakeUmbrellaIcon from "../../assets/header_icon.png";

class Header extends Component {
  render() {
    return (
      <div className="header-background">
        <img src={fakeUmbrellaIcon} className="fake-umbrella-icon" alt="The Fake Umbrella Company Icon!" />
        <div className="fake-umbrella-slogan">
          <p>Fake Umbrella</p>
          <span>We keep you dry!</span>
        </div>
        <div className="header">
          <button className="header-button">
            <Link to="/"> Home </Link> 
          </button>
          <button className="header-button">
            <Link to="/customers"> Customers </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Header;