// @flow

import React from 'react';
import { render } from 'react-dom';
import styled, { injectGlobal } from 'styled-components';
import { Diagram, store, setEntities, setConfig ,diagramOn, setCustom } from '../../src';
import {custom, config, customEntities } from './config-example';
import axios from 'axios';
import UploadFile from '../../src/component/UploadFile';
import {JSONReaderHandler} from '../src/jsonFile';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
`;

const Main = styled.main`
  max-width: 62em;
  padding: 1em;
  margin: 0 auto;
  font-family: sans-serif;
  display: flex;
  flex-flow: column nowrap;
  min-height: 150vh;
`;


class Demo extends React.PureComponent<> {
  constructor(props) {
    super(props);
    this.state={
      diagramEntityState : null,
      model : {} ,
      fileName : '',
      inputFileData : {},
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickUpload = this.handleClickUpload.bind(this);
    this.getFileName = this.getFileName.bind(this);
     var inputData = JSONReaderHandler.getJsonFileContent();
    console.log('InputData' ,   inputData);
  }


  handleClick() {
    console.info('HandleClick method - Latest Entity - ', this.state.diagramEntityState);
    var jsonObject = this.state.diagramEntityState;
    axios.post(`http://localhost:8080/api`,{jsonObject})
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    
  }

  handleClickUpload() {

    axios.get('./demo/src/diagram.json') // JSON File Path
   .then( response => {
     this.state.model = response.data;
     store.dispatch(setEntities(this.state.model.jsonObject));
  })
 .catch(function (error) {
   console.log(error);
 });

    
  }
  componentWillMount() {
    store.dispatch(setConfig(config));

    diagramOn('anyChange', entityState => {this.setState({
      diagramEntityState:entityState,
    });
    console.log("Latest Entity - ",this.state.diagramEntityState); 
  });
  }
  render() {
    return (
      <Main>
        <h1>react-flow-diagram Demo</h1>
        
        <Diagram customEntities={customEntities} />
        <div>
          <button onClick={this.handleClick} >Save Diagram</button>
          <UploadFile getFileName = {this.getFileName}/>
        </div>
      </Main>
    );
  }

  getFileName(fileName){
      this.state.fileName = fileName;
      console.log('FileName' , this.state.fileName);
      axios.get('./demo/src/' + this.state.fileName) // JSON File Path
      .then( response => {
        this.state.model = response.data;
        store.dispatch(setEntities(this.state.model.jsonObject));
     })
  }

}

// $FlowFixMe
render(<Demo />, document.querySelector('#demo'));
