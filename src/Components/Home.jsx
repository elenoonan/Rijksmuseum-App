  import React from "react";
import{Jumbotron, Grid, Row, Col, Image, Button, Table} from 'react-bootstrap';
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
    fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json=&ps=60')
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
      return <Col xs={6} md={6} className="art-wrapper">
        <ArtObj key={i} id={u.id} longTitle={u.longTitle} links={u.links.web} webImage={u.webImage.url} principalOrFirstMaker={u.principalOrFirstMaker}/>;
      </Col>
    });
    return(
      <Grid fluid={true} className="content-wrapper text-center">
        <div>
          <h2>Welcome to the Full Rijksmuseum Collection</h2>
        </div>

        <Row className="show-grid text-center">
          {list}
        </Row>
      </Grid>
      );
    }
  }


class ArtObj extends React.Component{
  render(){
    return(
      <Grid fluid={true} className="content-wrapper text-center">
          <Image src={this.props.webImage} alt="art" rounded className="painting"/>
          <h3>{this.props.longTitle}</h3>
          <h2>{this.props.principalOrFirstMaker}</h2>
          <p>{this.props.links}</p>
      </Grid>
    );
  }
}


export default Home;
