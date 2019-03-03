import React, { Component } from 'react';
import fakeUmbrellaIcon from "../../assets/footer_icon.png";
import './style.css';



class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <p>Not a real company. Made by Thiago Torres</p>
        <img src={fakeUmbrellaIcon} className="umbrella-footer-icon" alt="The Fake Umbrella Company Icon!" />
      </div>
    );
  }
}

export default Footer;