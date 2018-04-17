import React from "react";
import{Grid, Image} from 'react-bootstrap';


class Features extends React.Component {
  constructor(){
    super();
    this.state = {
      artObject:[]
    };
  }

  componentWillMount(){
    //search url
    //https://www.rijksmuseum.nl/api/nl/collection?key=WwWyPkzY&format=json&q=SEARCH_TERM
    //https://www.rijksmuseum.nl/api/nl/collection/sk-c-5?key=WwWyPkzY&format=json=&ps=20
    //https://www.rijksmuseum.nl/api/en/collection?key=WwWyPkzY&format=json=&ps=20
    //https://www.rijksmuseum.nl/api/nl/collection/sk-c-5?key=fakekey&format=json
    fetch('https://www.rijksmuseum.nl/api/en/collection/SK-A-2344?key=WwWyPkzY&format=json')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      console.log(data);
      this.setState({
        artObject: [data.artObject]
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const artFeature = this.state.artObject.map((u, i) => {
      console.log("artFeature");
      return <ArtObj key={i} id={u.id} longTitle={u.longTitle} webImage={u.webImage.url} plaqueDescriptionEnglish={u.plaqueDescriptionEnglish} />;
    });


    return(
      <Grid fluid={true}>
      <div>
        <h2>Featured Work</h2>
          <div>
            {artFeature}
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
          <h3>{this.props.longTitle}</h3>
          <p>{this.props.plaqueDescriptionEnglish}</p>
          <Image src={this.props.webImage} alt="art" rounded className="featurePainting" />
      </div>
    );
  }
}


export default Features;
