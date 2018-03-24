import React from 'react';
import LabelledInput from './Components/LabelledInput';


class App extends React.Component{
  constructor(){
    super();
    this.state = {
      artObjects:[]
    };
  }

componentWillMount(){
  //search url
  //https://www.rijksmuseum.nl/api/nl/collection?key=WwWyPkzY&format=json&q=SEARCH_TERM
  fetch('https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json')
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

render(){
  const list = this.state.artObjects.map((u, i) => {
    return <ArtObj key={i} id={u.id} longTitle={u.longTitle} links={u.links.web} webImage={u.webImage.url} principalOrFirstMaker={u.principalOrFirstMaker}/>;
  });
  return(
    <div>
    <h1>My Rijks Museum Collection</h1>
    {list}
    console.log('full list');
    </div>
  );

  let artistList = this.state.map(u =>{
    console.log('short List');
    const nameMatch = u.principalOrFirstMaker(this.state.searchText);
    return(nameMatch)?(
      <artistCard principalOrFirstMaker={u.principalOrFirstMaker} webImage={u.webImage} longTitle={u.longTitle}/>
    ) : null;
  });

  return(
    <section className="section">
      <LabelledInput name="searchText" label="Search by name" value={this.state.searchText} handleChange={this.handleChange} placeholder={"e.g. vermeer"}/>
      <div className="columns is-multiline">
        {artistList}
      </div>
    </section>
  );
}

}

class ArtObj extends React.Component{
  render(){
    return(
      <div style={{'borderStyle': 'solid'}}>
      <p>{this.props.id}</p>
      <p>{this.props.longTitle}</p>
      <p>{this.props.links}</p>
      <img src={this.props.webImage} alt="painting"/>
      <p>{this.props.principalOrFirstMaker}</p>
      </div>
    );
  }
}


export default App;
