import React from "react";
import LabelledInput from './LabelledInput';

class Search extends React.Component {
  constructor(){
    super();
    this.state = {
      artObjects:[],
      searchText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  componentWillMount(){
    //search url
    //https://www.rijksmuseum.nl/api/nl/collection?key=WwWyPkzY&format=json&q=SEARCH_TERM
    fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json&q=&ps=50')
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
    let searchList = this.state.artObjects.map(u => {
      let nameMatch = u.principalOrFirstMaker.startsWith(this.state.searchText);
      return (nameMatch) ? (
        <ArtObj id={u.id} longTitle={u.longTitle} webImage={u.webImage.url} principalOrFirstMaker={u.principalOrFirstMaker}/>
      ) : null;
    });

    return(
      <section className='section'>
      <div>
        <LabelledInput name='searchText' label='Search by name' value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. vermeer"} />
          <div>
            {searchList}
          </div>
      </div>
      </section>
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

export default Search;
