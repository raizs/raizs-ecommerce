import React, { Component } from 'react'
import { withStyles, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import classnames from 'classnames';

import { SimplePopper } from '..';
import { MiniDatePickerHelper } from '../../helpers';

const styles = theme => ({
  radioInput: {
    ...theme.inputs.radio,
    marginLeft: 0,
    '& > span': {
      padding: 0
    },
    '& svg': {
      fill: theme.palette.gray.main,
      width: '.75em',
      marginRight: theme.spacing.unit
    },
    '&:hover': {
      '& span': {
        fontWeight: 700
      }
    },
    '&.-selected': {
      '& svg': {
        fill: theme.palette.green.main
      },
      '& span': {
        color: theme.palette.green.main
      }
    }
  },
});

class MiniDatePicker extends Component {
  state = {
    options: MiniDatePickerHelper.generateDatesObject(),
    selected: MiniDatePickerHelper.generateDatesObject()[0],
    value: 0
  }

  componentWillMount() {
    if(this.props.selected !== this.state.value) 
      this.setState({
        value: this.props.selected,
        selected: this.state.options[this.props.selected]
      });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selected !== this.state.value) 
      this.setState({
        value: nextProps.selected,
        selected: this.state.options[nextProps.selected]
      });
  }
  
  _renderOptions() {
    const { handleSelectDate, classes } = this.props;
    const { options } = this.state;
    let { value } = this.state;

    value = value.toString();

    return (
      <RadioGroup
        name="date"
        inputref='div'
        value={value}
        onChange={handleSelectDate}
      >
        {options.map(option => {
          const formControlClasses = [classes.radioInput];
          if(option.value.toString() === value) formControlClasses.push('-selected');

          return (
            <FormControlLabel
              className={classnames(formControlClasses)}
              value={option.value}
              key={option.value}
              control={
                <Radio
                  checked={option.value.toString() === value}
                />
              }
              label={option.date}
            />
          );
        })}
      </RadioGroup>
    );
  }

  render() {
    const { selected } = this.state;
    const { zIndex } = this.props;

    return (
      <SimplePopper zIndex={zIndex} from='miniDatePicker' label={`Comprando para ${selected.bigSuffix}`}>
        {this._renderOptions()}
      </SimplePopper>
    )
  }
}

MiniDatePicker = withStyles(styles)(MiniDatePicker);

export { MiniDatePicker };