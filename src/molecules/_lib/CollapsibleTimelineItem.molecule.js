import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Collapse, withStyles, Icon } from '@material-ui/core';

const LINE_WIDTH = 3;

const styles = theme => ({
  group: {
    borderTop: `1px solid ${theme.palette.gray.border}`,
    marginBottom: 2 * theme.spacing.unit, 
    '&:first-child': {
      borderTop: 'none'
    }
  },
  title: {
    fontSize: theme.fontSizes.SM,
    fontWeight: 600,
    cursor: 'pointer',
    paddingTop: 2 * theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      lineHeight: theme.fontSizes.MD
    },
    '&:hover > span': {
      color: theme.palette.green.main
    }
  },
  subtitle: {
    position: 'relative',
    fontSize: theme.fontSizes.XS,
    lineHeight: '20px',
    color: theme.palette.gray.main,
    fontWeight: 500,
    cursor: 'pointer',
    paddingLeft: theme.spacing.unit + LINE_WIDTH,
    '&:hover a': {
      color: theme.palette.green.main
    },
    '&.-active *': {
      color: theme.palette.green.main,
      fontWeight: 700
    },
    '&.-active:after': {
      content: "''",
      position: 'absolute',
      left: 0,
      width: LINE_WIDTH,
      height: '100%',
      top: 0,
      backgroundColor: theme.palette.green.main
    },
    '&:after': {
      content: "''",
      position: 'absolute',
      left: 0,
      width: LINE_WIDTH,
      height: '100%',
      top: 0,
      backgroundColor: theme.palette.gray.darkBg
    }
  }
});

class CollapsibleTimelineItem extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    classes: PropTypes.object,
  }

  render() {
    const { item, classes, currentSectionId } = this.props;
    let { isOpen } = this.state;

    const isActive = currentSectionId && currentSectionId.startsWith(item.id);
    if(isActive) isOpen = true;

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
            {item.collapse.map(collapsed => {
              const classNames = [classes.subtitle];
              if(currentSectionId && currentSectionId.startsWith(collapsed.id)) classNames.push('-active');
              return (
                <li key={collapsed.id} className={classnames(classNames)}>
                  <a href={collapsed.url}>
                    {collapsed.label}
                  </a>
                </li>
              )
            })}
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