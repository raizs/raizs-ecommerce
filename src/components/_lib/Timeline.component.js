import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import { CollapsibleTimelineItem } from '../../molecules';

export const TIMELINE_MAX_WIDTH = 256;
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
    padding: `${4 * theme.spacing.unit}px ${2 * theme.spacing.unit}px ${2 * theme.spacing.unit}px ${3 * theme.spacing.unit}px`,
    '& *': {
      userSelect: 'none'
    }
  },
  title: {
    marginBottom: 3 * theme.spacing.unit,
    fontSize: theme.fontSizes.SM,
    fontWeight: 600,
    cursor: 'default',
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
    }
  }
});

const _renderCollapsibleItem = item => {
  return <CollapsibleTimelineItem key={item.id} item={item} />
};

const _renderItems = (items, classes) => {

  return items.map(item => {
    const { id, label, url, isCollapsible } = item;

    return isCollapsible ? _renderCollapsibleItem(item) : (
      <a
        key={id}
        className={classes.item}
        href={url} 
      >
        {label}
      </a>
    );
  });
}

let Timeline = props => {
  const { classes, fixed, content: { items, title } } = props;

  return (
    <div
      id='side-timeline'
      style={fixed ? { top: 0, position: 'fixed' } : {}}
      className={classes.wrapper}
    >
      { title ? <div className={classes.title}>{title}</div> : null }
      { title ? <div className={classes.line} /> : null }
      { _renderItems(items, classes) }
    </div>
  );
};

Timeline.propTypes = {
  classes: PropTypes.object,
  fixed: PropTypes.bool,
  content: PropTypes.object,
};

Timeline.defaultProps = {
  fixed: true
};

Timeline = withStyles(styles)(Timeline);

export { Timeline };