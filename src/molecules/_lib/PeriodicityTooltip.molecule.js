import React, { Component } from 'react'
import { withStyles, Icon, Tooltip } from '@material-ui/core';
import { periodicityHelpTexts } from '../../assets';
import { MiniDatePickerHelper } from '../../helpers';

const styles = theme => ({
  popper: {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.gray.main} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.gray.main} transparent transparent transparent`,
      },
    }
  },
  tooltip: {
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    border: `1px solid ${theme.palette.black.main}`,
    padding: theme.spacing.unit,
    fontSize: theme.fontSizes.SM,
    '& > div.wrapper': {
      '& > p': {
        color: theme.palette.black.main,
        fontWeight: 500,
        '& + p': {
          marginTop: theme.spacing.unit
        }
      },
      '& > p.title': {
        color: theme.palette.green.main,
        fontWeight: 700,
        fontSize: theme.fontSizes.XS,
      },
      '& > p.dates': {
        fontWeight: 600,
        fontSize: theme.fontSizes.XS,
        marginTop: 0
      },
    }
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.gray.main} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.gray.main} transparent transparent transparent`,
      },
    },
    '&[x-placement*="bottom-end"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.gray.light} transparent`,
      },
    }
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  }
});

class PeriodicityTooltip extends Component {
  state = {
    arrowRef: null
  }

  _handleArrowRef = node => {
    this.setState({
      arrowRef: node
    });
  };

  _renderTooltip = () => {
    const { classes, stockDate, periodicity, secondaryPeriodicity } = this.props;
    const p = {
      biweekly: 14,
      monthly: 28
    }[periodicity];
    const offset = 7 * {
      first: 0,
      second: 1,
      third: 2,
      fourth: 3
    }[secondaryPeriodicity];

    const dates = MiniDatePickerHelper.generateIntervalDatesArray(stockDate, p, offset).join(', ');
    return (
      <div className='wrapper'>
        <p>
          Na entrega {{biweekly: 'quinzenal', monthly: 'mensal'}[periodicity]} você receberá este produto a cada {{biweekly: '2', monthly: '4'}[periodicity]} semanas, sempre no mesmo dia da semana ({ MiniDatePickerHelper.getDay(stockDate) }).
        </p>
        <p>
          {periodicityHelpTexts[`${periodicity}_${secondaryPeriodicity}`]}
        </p>
        <p className='title'>
          Próximas datas de entrega:
        </p>
        <p className='dates'>{dates}...</p>
        <span className={classes.arrow} ref={this._handleArrowRef} />
      </div>
    );
  }

  render() {
    const { classes, periodicity, secondaryPeriodicity, placement } = this.props;
    return (
      <Tooltip
        placement={placement || 'bottom'}
        classes={{
          popper: classes.popper,
          tooltip: classes.tooltip
        }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef,
              },
            },
          }
        }}
        title={this._renderTooltip(periodicity, secondaryPeriodicity)}
      > 
        <Icon>help_outline</Icon>
      </Tooltip>
    )
  }
}

PeriodicityTooltip = withStyles(styles)(PeriodicityTooltip);

export { PeriodicityTooltip };
