import React from 'react';

/**
 * This component provides contenteditable DIV functionality. This component
 * encapsulates logic for managing a contenteditable value while taking changes
 * within the property model into account.
 */
class Contentable extends React.Component {
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps) {
    let nextValue = nextProps.value;

    return this._didNextPropsChange(nextProps) || nextValue !== React.findDOMNode(this).innerHTML;
  }

  componentDidUpdate() {
    let node = React.findDOMNode(this);

    if (this.props.value !== node.innerHTML) {
      node.innerHTML = this.props.value;
    }
  }

  render() {
    return (
      <div { ...this.props }
           contentEditable={ this._isContentEditable() }
           dangerouslySetInnerHTML={ { __html: this.props.value || '' } } />
    );
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
  _didNextPropsChange(nextProps) {
    let clonedProps = {};
    let clonedNextProps = {};

    Object.assign(clonedProps, this.props);
    Object.assign(clonedNextProps, nextProps);

    delete clonedProps.value;
    delete clonedNextProps.value;

    for(let key in clonedProps) {
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

  _isContentEditable() {
    if (this.props.contentEditable !== undefined && this.props.contentEditable !== null) {
      return this.props.contentEditable;
    } else {
      return true;
    }
  }
}

export default Contentable;
