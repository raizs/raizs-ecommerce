import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button, Menu, MenuItem, Icon, Fab } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const defaultItem = {
  id: PropTypes.string,
  label: PropTypes.string,
  clickAction: PropTypes.func,
  shouldClose: PropTypes.bool,
};

/**
 *
 *
 * @export
 * @class DropdownMenu
 * @extends {Component}
 */
export class DropdownMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.node,
    items: PropTypes.arrayOf(defaultItem),
    hasArrow: PropTypes.bool,
  }

  static defaultProps = {
    items: [],
    hasArrow: true
  }

  /**
   * handleItemClick - Handles the menu item click action
   *
   * @param {String} id - The id of the item
   * @param {Function} clickAction - The specific menu item action
   * @param {Boolean} shouldClose - Defines whether the menu should close after clicking
   * @memberof DropdownMenu
   */
  handleItemClick({ id, clickAction, shouldClose = true }) {
    if(Boolean(clickAction)) clickAction(id);
    if(shouldClose) this.setState({ anchorEl: null });
  }

  /**
   * RenderItems - Maps the items into MenuItems
   *
   * @returns Array of {JSX} MenuItems
   * @memberof DropdownMenu
   */
  renderItems() {
    return this.props.items.map(item => (
      <MenuItem key={item.id} onClick={() => this.handleItemClick(item)}>
        {item.label}
      </MenuItem>
    ));
  }
  
  /**
   * renderLabel - Renders the menu button label correctly
   *
   * @param {String} label - The label string
   * @param {Boolean} hasArrow - Defines if the button has the drop arrow
   * @returns {JSX} Label
   * @memberof DropdownMenu
   */
  renderLabel(label, hasArrow) {
    return (
      <div className='label'>
        <div className='text' style={{verticalAlign: 'top', display: 'inline-block'}}>
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
          />
          : null
        }
      </div>
    );
  }

  render() {
    let { id, label, hasArrow } = this.props;
    const { anchorEl } = this.state;

    id = 'dropdown-menu-' + id;

    return (
      <div className='dropdown-menu'>
        <Button
          disableRipple
          disableFocusRipple
          aria-owns={anchorEl ? id : undefined}
          aria-haspopup="true"
          onClick={event => this.setState({ anchorEl: event.currentTarget })}
        >
          {this.renderLabel(label, hasArrow)}
        </Button>
        <Menu
          id={id}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.setState({ anchorEl: null })}
        >
          {this.renderItems()}
        </Menu>
      </div>
    )
  }
}