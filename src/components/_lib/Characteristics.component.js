import React from 'react'
import { withStyles } from '@material-ui/core';
import { characteristicsItems } from '../../assets';
import ReactSVG from 'react-svg';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  items: {
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  item: {
    width: '120px',
    display: 'inline-block',
    cursor: 'pointer',
    '& p': {
      width: '100%',
      textAlign: 'center',
      color: theme.palette.gray.main,
      fontWeight: 600,
      lineHeight: '18px'
    },
    '&:hover p': {
      color: theme.palette.black.main
    },
    '&:hover svg *': {
      fill: `${theme.palette.green.main} !important`
    }
  },
  svg: {
    width: '100%',
    height: '120px'
  }
});

const _renderItems = ({ classes }) => {
  return characteristicsItems.map(({ src, label }) =>
    <div className={classes.item}>
      <ReactSVG
        src={src}
        className={classes.svg}
      />
      <p>{label}</p>
    </div>
  );
};

let Characteristics = props => {
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <div className={classes.items}>
        {_renderItems({ classes })}
      </div>
    </div>
  )
}

Characteristics = withStyles(styles)(Characteristics);

export { Characteristics };