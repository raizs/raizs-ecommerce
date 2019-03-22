import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core';

import styles from './styles/timeline.styles';

let Timeline = props => {
  const { classes, fixed, content: { items, title } } = props;

  return (
    <div
      id='side-timeline'
      style={fixed ? { position: 'fixed', top: 0 } : {}}
      className={classes.wrapper}
    >
      <div className={classes.title}>
        {title}
      </div>
      <div className={classes.line} />
      {items.map(({ id, label, url }) => (
        <a
          key={id}
          className={classes.item}
          href={url} 
        >
          {label}
        </a>
      ))}
    </div>
  );
};

Timeline = withStyles(styles)(Timeline);

export { Timeline };