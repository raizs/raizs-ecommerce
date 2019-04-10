import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import { SimplePopper } from '..';
import { MiniDatePickerHelper } from '../../helpers';

class MiniDatePicker extends Component {
  state = {
    options: MiniDatePickerHelper.generateDatesObject(),
    selected: MiniDatePickerHelper.generateDatesObject()[0],
    value: 0,
  }

  _renderOptions() {
    return this.state.options.map(option => {
      return (
        <div
          key={option.value}
          id={option.value}
          onClick={() => this.setState({ value: option.id, selected: option })}>{option.date}</div>
      );
    })
  }

  render() {
    const { selected } = this.state;

    return (
      <SimplePopper label={`Comprando para ${selected.suffix}`}>
        {this._renderOptions()}
      </SimplePopper>
    )
  }
}

MiniDatePicker = withStyles({})(MiniDatePicker);

export { MiniDatePicker };