import React, {Component} from 'react';
import Header from '../../components/header/';
import Footer from '../../components/footer/';
import './style.css'

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-component">
        <Header/>
        <div className="not-found-content">
          <p>404</p>
          <span>I'm sorry. The page was not found.</span>
        </div>
        <Footer />
      </div>
    );
  }
}

export default NotFound;