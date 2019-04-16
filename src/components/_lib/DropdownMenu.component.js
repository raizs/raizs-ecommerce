import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withStyles, Button, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import styles from './styles/dropdownMenu.styles';

// const defaultItem = {
//   id: PropTypes.string,
//   label: PropTypes.string,
//   clickAction: PropTypes.func,
//   shouldClose: PropTypes.bool,
// };

/**
 *
 *
 * @export
 * @class DropdownMenu
 * @extends {Component}
 */
class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.node,
    items: PropTypes.array,
    hasArrow: PropTypes.bool,
  }

  static defaultProps = {
    items: [],
    hasArrow: true
  }

  /**
   * _handleItemClick - Handles the menu item click action
   *
   * @param {String} id - The id of the item
   * @param {Function} clickAction - The specific menu item action
   * @param {Boolean} shouldClose - Defines whether the menu should close after clicking
   * @memberof DropdownMenu
   */
  _handleItemClick({ id, clickAction, shouldClose = true }) {
    if(Boolean(clickAction)) clickAction(id);
    if(shouldClose) this.setState({ anchorEl: null });
  }

  /**
   * _renderItems - Maps the items into MenuItems
   *
   * @returns Array of {JSX} MenuItems
   * @memberof DropdownMenu
   */
  _renderItems() {
    const { items, classes } = this.props;
    return items.map(item => (
      <MenuItem className={classes.menuItem} key={item.id} onClick={() => this._handleItemClick(item)}>
        {item.label}
      </MenuItem>
    ));
  }
  
  /**
   * _renderLabel - Renders the menu button label correctly
   *
   * @param {String} label - The label string
   * @param {Boolean} hasArrow - Defines if the button has the drop arrow
   * @returns {JSX} Label
   * @memberof DropdownMenu
   */
  _renderLabel(label, hasArrow) {
    return (
      <div className='label'>
        <div className='text' style={{verticalAlign: 'middle', display: 'inline-block'}}>
          {label}
        </div>
        {
          hasArrow ?
          <ArrowDropDownIcon
            style={{
              fontSize: '24px',
              verticalAlign: 'middle',
              transform: 'translateY(-.125em)'
            }}
          /> : null
        }
      </div>
    );
  }

  render() {
    let { id, label, hasArrow, classes } = this.props;
    const { anchorEl } = this.state;

    id = 'dropdown-menu-' + id;

    return (
      <div>
        <Button
          aria-haspopup="true"
          aria-owns={anchorEl ? id : undefined}
          className={classes.button}
          onClick={event => this.setState({ anchorEl: event.currentTarget })}
        >
          {this._renderLabel(label, hasArrow)}
        </Button>
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.setState({ anchorEl: null })}
        >
          {this._renderItems()}
        </Menu>
      </div>
    )
  }
}

DropdownMenu = withStyles(styles)(DropdownMenu);

export { DropdownMenu };