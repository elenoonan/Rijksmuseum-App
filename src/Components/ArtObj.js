import React from "react";
import{Button, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import MyModal from './Modal';



class ArtObj extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      like: false
    };

    this.liked = this.liked.bind(this);
  }

  liked() {
    this.setState({
      like: !this.state.like
    });
  }

  render(){
    let srcFav = '';
    if (this.state.like) {
      srcFav = window.location.origin + '/favourite3.png';
    } else {
      srcFav = window.location.origin + '/favourite1.png';
    }

    return(
      <div>

        <Card>
            <CardImg top width="100%" src={this.props.webImage} alt="art" className="painting"/>
              <CardBody>
                <CardTitle>{this.props.longTitle}</CardTitle>
                <CardSubtitle>{this.props.principalOrFirstMaker}</CardSubtitle>
                <CardText>{this.props.links}</CardText>

                  <MyModal longTitle={this.props.longTitle} webImage={this.props.webImage} />

                  <Button onClick={this.liked} className="favButton"><img src={srcFav} alt="favImage" className="favImage"/></Button>

              </CardBody>
        </Card>

      </div>
    );
  }
}

export default ArtObj;
