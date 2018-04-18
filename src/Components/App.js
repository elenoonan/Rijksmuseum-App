import React from 'react';
import{Route,BrowserRouter,NavLink as RRNavLink} from "react-router-dom";
import Home from './Home';
import Search from './Search';
import Contact from './Contact';
import Features from './Features';
import ArtistOfDay from './ArtistOfDay';
import{Container, Jumbotron, NavLink, Navbar, Nav, NavItem} from 'reactstrap';
import './App.css';




class App extends React.Component{

render(){
  return(
    <BrowserRouter>
      <Container>
        <Navbar >
          <Nav>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/features" to="/features" >Featured Work</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/artistofday" to="/artistofday" >Artist Of Day</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/search" to="/search" >Search Options</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact" to="/contact" >Contact</NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        <Jumbotron>
          <h1>My Rijksmuseum Collection</h1>
        </Jumbotron>

        <div className="content">
          <Route exact path="/" component={Home}/>
          <Route path="/artistofday" component={ArtistOfDay}/>
          <Route path="/features" component={Features}/>
          <Route path="/search" component={Search}/>
          <Route path="/contact" component={Contact}/>
        </div>

      </Container>
    </BrowserRouter>
    );
  }
}


export default App;
