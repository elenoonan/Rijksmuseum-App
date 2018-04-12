import React from 'react';
import{Route,NavLink,BrowserRouter} from "react-router-dom";
import Home from './Home';
import Search from './Search';
import Contact from './Contact';
import Features from './Features';
import{Jumbotron, Grid, Row, Col, Image, Button, Modal} from 'reactstrap';
import './App.css';
import{Navbar, Nav, NavItem} from 'reactstrap';


class App extends React.Component{

render(){
  return(
    <BrowserRouter>
      <Grid fluid={true}>


        <Navbar fluid={true} staticTop={true} default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">Rijksmuseum</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullright="true">
                  <NavItem eventkey = {1} componentclass = {NavLink} href="/" exact to="/">Home</NavItem>
                  <NavItem eventkey = {2} componentclass = {NavLink} href="/search" to="/search">Search Options</NavItem>
                  <NavItem eventkey = {3} componentclass = {NavLink} href="/features" to="/features">Featured Work</NavItem>
                  <NavItem eventkey = {4} componentclass = {NavLink} href="/contact" to="/contact">Contact</NavItem>

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
