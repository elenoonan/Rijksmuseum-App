import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardImg, CardTitle } from 'reactstrap';

class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {

    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>MODAL</Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

          <ModalHeader toggle={this.toggle}>
            <CardTitle>{this.props.longTitle}</CardTitle>
          </ModalHeader>

          <ModalBody>
            <CardImg top width="100%" src={this.props.webImage} alt="art" className="painting"/>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Clear</Button>
          </ModalFooter>
          
        </Modal>
      </div>
    );
}

}

export default MyModal;
