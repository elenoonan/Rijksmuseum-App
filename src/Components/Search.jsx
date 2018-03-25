import React from "react";
import LabelledInput from './LabelledInput';

class Search extends React.Component {
  constructor(){
    super();
    this.state = {
      artObjects:[]
    };
  }

  componentWillMount(){
    //search url
    //https://www.rijksmuseum.nl/api/nl/collection?key=WwWyPkzY&format=json&q=SEARCH_TERM
    fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json&q=nameMatch')
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
    let searchList = this.state.artObjects.map(u => {
      const nameMatch = u.principalOrFirstMaker(this.state.searchText);
      return (nameMatch) ? (
        <ArtObj id={u.id} longTitle={u.longTitle} links={u.links.web} webImage={u.webImage.url} principalOrFirstMaker={u.principalOrFirstMaker}/>
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
