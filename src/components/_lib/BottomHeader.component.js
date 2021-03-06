import React from 'react'
import { withStyles } from '@material-ui/core';
import { MiniDatePicker } from '../../molecules';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.green.light,
    padding: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'center'
  }
})

let BottomHeader = props => {
  const { classes, handleSelectDate, selectedDate } = props;

  return (
    <div className={classes.wrapper}>
      <MiniDatePicker
        handleSelectDate={handleSelectDate}
        selected={selectedDate}
      />
    </div>
  )
};

BottomHeader = withStyles(styles)(BottomHeader);

export { BottomHeader };