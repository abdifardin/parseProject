//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------

// vendor
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'


// locals
import logo from './logo.svg';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Content from './Content/Content'


//
// Class defintion
//------------------------------------------------------------------
class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
