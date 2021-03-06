'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n  position: absolute;\n  top: 0;\n  left: 0;\n  text-align: center;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  user-select: none;\n'], ['\n  position: absolute;\n  top: 0;\n  left: 0;\n  text-align: center;\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  user-select: none;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _reactRedux = require('react-redux');

var _reducer = require('./reducer');

var _reducer2 = require('../canvas/reducer');

var _defaultEntity = require('./defaultEntity');

var _defaultEntity2 = _interopRequireDefault(_defaultEntity);

var _component = require('../contextMenu/component');

var _component2 = _interopRequireDefault(_component);

var _FormDialog = require('../component/FormDialog');

var _FormDialog2 = _interopRequireDefault(_FormDialog);

var _antd = require('antd');

require('antd/es/modal/style/index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

// eslint-disable-next-line import/first


/*
 * Presentational
 * ==================================== */

var contextMenuActions = function contextMenuActions(props) {
  var remove = {
    action: function action() {
      return props.removeEntity(props.model.id);
    },
    iconVariety: 'delete',
    label: 'Remove'
  };

  var connectAction = {
    action: function action() {
      return props.connecting({ currently: true, from: props.model.id });
    },
    iconVariety: 'arrow',
    label: 'Connect'
  };

  var addEntities = props.entityTypeNames.map(function (entityTypeName) {
    return {
      action: function action() {
        return props.addLinkedEntity({
          entity: props.defaultEntity({ entityType: entityTypeName }),
          id: props.model.id
        });
      },
      iconVariety: entityTypeName,
      label: 'Add ' + entityTypeName
    };
  });

  return [remove].concat(addEntities, [connectAction]);
};

var EntityStyle = _styledComponents2.default.div(_templateObject);

var Entity = function Entity(props) {
  return _react2.default.createElement(
    EntityStyle,
    {
      style: {
        transform: 'translate(' + props.model.x + 'px, ' + props.model.y + 'px)',
        zIndex: props.isAnchored || props.isSelected ? '100' : '10',
        cursor: props.toBeConnected ? 'pointer' : 'move'
      }
    },
    _react2.default.createElement(
      'div',
      {
        onMouseDown: props.onMouseDown,
        onMouseLeave: props.onMouseLeave,
        onMouseUp: props.onMouseUp,
        onDoubleClick: props.onDoubleClick,
        role: 'presentation'
      },
      props.children
    ),
    props.isSelected && _react2.default.createElement(_component2.default, { actions: contextMenuActions(props) })
  );
};

/*
 * Container
 * ==================================== */

// TODO: These signatures are probably wrong. The original action does return
// an EntityAction, but after we connect we're dispatching the action, so this
// signature is probably incorrect. Gotta research what's the proper signature
// after connecting the component.
//
// NOTE: I tried wrapping them in Dispatch<> (e.g. Dispatch<Id => EntityAction>)
// which seemed correct, but doing so eliminates type checking in practice
// (i.e. I could name a method whatever or pass another type to an action and
// the checked wouldn't complain). I need to research this. I also haven't
// found any discussion about this or code examples. I'm either doing something
// fundamentally wrong or being innovative :P
//
// Also notice I used both i.e. and e.g. in the same paragraph. Just bask in
// that fact. Cherish it. Savour it. Ok, now keep reading code :D
//


var EntityContainerHOC = function EntityContainerHOC(WrappedComponent) {
  return function (_React$PureComponent) {
    _inherits(_class2, _React$PureComponent);

    function _class2(props) {
      _classCallCheck(this, _class2);

      var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

      _this.entityTypeNames = Object.keys(_this.props.entityTypes);

      _this.onDoubleClick = function (ev) {

        _this.state.isOpen = true;
        _react2.default.createElement(_FormDialog2.default, { isOpen: _this.state.isOpen });
      };

      _this.onMouseDown = function (ev) {
        ev.stopPropagation();
        if (_this.props.canvas.connecting.currently) {
          // In this case we want to select an entity to be connected to a
          // previously selected entity to connect from
          _this.props.linkTo(_this.props.model.id);
        } else {
          // Most common behavior is that when you click on an entity, your
          // intention is to start dragging the entity
          //
          // The new thing is that now the anchor info is on metaenttiy, cursor
          // position is on canvas, and what I actually need to do is set that
          // this entity is starting to be selected for movement, passing the id
          // of the entitiy. This will "ripple" down to canvas and metaentity.
          // meow.
          // so I have to create a new action for this...
          _this.props.anchorEntity({ id: _this.props.model.id, isAnchored: true });
        }
      };

      _this.onMouseLeave = function (ev) {

        // If this magic below proves to be a hinderance, remove it.
        // Now that I'm tracking mouse movement on canvas, Entity mouseMove
        // jailbreak is not such a problem.
        if (_this.props.meta.isAnchored) {
          // If the entity is still being dragged while leaving (mouse movement
          // faster than state refresh on DOM) then (discussing only X
          // coordinate, calculations the same with Y):
          //
          // This is where the anchor point was (in relation to diagram coordinates):
          // this.state.anchorX + this.props.model.x
          //
          // This is where the mouse was (in relation to diagram coordinates)
          // this.props.canvas.cursor.x
          //
          // This is the difference:
          // (this.props.canvas.cursor.x) - (this.state.anchorX + this.props.model.x)
          // (this.props.canvas.cursor.x) - (this.state.anchorX + this.props.model.x)
          //
          // The above number signifies by how much has the mouse left the original
          // anchor point. If we add this difference to where we would have
          // calculated our original location, we're left with:
          // (this.props.canvas.cursor.x - this.state.anchorX) +
          // ((this.props.canvas.cursor.x) - (this.state.anchorX + this.props.model.x))
          //
          // Which simplified leaves us with:
          // 2 * (this.props.canvas.cursor.x - this.state.anchorX) - this.props.model.x
          //


          _this.props.move({
            x: 2 * (_this.props.canvas.cursor.x - _this.props.meta.anchor.x) - _this.props.model.x,
            y: 2 * (_this.props.canvas.cursor.y - _this.props.meta.anchor.y) - _this.props.model.y,
            id: _this.props.model.id
          });
        }
      };

      _this.onMouseUp = function (ev) {
        ev.stopPropagation();
        if (!_this.state.onMouseUpWouldBeClick) {
          // Behaves as if it was spawned with a mouse drag
          // meaning that when you release the mouse button,
          // the element will de-anchor
          _this.props.anchorEntity({ id: '', isAnchored: false });
          _this.props.selectEntity(_this.props.model.id);
        }
        // else it behaves as if it was spawned with a mouse click
        // meaning it needs another click to de-anchor from mouse
      };

      _this.state = {
        onMouseUpWouldBeClick: true,
        isOpen: false,
        valueObj: [{}]

      };
      _this.testFunc = _this.testFunc.bind(_this);
      _this.stateChange = _this.stateChange.bind(_this);

      return _this;
    }

    _class2.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      var wouldBeClick = function wouldBeClick() {
        return _this2.setState({ onMouseUpWouldBeClick: false });
      };
      if (this.props.meta.isAnchored) {
        setTimeout(wouldBeClick, 16 * 12);
      } else {
        wouldBeClick();
      }
    };

    _class2.prototype.render = function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          Entity,
          {
            model: this.props.model,
            entityTypeNames: this.entityTypeNames,
            isAnchored: this.props.meta.isAnchored,
            isSelected: this.props.meta.isSelected,
            toBeConnected: this.props.canvas.connecting.currently,
            addLinkedEntity: this.props.addLinkedEntity,
            removeEntity: this.props.removeEntity,
            connecting: this.props.connecting,
            defaultEntity: this.props.defaultEntity,
            onMouseDown: this.onMouseDown,
            onMouseLeave: this.onMouseLeave,
            onMouseUp: this.onMouseUp,
            onDoubleClick: this.onDoubleClick
          },
          _react2.default.createElement(WrappedComponent, { model: this.props.model, meta: this.props.meta })
        ),
        _react2.default.createElement(_FormDialog2.default, { isOpen: this.state.isOpen, testFunc: this.testFunc, statechange: this.stateChange })
      );
    };

    _class2.prototype.testFunc = function testFunc(value) {
      this.state.valueObj = value;
      this.props.setCustom({
        id: this.props.model.id,
        custom: this.state.valueObj
      });
    };

    _class2.prototype.stateChange = function stateChange() {
      this.setState({ isOpen: false });
    };

    return _class2;
  }(_react2.default.PureComponent);
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    canvas: state.canvas,
    meta: state.metaEntity.find(function (metaEntity) {
      return metaEntity.id === ownProps.model.id;
    }),
    entityTypes: state.config.entityTypes,
    defaultEntity: (0, _defaultEntity2.default)(state)
  };
};

exports.default = function (WrappedComponent) {
  return (0, _reactRedux.connect)(mapStateToProps, {
    move: _reducer.move,
    linkTo: _reducer.linkTo,
    addLinkedEntity: _reducer.addLinkedEntity,
    removeEntity: _reducer.removeEntity,
    selectEntity: _reducer.selectEntity,
    connecting: _reducer2.connecting,
    anchorEntity: _reducer2.anchorEntity,
    setCustom: _reducer.setCustom
  })(EntityContainerHOC(WrappedComponent));
};

module.exports = exports['default'];