import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse, withStyles, Icon } from '@material-ui/core';

import styles from './styles/collapsibleTimelineItem.styles';

class CollapsibleTimelineItem extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  render() {
    const { item, classes } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={classes.group}>
        <div className={classes.title} onClick={() => this.setState({ isOpen: !isOpen })}>
          <span>
            {item.label.toUpperCase()}
          </span>
          <Icon>{isOpen ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</Icon>
        </div>
        <Collapse in={isOpen}>
          <ul>
            {item.collapse.map(collapsed =>
              <li key={collapsed.id} className={classes.subtitle}>
                <a href={collapsed.url}>
                  {collapsed.label}
                </a>
              </li>
            )}
          </ul>
        </Collapse>
      </div>
    );
  }
}

CollapsibleTimelineItem.defaultProps = {
  isOpen: null
};

CollapsibleTimelineItem = withStyles(styles)(CollapsibleTimelineItem);

export { CollapsibleTimelineItem };