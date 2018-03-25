import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


class Paintings extends React.Component{
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
    </div>
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



ReactDOM.render(
  <Paintings />,
  document.getElementById('root')
);
