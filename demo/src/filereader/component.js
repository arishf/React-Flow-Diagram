// @flow

import React from 'react';
import style from 'styled-components';
import { setCustom ,store ,diagramOn} from '../../../src' 
import type {DiagComponentProps} from 'react-flow-diagram';
import Background from '../../images/file-document.png';
import CSVDialogBox from '../component/CSVDialogBox';
/*
 * Presentational
 * ==================================== */

const FileReaderStyle = style.div`
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

export type FileReaderProps = DiagComponentProps & {
  name: string,
  isEditing: boolean,
  toggleEdit: boolean => void,
  dialogBox : boolean,
  refreshName: (SyntheticEvent<HTMLTextAreaElement>) => void,
  handleKeyPress: (SyntheticKeyboardEvent<HTMLTextAreaElement>) => void,
  handleRef: HTMLTextAreaElement => void,
};
const CSV = (props: FileReaderProps) => (
  <FileReaderStyle
    width={props.model.width}
    height={props.model.height}
    isEditing={props.isEditing}
    onDoubleClick = {props.dialogBox}
  >
    <EditName
      value={props.name}
      onChange={props.refreshName}
      onKeyDown={props.handleKeyPress}
      innerRef={textarea => props.handleRef(textarea)}
      style={{display: props.isEditing ? 'block' : 'none'}}
    />
    <Name
      // onDoubleClick={() => props.toggleEdit(true)}
      // style={{display: !props.isEditing ? 'block' : 'none'}}
    >
      {props.model.type}
    </Name>
  </FileReaderStyle>
);

/*
 * Container
 * ==================================== */

type FileReaderComponentProps = DiagComponentProps;
type FileReaderComponentState = {
  isEditing: boolean,
  name: string,
};
class FileReaderComponent extends React.PureComponent<
  FileReaderComponentProps,
  FileReaderComponentState
  > {
  textarea: ?HTMLTextAreaElement;

  constructor(props){
    super(props);

    this.getEntityData = this.getEntityData.bind(this);
    this.dialogBoxStateChange = this.dialogBoxStateChange.bind(this);
  }
  state = {
    isEditing: false,
    name: this.props.model.name,
    entityData: [{}],
    isOpen : false,
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

  dialogBox = () => {
    this.setState({ isOpen: true });
   <CSVDialogBox isOpen={this.state.isOpen} getEntityData={this.getEntityData} dialogBoxStateChange = {this.dialogBoxStateChange}/>
  }

  getEntityData(value){
    this.state.entityData = value;
    store.dispatch(setCustom({id: this.props.model.id, custom: this.state.entityData}));
  }

  dialogBoxStateChange(){
    this.setState({isOpen:false});
  }

  refreshName = (ev: SyntheticEvent<HTMLTextAreaElement>) => {
    this.setState({name: ev.currentTarget.value});
  };

  handleKeyPress = (ev: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
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

  render() {
    return (
      <div>
      <CSV
      {...this.props}
      isEditing={this.state.isEditing}
      name={this.state.name}
      toggleEdit={this.toggleEdit}
      dialogBox = {this.dialogBox}
      refreshName={this.refreshName}
      handleKeyPress={this.handleKeyPress}
      handleRef={this.handleRef}
    />
    <CSVDialogBox isOpen={this.state.isOpen} getEntityData={this.getEntityData} dialogBoxStateChange = {this.dialogBoxStateChange}/>
</div>
    );
  }
}

export default FileReaderComponent;
