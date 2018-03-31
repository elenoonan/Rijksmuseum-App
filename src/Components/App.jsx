import React from 'react';
import{Route,NavLink,BrowserRouter} from "react-router-dom";
import Home from './Home';
import Search from './Search';
import Contact from './Contact';
import Features from './Features';
import{Jumbotron, Grid, Row, Col, Image, Button} from 'react-bootstrap';
import './App.css';
import{Navbar, Nav, NavItem} from 'react-bootstrap';


class App extends React.Component{

render(){
  return(
    <BrowserRouter>
      <Grid fluid={true}>


        <Navbar fluid={true} staticTop={true} default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">rijks</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullright="true">
                  <NavItem eventKey = {1} componentClass = {NavLink} href="/" exact to="/">Home</NavItem>
                  <NavItem eventKey = {2} componentClass = {NavLink} href="/search" to="/search">Search</NavItem>
                  <NavItem eventKey = {3} componentClass = {NavLink} href="/features" to="/features">Features</NavItem>
                  <NavItem eventKey = {4} componentClass = {NavLink} href="/contact" to="/contact">Contact</NavItem>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Jumbotron>
          <h1>My Rijksmuseum Collection</h1>
        </Jumbotron>
        <div className="content">
          <Route exact path="/" component={Home}/>
          <Route path="/search" component={Search}/>
          <Route path="/features" component={Features}/>
          <Route path="/contact" component={Contact}/>
        </div>

      </Grid>
    </BrowserRouter>
    );
  }
}


export default App;
