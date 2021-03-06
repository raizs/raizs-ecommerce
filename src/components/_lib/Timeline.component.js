import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core';

import { CollapsibleTimelineItem } from '../../molecules';

export const TIMELINE_MAX_WIDTH = 200;
const TIMELINE_LINE_HEIGHT = 4;
const TIMELINE_LINE_WIDTH = 80;

const styles = theme => ({
  wrapper: {
    width: '25%',
    maxWidth: TIMELINE_MAX_WIDTH,
    maxHeight: '100vh',
    overflowY: 'auto',
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'top',
    padding: `${2 * theme.spacing.unit}px ${2 * theme.spacing.unit}px ${2 * theme.spacing.unit}px ${3 * theme.spacing.unit}px`,
    '& *': {
      userSelect: 'none'
    }
  },
  title: {
    marginBottom: 3 * theme.spacing.unit,
    fontSize: theme.fontSizes.MMD,
    fontWeight: 600,
    cursor: 'default',
    fontFamily: 'raizs'
  },
  line: {
    height: TIMELINE_LINE_HEIGHT,
    backgroundColor: theme.palette.green.main,
    width: TIMELINE_LINE_WIDTH,
    marginBottom: 3 * theme.spacing.unit
  },
  item: {
    marginBottom: 2 * theme.spacing.unit,
    color: theme.palette.gray.main,
    fontWeight: 600,
    fontSize: theme.fontSizes.XS,
    cursor: 'pointer',
    display: 'block',
    '&:hover': {
      color: theme.palette.green.main
    },
    '&.-big': {
      fontSize: theme.fontSizes.SM,
      fontWeight: 600,
      color: theme.palette.black.main,
      '&:hover': {
        color: theme.palette.green.main
      },
    },
    '&.-active': {
      color: theme.palette.green.main,
      fontWeight: 600
    }
  }
});


class Timeline extends Component {
  _renderCollapsibleItem = (item, currentSectionId) => {
    return <CollapsibleTimelineItem key={item.id} item={item} currentSectionId={currentSectionId} />
  };
  
  _renderItems = (items, classes, currentSectionId) => {
    return items.map(item => {
      const { id, label, url, isCollapsible, isBig } = item;
      const classNames = [classes.item];
      const isActive = currentSectionId && currentSectionId.startsWith(id);
  
      if(isBig) classNames.push('-big');
      if(isActive) classNames.push('-active');
  
      return isCollapsible ? this._renderCollapsibleItem(item, currentSectionId) : (
        <a
          key={id}
          className={classnames(classNames)}
          href={url}
        >
          {label}
        </a>
      );
    });
  }
  render() {
    const { classes, fixed, content: { items, title }, currentSectionId, maxHeight } = this.props;
    const style =  {};
    if(fixed) {
      style.top = 0;
      style.position = 'fixed';
      if(maxHeight) style.maxHeight = maxHeight;
    }
  
    return (
      <div
        id='side-timeline'
        style={style}
        className={classes.wrapper}
      >
        { title ? <div className={classes.title}>{title}</div> : null }
        { title ? <div className={classes.line} /> : null }
        { this._renderItems(items, classes, currentSectionId) }
      </div>
    );
  };
}

Timeline.propTypes = {
  classes: PropTypes.object,
  fixed: PropTypes.bool,
  content: PropTypes.object,
};

Timeline.defaultProps = {
  fixed: true
};

Timeline = compose(
  withStyles(styles)
)(Timeline);

export { Timeline };