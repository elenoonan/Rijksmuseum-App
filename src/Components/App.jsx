import React from 'react';
import{Route,NavLink,BrowserRouter} from "react-router-dom";
import Home from './Home';
import Search from './Search';
import Contact from './Contact';
import{Jumbotron, Grid, Row, Col, Image, Button} from 'react-bootstrap';
import './App.css';
import{Navbar, Nav, NavItem} from 'react-bootstrap';


class App extends React.Component{

render(){
  return(
    <BrowserRouter>
      <Grid fluid={true}>
        <Jumbotron>
          <h1>My Rijks Museum Collection</h1>
        </Jumbotron>

        <Navbar fluid={true} default collapseOnSelect>
            <Navbar.Collapse>
                <Nav pullright="true">
                  <NavItem eventKey = {1} componentClass = {NavLink} href="/" exact to="/">Home</NavItem>
                  <NavItem eventKey = {2} componentClass = {NavLink} href="/search" to="/search">Search</NavItem>
                  <NavItem eventKey = {3} componentClass = {NavLink} href="/contact" to="/contact">Contact</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        <div className="content">
          <Route exact path="/" component={Home}/>
          <Route path="/search" component={Search}/>
          <Route path="/contact" component={Contact}/>
        </div>

      </Grid>
    </BrowserRouter>
    );
  }
}


export default App;
