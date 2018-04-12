  import React from "react";
import{Container,  Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, } from 'reactstrap';
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
    fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json=&ps=100')
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
    const list = this.state.artObjects.map((u, index) => {
      return <Col key={index} xs={6} md={6} className="art-wrapper">
        <ArtObj  id={u.id} longTitle={u.longTitle} links={u.links.web} webImage={u.webImage ?  u.webImage.url : 'http://via.placeholder.com/350x150'} principalOrFirstMaker={u.principalOrFirstMaker}/>
      </Col>
    });
    return(
      <Container>
        <div>
          <h2>Welcome to the Full Rijksmuseum Collection</h2>
        </div>

        <Row className="show-grid text-center">
          {list}
        </Row>
      </Container>
      );
    }
  }


class ArtObj extends React.Component{
  render(){
    return(
      <div>
        <Card>
            <CardImg top width="100%" src={this.props.webImage} alt="art" className="painting"/>
            <CardBody>
            <CardTitle>{this.props.longTitle}</CardTitle>
            <CardSubtitle>{this.props.principalOrFirstMaker}</CardSubtitle>
            <CardText>{this.props.links}</CardText>
            </CardBody>
        </Card>
      </div>
    );
  }
}


export default Home;
