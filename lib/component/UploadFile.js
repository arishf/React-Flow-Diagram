'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// onChange(info) {
//     if (info.file.status !== 'uploading') {
//       console.log(info.file, info.fileList);
//       this.props.getFileName(info.file)
//     }
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

var value = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text'
  }

};

var UploadFile = function (_React$Component) {
  _inherits(UploadFile, _React$Component);

  function UploadFile(props) {
    _classCallCheck(this, UploadFile);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    console.log('Props', props);

    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  UploadFile.prototype.onSelect = function onSelect(info) {
    if (info.file.status !== 'uploading') {
      console.log('info', info);
      this.props.getFileName(info.file.name);
    }
    if (info.file.status === 'done') {
      _antd.message.success(info.file.name + ' file uploaded successfully');
    } else if (info.file.status === 'error') {
      _antd.message.error(info.file.name + ' file upload failed.');
    }
  };

  UploadFile.prototype.render = function render() {

    return _react2.default.createElement(
      _antd.Upload,
      _extends({}, value, { onChange: this.onSelect }),
      _react2.default.createElement(
        _antd.Button,
        null,
        _react2.default.createElement(_antd.Icon, { type: 'upload' }),
        ' Click to Upload'
      )
    );
  };

  return UploadFile;
}(_react2.default.Component);

exports.default = UploadFile;
module.exports = exports['default'];