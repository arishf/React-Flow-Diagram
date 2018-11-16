import React from 'react';
import { Modal } from 'antd';
import 'antd/es/modal/style/index.css';
import { Input } from 'antd';
class FormDialog extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        
        isOpen: this.props.isOpen,
        nameTextValue : '',
        entityData : [{}]
        };
  }
    showModal = () => {
      this.setState({
        isOpen: true,
      });
    }
    
      handleOk = (e) => {
      this.props.dialogBoxStateChange();
      this.setState({
        isOpen: false,
      });
      this.state.entityData = [{"name" : this.state.nameTextValue}]
      this.props.getEntityData(this.state.entityData)
    }

    handleOnChange = (e) => {
      this.state.nameTextValue = e.currentTarget.value;
    }
  
    handleCancel = (e) => {
      
      this.props.dialogBoxStateChange();
       this.setState({
        isOpen: false,
      });

    }
render() {  
  return(
     <div>
        <Modal
        
        title="Basic Modal"
        visible={this.props.isOpen}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        centered = {true}
      >
         <Input placeholder="Name" onChange = {this.handleOnChange} />;
      </Modal>

    </div>
  )
}
}

export default FormDialog;