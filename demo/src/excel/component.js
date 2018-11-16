// @flow

import React, {Component} from 'react';
import style from 'styled-components';

import type { DiagComponentProps } from 'react-flow-diagram';
import { Input } from 'antd';

import { Modal} from 'antd';

import 'antd/es/modal/style/index.css';

/*
 * Presentational
 * ==================================== */

const EventExcelStyle = style.div`
  background-color: #fff;
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 77rem;
  border: 2px solid #888;
  justify-content: center;
  font-size: .5rem;
`;

const Name = style.span`
  position: absolute;
  top: 100%;
  width: 200%;
  padding: .5em;
  font-size: .8rem;
`;

const EditName = style.textarea`
  position: absolute;
  top: 100%;
  width: 200%;
  padding: .5em;
  border: none;
  font-size: .8rem;
  text-align: center;
  border-radius: .1rem;
  resize: none;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
`;

export type EventProps = DiagComponentProps & {
  name: string,
  isEditing: boolean,
  toggleEdit: boolean => void,
  dialogBox : boolean,
  hello : void,
  refreshName: (SyntheticEvent<HTMLTextAreaElement>) => void,
  handleKeyPress: (SyntheticKeyboardEvent<HTMLTextAreaElement>) => void,
  handleRef: HTMLTextAreaElement => void,
};
const Excel = (props: EventProps) => (
  <EventExcelStyle width={props.model.width} height={props.model.height} onDoubleClick = {props.hello}>
    <EditName
      value={props.name}
      onChange={props.refreshName}
      onKeyDown={props.handleKeyPress}
      innerRef={textarea => props.handleRef(textarea)}
      style={{ display: props.isEditing ? 'block' : 'none' }}
    />
    <Name
      onDoubleClick={() => props.dialogBox(updateState(true))}
     // style={{ display: !props.isEditing ? 'block' : 'none' }}
    >
      {props.model.name}
    </Name>
  </EventExcelStyle>
);

/*
 * Container
 * ==================================== */

type ExcelEventComponentProps = DiagComponentProps;
type ExcelEventComponentState = {
  isEditing: boolean,
  name: string,
};
class ExcelEventComponent extends React.PureComponent<
  ExcelEventComponentProps,
  ExcelEventComponentState
>  {
  textarea: ?HTMLTextAreaElement;
  dialogBox : ?FormDialog;
  state = {
    isEditing: false,
    isOpen : false,
    name: this.props.model.name,
  };

  componentWillUnmount() {
    this.textarea = null;
  }

  handleRef = (textarea: HTMLTextAreaElement) => {
    if (!this.textarea) {
      this.textarea = textarea;
    }
  };


  toggleEdit = (isEditing: boolean) => {
     const { textarea } = this;
     if (isEditing && textarea) {
       setTimeout(() => textarea.focus(), 16 * 4);
     }
     this.setState({ isEditing });
  };

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  dialogBox = (isOpen : boolean) => {
    this.setState({ isOpen: true });
   //<FormDialog updateChild ={ () => this.updateState(this.state.isOpen)}   />
   <FormDialog isOpen = {this.state.isOpen}/>
  }

  hello = () => {
    console.log('Hello');
  }
  
  refreshName = (ev: SyntheticEvent<HTMLTextAreaElement>) => {
    this.setState({ name: ev.currentTarget.value });
  };

  handleKeyPress = (ev: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
    switch (ev.key) {
      case 'Enter':
        this.toggleEdit(false);
        this.props.setName({ id: this.props.model.id, name: this.state.name });
        break;
      case 'Escape':
        this.toggleEdit(false);
        this.setState({ name: this.props.model.name });
        break;
      // no default
    }
  };

  render() {

    console.log('In event component')
    return (
      <div>

        <Excel
        {...this.props}
        isEditing={this.state.isEditing}
        name={this.state.name}
        toggleEdit={this.toggleEdit}
        dialogBox = {this.dialogBox}
        hello = {this.hello}
        refreshName={this.refreshName}
        handleKeyPress={this.handleKeyPress}
        handleRef={this.handleRef}
      />
      <FormDialog isOpen = {this.state.isOpen}/> 
</div>
      
    );
  }
}

export default ExcelEventComponent;

function updateState(isOpen){
  console.log('hoioooooooooooooo')
  this.setState({isOpen})
}

class FormDialog extends React.Component {

 
  constructor(props){
      super(props);
    console.log('hrllloo')
      this.state = {
        
        isOpen: false,
        textValue : '',
        };
        
        updateState = updateState.bind(this);
     //   handleOnChange  =  handleOnChange.bind(this);
  }
 
  stateChange(){
    this.setState({ isOpen: this.props.isOpen });
  }

    showModal = () => {
      this.setState({
        isOpen: true,
      });
    }

    handleOk = (e) => {
      console.log('Event' , e);
      this.setState({
        isOpen: false,
      });

      console.log(this.state.textValue);
    }

    handleOnChange = (e) => {

      console.log(e.currentTarget.value);
      this.state.textValue = e.currentTarget.value;
    }
  
    handleCancel = (e) => {
      console.log(e);
       this.setState({
        isOpen: false,
      });
    }
render() {
    

  return(
     <div>
        <Modal
        
        title="Basic Modal"
        visible={this.state.isOpen}
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