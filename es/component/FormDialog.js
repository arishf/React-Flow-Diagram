function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Modal } from 'antd';
import 'antd/es/modal/style/index.css';
import { Input } from 'antd';

var FormDialog = function (_React$Component) {
  _inherits(FormDialog, _React$Component);

  function FormDialog(props) {
    _classCallCheck(this, FormDialog);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.showModal = function () {
      _this.setState({
        isOpen: true
      });
    };

    _this.handleOk = function (e) {
      _this.props.statechange();
      _this.setState({
        isOpen: false
      });
      _this.state.valueObj = [{ "name": _this.state.nameTextValue }];
      _this.props.testFunc(_this.state.valueObj);
    };

    _this.handleOnChange = function (e) {
      _this.state.nameTextValue = e.currentTarget.value;
    };

    _this.handleCancel = function (e) {

      _this.props.statechange();
      _this.setState({
        isOpen: false
      });
    };

    _this.state = {

      isOpen: _this.props.isOpen,
      nameTextValue: '',
      valueObj: [{}]
    };
    return _this;
  }

  FormDialog.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        Modal,
        {

          title: 'Basic Modal',
          visible: this.props.isOpen,
          onOk: this.handleOk,
          onCancel: this.handleCancel,
          centered: true
        },
        React.createElement(Input, { placeholder: 'Name', onChange: this.handleOnChange }),
        ';'
      )
    );
  };

  return FormDialog;
}(React.Component);

export default FormDialog;