import React from 'react';
import axios from 'axios';

class JSONFileReader extends React.Component{

    constructor(props){
        super(props);
        this.inputData = null;
        axios.get('./demo/src/input.json') // JSON File Path
        .then( response => {
          this.inputData = response.data;
          console.log('Response' , response.data)
          
       })
    }
  
    getJsonFileContent(){
            return this.inputData;
    }

}


export const JSONReaderHandler = new JSONFileReader();
