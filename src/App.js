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
import { getCurrentUser, getAuthStatus } from './Methods and Constatns/firebaseQueries';


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
      <div>
        <Header user= {user} />
        <Content user={user} />
        <Footer user={user} />
      </div>
    );
  }
}

export default App;
