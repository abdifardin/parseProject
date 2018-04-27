//
// by Fakhruddin Abdi, 26th Apr 2018
//------------------------------------------------------------------

// vendor
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';


// locals
import logo from './logo.svg';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Content from './Content/Content'
import { getCurrentUser, getAuthStatus } from './Methods/firebaseQueries';


//
// Class defintion
//------------------------------------------------------------------
class App extends Component {

  state= {
    user: null
  }

  // lifeCycle methods
  //------------------------------------------
  componentWillMount() {

    getAuthStatus((user) => {
      this.setState({
        user: user
      })
    });
  }
  
  // Local methods
  //------------------------------------------

  render() {
    const { user } = this.state;
    return (
      <Router history={History}>
        <div>
          <Header user={user} />
          <Content user={user} />
          <Footer user={user} />
        </div>
      </Router>
    );
  }
}

export default App;
