import React from 'react';
import{Route,BrowserRouter} from "react-router-dom";
import Home from './Home';
import Search from './Search';
import Contact from './Contact';
import Features from './Features';
import{Container, Jumbotron} from 'reactstrap';
import './App.css';
import{Navbar, Nav, NavItem, NavLink} from 'reactstrap';


class App extends React.Component{

render(){
  return(
    <BrowserRouter>
      <Container>


        <Navbar  default >
          <Nav pullright="true">
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/search" to="/search">Search Options</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/features" to="/features">Featured Work</NavLink>
            </NavItem>
              <NavItem> <NavLink href="/contact" to="/contact">Contact</NavLink>
            </NavItem>
          </Nav>

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

      </Container>
    </BrowserRouter>
    );
  }
}


export default App;
