import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, Collapse } from '@material-ui/core';

import styles from './styles/timeline.styles';
import { CollapsibleTimelineItem } from '../../molecules';

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