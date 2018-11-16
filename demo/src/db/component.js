// @flow

import React from 'react';
import style from 'styled-components';

import type {DiagComponentProps} from 'react-flow-diagram';
import Background from '../../images/database.png';
/*
 * Presentational
 * ==================================== */

const DBStyle = style.div`
background-image : url(${Background});
display: flex;
flex-flow: row nowrap;
width: 50px;
height: 50px;
`;

const Name = style.span`
  position: absolute;
  top: 100%;
  width: 100%;
  padding: .5em;
  font-size: .8rem;
`;

const EditName = style.textarea`
  position: absolute;
  top: 100%;
  width: 100%;
  padding: .5em;
  border: none;
  font-size: .8rem;
  text-align: center;
  border-radius: .1rem;
  resize: none;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
`;

export type DBProps = DiagComponentProps & {
  name: string,
  isEditing: boolean,
  toggleEdit: boolean => void,
  refreshName: (SyntheticEvent<HTMLTextAreaElement>) => void,
  handleKeyPress: (SyntheticKeyboardEvent<HTMLTextAreaElement>) => void,
  handleRef: HTMLTextAreaElement => void,
  showEditor: boolean => void
};
const DB = (props: DBProps) => (
  <DBStyle
    width={props.model.width}
    height={props.model.height}
    isEditing={props.isEditing}
    onClick={() => {props.showEditor}}
  >
    <EditName
      value={props.name}
      onChange={props.refreshName}
      onKeyDown={props.handleKeyPress}
      innerRef={textarea => props.handleRef(textarea)}
      style={{display: props.isEditing ? 'block' : 'none'}}
    />
    <Name
      onDoubleClick={() => props.toggleEdit(true)}
      style={{display: !props.isEditing ? 'block' : 'none'}}
    >
      {props.model.name}
    </Name>
  </DBStyle>
);

/*
 * Container
 * ==================================== */

type DBComponentProps = DiagComponentProps;
type DBComponentState = {
  isEditing: boolean,
  name: string,
};
class DBComponent extends React.PureComponent<
  DBComponentProps,
  DBComponentState
  > {
  textarea: ?HTMLTextAreaElement;

  state = {
    isEditing: false,
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
   
    const {textarea} = this;
    if (isEditing && textarea) {
      setTimeout(() => textarea.focus(), 16 * 4);
    }
    this.setState({isEditing});
  };

  refreshName = (ev: SyntheticEvent<HTMLTextAreaElement>) => {
    this.setState({name: ev.currentTarget.value});
  };

  handleKeyPress = (ev: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
    console.log('on key press');
    switch (ev.key) {
      case 'Enter':
        this.toggleEdit(false);
        this.props.setName({id: this.props.model.id, name: this.state.name});
        break;
      case 'Escape':
        this.toggleEdit(false);
        this.setState({name: this.props.model.name});
        break;
      // no default
    }
  };

  showEditor = (isClicked: boolean) => {
    console.log('This.show called');
  }

  render() {
    return (
      <DB
        {...this.props}
        isEditing={this.state.isEditing}
        name={this.state.name}
        toggleEdit={this.toggleEdit}
        refreshName={this.refreshName}
        handleKeyPress={this.handleKeyPress}
        handleRef={this.handleRef}
        showEditor={this.showEditor}
      />
    );
  }
}

export default DBComponent;
