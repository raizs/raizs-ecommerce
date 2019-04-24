import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';

const styles = theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  box: {
    userSelect: 'none',
    height: '32px',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.green.main}`,
    borderRadius: theme.spacing.unit,
    color: theme.palette.green.main,
    backgroundColor: 'white',
    fontSize: theme.fontSizes.XS,
    fontWeight: 700,
    transition: '.35s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&.-selected': {
      color: 'white',
      backgroundColor: theme.palette.green.main,
    }
  }
});

class PickABox extends Component {
  state = {
    width: 120
  }

  static propTypes = {
    id: PropTypes.string,
    selectedId: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }))
  }

  _resizeEvent(context) {
    const { id, options: { length } } = context.props;
    const wrapper = document.querySelector(`#pick-a-box-${id}`);

    if(wrapper) {
      const width = Math.floor(wrapper.clientWidth / length) - (length - 1) * 8;
  
      context.setState({ width });
    }
  }

  componentDidMount() {
    const context = this;
    const { id, options: { length } } = this.props;

    window.addEventListener('resize', () => this._resizeEvent(context))

    const wrapper = document.querySelector(`#pick-a-box-${id}`);
    const width = Math.floor(wrapper.clientWidth / length) - (length - 1) * 8;

    this.setState({ width });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeEvent);
  }
  
  _renderBoxes() {
    const { classes, options, handleSelect, selectedId } = this.props;
    const { width } = this.state;

    return options.map(({ id, label }) => {
      const boxClasses = [classes.box];
      if(id === selectedId) boxClasses.push('-selected');

      return (
        <div
          id={id}
          key={id}
          style={{ width }}
          onClick={() => handleSelect(id)}
          className={classnames(boxClasses)}
        >
          {label}
        </div>
      )
    })
  }

  render() {
    const { classes, id } = this.props;
    return (
      <div className={classes.wrapper} id={`pick-a-box-${id}`}>
        {this._renderBoxes()}
      </div>
    )
  }

  
}

PickABox = withStyles(styles)(PickABox);

export { PickABox };