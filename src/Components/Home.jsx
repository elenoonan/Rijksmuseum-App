import React from "react";
import{Jumbotron, Grid, Row, Col, Image, Button} from 'react-bootstrap';
import './Home.css';

class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      artObjects:[]
    };
  }

  componentWillMount(){
    //search url
    //https://www.rijksmuseum.nl/api/nl/collection?key=WwWyPkzY&format=json&q=SEARCH_TERM
    //https://www.rijksmuseum.nl/api/nl/collection/sk-c-5?key=WwWyPkzY&format=json=&ps=20
    //https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json=&ps=20
    fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json=&ps=20')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      console.log(data)
      this.setState({artObjects: data.artObjects});
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const list = this.state.artObjects.map((u, i) => {
      return <ArtObj key={i} id={u.id} longTitle={u.longTitle} links={u.links.web} webImage={u.webImage.url} principalOrFirstMaker={u.principalOrFirstMaker}/>;
    });
    return(
      <Grid fluid={true}>
      <div>
        <h2>Welcome to the Full Rijks Museum Collection</h2>
          <div>
            {list}
          </div>
      </div>
      </Grid>
      );
    }
  }


class ArtObj extends React.Component{
  render(){
    return(
      <div>
        <p>{this.props.id}</p>
        <p>{this.props.longTitle}</p>
        <p>{this.props.links}</p>
        <img src={this.props.webImage} alt="painting"/>
        <p>{this.props.principalOrFirstMaker}</p>
      </div>
    );
  }
}


export default Home;
