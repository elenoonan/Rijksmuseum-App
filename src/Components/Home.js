import React from "react";
import{Container,  Row, Col} from 'reactstrap';
import ArtObj from './ArtObj';


class Home extends React.Component {
  constructor(){
    super();
    this.state = {
      artObjects:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    /*this.toggle = this.toggle.bind(this);
    /*this.onClick={this.open.bind(this)};*/
    /*  this.open = this.open.bind(this);*/
  }

  componentWillMount(){
    //search url
    //https://www.rijksmuseum.nl/api/nl/collection?key=WwWyPkzY&format=json&q=SEARCH_TERM
    //https://www.rijksmuseum.nl/api/nl/collection/sk-c-5?key=WwWyPkzY&format=json=&ps=20
    //https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json=&ps=20
    //https://www.rijksmuseum.nl/en/search?q=Vermeer&p=1&ps=12&type=painting&st=Objects
    fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&type=painting&format=json=&ps=500')
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



  render() {
    const list = this.state.artObjects.map((u, index) => {
      return <Col key={index} xs={3} md={3} className="art-wrapper">
        <ArtObj  id={u.id} longTitle={u.longTitle} links={u.links.web} webImage={u.webImage ?  u.webImage.url : 'http://via.placeholder.com/350x150'} principalOrFirstMaker={u.principalOrFirstMaker}/>
      </Col>
    });
    return(
      <Container>
        <div className="grid-title">
          <h2>Welcome to the Full Rijksmuseum Collection</h2>
        </div>

        <Row className="show-grid">
          {list}
        </Row>
      </Container>
      );
    }
  }





export default Home;
