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
  console.log('in bottom header', props.selectedDate);

  return (
    <div className={classes.wrapper}>
      <MiniDatePicker
        handleSelectDate={handleSelectDate}
        selected={selectedDate ? selectedDate.selected : 0}
      />
    </div>
  )
};

BottomHeader = withStyles(styles)(BottomHeader);

export { BottomHeader };