import React from 'react';
import { Modal } from 'antd';
import 'antd/es/modal/style/index.css';
import 'antd/lib/table/style/index.css';
import { Input } from 'antd';
import { Table, Divider, Tag } from 'antd';
const { Column, ColumnGroup } = Table;

class CSVDialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      isOpen: this.props.isOpen,
      nameTextValue: '',
      entityData: [{}],
      dataFields: [{
        fieldName: "BAN",
        dataType: "String",
        type: "Fixed",
        fieldSize: "4"
      },
      {
        fieldName: "MAN",
        dataType: "Integer",
        type: "Fixed",
        fieldSize: "4"
      }]
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
    this.state.entityData = [{ "name": this.state.nameTextValue }]
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
    // console.log("data",this.state.dataFields)
    return (
      <div>
        <Modal

          title="CSV Data"
          visible={this.props.isOpen}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered={true}
        >
          <Input placeholder="CSV File Name " onChange={this.handleOnChange} /> &nbsp;&nbsp;&nbsp;
         <Input placeholder="CSV Field Headers" onChange={this.handleOnChange} />
          <Table dataSource={this.state.dataFields}>
            <Column
              title="Field Name"
              dataIndex="fieldName"
              key="fieldName"
            />
             <Column
              title="data Type"
              dataIndex="dataType"
              key="dataType"
            />
             <Column
              title="Type"
              dataIndex="type"
              key="type"
            />
            <Column
              title="field Size"
              dataIndex="fieldSize"
              key="fieldSize"
            />
          </Table>
        </Modal>

      </div>
    )
  }
}

export default CSVDialogBox;