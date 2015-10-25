'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * This component provides contenteditable DIV functionality. This component
 * encapsulates logic for managing a contenteditable value while taking changes
 * within the property model into account.
 */

var Contentable = (function (_React$Component) {
  _inherits(Contentable, _React$Component);

  function Contentable() {
    _classCallCheck(this, Contentable);

    _get(Object.getPrototypeOf(Contentable.prototype), 'constructor', this).call(this);
  }

  _createClass(Contentable, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var nextValue = nextProps.value;

      return this._didNextPropsChange(nextProps) || nextValue !== _react2['default'].findDOMNode(this).innerHTML;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var node = _react2['default'].findDOMNode(this);

      if (this.props.value !== node.innerHTML) {
        node.innerHTML = this.props.value;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('div', _extends({}, this.props, {
        contentEditable: this._isContentEditable(),
        dangerouslySetInnerHTML: { __html: this.props.value || '' } }));
    }

    // private

    /**
     * !!! This is a little ridiculous. In order to allow component properties to
     * reflect change within a component we need to have the ability to see if a
     * components properties have changed independent of whether the value has
     * changed. We can easily do this by cloning props and nextProps and stripping
     * out `value`. However, properties may contain functions and functions never
     * equate. So if you pass in an event or other property with a function your
     * objects will never equate. So this method manually checks for property
     * equality by ignoring functions. Currently, if a property contains an
     * object with a function it will probably 'splode.
     *
     */
  }, {
    key: '_didNextPropsChange',
    value: function _didNextPropsChange(nextProps) {
      var clonedProps = {};
      var clonedNextProps = {};

      Object.assign(clonedProps, this.props);
      Object.assign(clonedNextProps, nextProps);

      delete clonedProps.value;
      delete clonedNextProps.value;

      for (var key in clonedProps) {
        if (clonedNextProps.hasOwnProperty(key)) {
          if (typeof clonedProps[key] !== 'function' && typeof clonedNextProps[key] !== 'function') {
            if (clonedProps[key] !== clonedNextProps[key]) {
              return true;
            }
          }
        } else {
          return true;
        }
      }

      return false;
    }
  }, {
    key: '_isContentEditable',
    value: function _isContentEditable() {
      if (this.props.contentEditable !== undefined && this.props.contentEditable !== null) {
        return this.props.contentEditable;
      } else {
        return true;
      }
    }
  }]);

  return Contentable;
})(_react2['default'].Component);

exports['default'] = Contentable;
module.exports = exports['default'];