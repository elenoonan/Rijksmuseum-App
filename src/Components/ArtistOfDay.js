import React from "react";
import{Container,  Row, Col} from 'reactstrap';
import ArtObj from './ArtObj';


class ArtistOfDay extends React.Component {
  constructor(){
    super();
    this.state = {
      artObjects:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentWillMount(){
    //search url
    //https://www.rijksmuseum.nl/api/nl/collection?key=WwWyPkzY&format=json&q=SEARCH_TERM
    //https://www.rijksmuseum.nl/api/nl/collection/sk-c-5?key=WwWyPkzY&format=json=&ps=20
    //https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json=&ps=20
    //https://www.rijksmuseum.nl/en/search?q=Vermeer&p=1&ps=12&type=painting&st=Objects
    fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&q=Vermeer&p=1&type=painting&format=json=&ps=500')
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

  handleChange(event) {
      // handle both of the <select> UI elements
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

    handleClick(event) {
      // handle the toggle <button>
      const name = event.target.name;
      this.setState(prevState => ({
         [name]: !prevState[name]
      }));
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    open() {this.setState ({showModal: true})}

  render() {
    const list = this.state.artObjects.map((u, index) => {
      return <Col key={index} xs={6} md={6} className="art-wrapper">
        <ArtObj  id={u.id} longTitle={u.longTitle} links={u.links.web} webImage={u.webImage ?  u.webImage.url : 'http://via.placeholder.com/350x150'} principalOrFirstMaker={u.principalOrFirstMaker}/>
      </Col>
    });
    return(
      <Container>
        <div>
          <h2>Artist Of The Day</h2>
          <h3>In the School of Johannes Vermeer</h3>
        </div>

        <Row className="show-grid text-center">
          {list}
        </Row>
      </Container>
      );
    }
  }





export default ArtistOfDay;
