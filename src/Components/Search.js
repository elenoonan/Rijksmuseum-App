import React from "react";
import LabelledInput from './LabelledInput';
import DropDown from './DropDown';
import{Container, Row, Col} from 'reactstrap';
import ArtObj from './ArtObj';

class Search extends React.Component {
  constructor(){
    super();
    this.state = {
      artObjects:[],
      searchText: '',
      artistSelected: 'all',
      artistOptions:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentWillMount(){
    //search url
    //https://www.rijksmuseum.nl/api/nl/collection?key=WwWyPkzY&format=json&q=SEARCH_TERM

    //fetching x number of art objects from the rijksmuseum site and storing the information in state artObjects
    fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json&q=&ps=1000')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {

      const artObjects = data.artObjects.map(u => {
        return {longTitle: u.longTitle,
          webImage: u.webImage,
          principalOrFirstMaker: u.principalOrFirstMaker};
      });
      this.setState({artObjects: artObjects});


      const artist = data.artObjects.map(u => {
        return {principalOrFirstMaker: u.principalOrFirstMaker};
      });
      console.log(artist);

      const deduped = [...new Set(artist)];
      deduped.sort();
      this.setState({artistOptions: deduped});
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
    let searchList = this.state.artObjects
    .filter(
       u =>
        this.state.searchText === " "
         ? true
         : u.principalOrFirstMaker.toLowerCase().includes(this.state.searchText)
   )
   .filter(
     u =>
     this.state.artistSelected === "all"
     ? true
     : this.state.artistSelected === u.principalOrFirstMaker
   )
   .map((u, index) => {
     return(<Col key={index} xs={4} md={4} className="art-wrapper">
       <ArtObj id={u.id} longTitle={u.longTitle} webImage={u.webImage ?  u.webImage.url : 'http://via.placeholder.com/350x150'} principalOrFirstMaker={u.principalOrFirstMaker}/>
       </Col>
     );
   });

    return(
      <Container>
      <div className="grid-header">
        <div className="search-header">
          <LabelledInput name='searchText' label='Search by name' value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. vermeer"} />
          <DropDown options={['all'].concat(this.state.artistOptions)} name="artistSelected" handleChange={this.handleChange} label="Filter by artist" selected={this.state.artistSelected} />
        </div>
        <Row className="show-grid">
              {searchList}
        </Row>
      </div>
      </Container>
      );
    }
  }






export default Search;
