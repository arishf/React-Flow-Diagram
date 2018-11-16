// @flow

import React, {Component} from 'react';
import style from 'styled-components';

import type { DiagComponentProps } from 'react-flow-diagram';
import { Modal} from 'antd';
import { setCustom ,store ,diagramOn} from '../../../src'
import FormDialog from '../component/FormDialog'
/*
 * Presentational
 * ==================================== */

const EventStyle = style.div`
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
  refreshName: (SyntheticEvent<HTMLTextAreaElement>) => void,
  handleKeyPress: (SyntheticKeyboardEvent<HTMLTextAreaElement>) => void,
  handleRef: HTMLTextAreaElement => void,
};
const Event = (props: EventProps) => (
  <EventStyle width={props.model.width} height={props.model.height} onDoubleClick = {props.dialogBox}>
    <EditName
      value={props.name}
      onChange={props.refreshName}
      onKeyDown={props.handleKeyPress}
      innerRef={textarea => props.handleRef(textarea)}
      style={{ display: props.isEditing ? 'block' : 'none' }}
    />
    { <Name
      //onDoubleClick={() => props.dialogBox(updateState(true))}
     // style={{ display: !props.isEditing ? 'block' : 'none' }}
    >
      {props.model.type}
    </Name> }
  </EventStyle>
);

/*
 * Container
 * ==================================== */

type EventComponentProps = DiagComponentProps;
type EventComponentState = {
  isEditing: boolean,
  name: string,
};
class EventComponent extends React.PureComponent<
  EventComponentProps,
  EventComponentState
>  {
  textarea: ?HTMLTextAreaElement;
  constructor(props){
    super(props);

    this.getEntityData = this.getEntityData.bind(this);
    this.dialogBoxStateChange = this.dialogBoxStateChange.bind(this);
  }
  state = {
    isEditing: false,
    isOpen : false,
    name: this.props.model.name,
    entityData: [{}]
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

  dialogBox = () => {
    this.setState({ isOpen: true });
   <FormDialog isOpen={this.state.isOpen} getEntityData={this.getEntityData} dialogBoxStateChange = {this.dialogBoxStateChange}/>
  }

  getEntityData(value){
    this.state.entityData = value;
    store.dispatch(setCustom({id: this.props.model.id, custom: this.state.entityData}));
  }

  dialogBoxStateChange(){
    this.setState({isOpen:false});
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
    }
  };

  render() {
    return (
      <div>
        <Event
        {...this.props}
        isEditing={this.state.isEditing}
        name={this.state.name}
        toggleEdit={this.toggleEdit}
        dialogBox = {this.dialogBox}
        refreshName={this.refreshName}
        handleKeyPress={this.handleKeyPress}
        handleRef={this.handleRef}
      />
      <FormDialog isOpen={this.state.isOpen} getEntityData={this.getEntityData} dialogBoxStateChange = {this.dialogBoxStateChange}/>
</div>
      
    );
  }
}

export default EventComponent;

// function updateState(isOpen){
//   console.log('hoioooooooooooooo')
//   this.setState({isOpen})
// }
