import React, { Component } from 'react';
// import logo from './logo.svg';
import { Navbar,NavbarBrand } from 'reactstrap';
import './App.css';
import Menu from './components/MenuComponent';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="conatiner">
            <NavbarBrand href="/">Ristronate Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu/>
      </div>
    );
  }
}

export default App;
