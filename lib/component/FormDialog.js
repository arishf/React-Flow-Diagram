'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

require('antd/es/modal/style/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _antd.Modal,
        {

          title: 'Basic Modal',
          visible: this.props.isOpen,
          onOk: this.handleOk,
          onCancel: this.handleCancel,
          centered: true
        },
        _react2.default.createElement(_antd.Input, { placeholder: 'Name', onChange: this.handleOnChange }),
        ';'
      )
    );
  };

  return FormDialog;
}(_react2.default.Component);

exports.default = FormDialog;
module.exports = exports['default'];