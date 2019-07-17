import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import Slider from 'react-slick';
import classnames from 'classnames';

import { MiniDatePickerHelper } from '../../helpers';
import { SliderArrow } from '../../molecules';

const styles = theme => ({
  wrapper: {
    maxWidth: '1100px',
    '& > h4': {
      fontSize: theme.fontSizes.LG,
      textAlign: 'center',
      marginBottom: 4 * theme.spacing.unit
    },
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'top',
      '& > div:focus, & > div > div:focus': {
        outline: 'none'
      }
    },
    '& .slick-slider': {
      padding: '0 56px'
    }
  },
  item: {
    textAlign: 'center',
    '& > div': {
      display: 'inline-block',
      cursor: 'pointer',
      width: '120px',
      borderRadius: theme.spacing.unit,
      border: `1px solid ${theme.palette.gray.border}`,
      padding: theme.spacing.unit,
      backgroundColor: 'white',
      transition: '.4s',
      '& div.weekday': {
        fontSize: theme.fontSizes.SM,
        fontWeight: 600,
        color: theme.palette.gray.main,
        marginBottom: theme.spacing.unit/2
      },
      '& div.day': {
        fontSize: theme.fontSizes.LG,
        color: theme.palette.gray.main,
        fontWeight: 500
      },
    },
    '&.-selected > div': {
      backgroundColor: theme.palette.green.main,
      '& div': { color: 'white !important' }
    }
  }
});

class BigDatePicker extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      options: MiniDatePickerHelper.generateDatesObject(),
      selected: MiniDatePickerHelper.generateDatesObject()[0],
      value: 0,
      initialSlide: false
    }
  }

  componentDidMount() {
    if(this.props.selected !== this.state.value) {
      const toState = {
        value: this.props.selected,
        selected: this.state.options[this.props.selected],
      };

      if(!this.state.initialSlide) {
        toState.initialSlide = true;
        this.slider.slickGoTo(this.props.selected >= 12 ? 12 : this.props.selected >= 6 ? 6 : 0);
      }

      this.setState(toState);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.selected !== this.state.value) {
      const toState = {
        value: nextProps.selected,
        selected: this.state.options[nextProps.selected]
      };

      if(!this.state.initialSlide) {
        toState.initialSlide = true;
        this.slider.slickGoTo(nextProps.selected >= 12 ? 13 : nextProps.selected >= 6 ? 7 : 0);
      }

      this.setState(toState);
    }
  }

  render() {
    const { handleSelectDate, classes } = this.props;
    const { options, value, initialSlide } = this.state;

    const settings = {
      slidesToShow: 6,
      slidesToScroll: 6,
      prevArrow: <SliderArrow isSmall to='prev' />,
      nextArrow: <SliderArrow isSmall to='next' />,
      infinite: false,
      draggable: false,
    };

    return (
      <div className={classes.wrapper}>
        <h4>Escolha um dia para a entrega</h4>
        <Slider ref={s => this.slider = s} {...settings}>
          {options.map(option => {
            const className = [classes.item];
            if(option.value == value) className.push('-selected');

            return (
              <div key={option.day} className={classnames(className)}>
                <div onClick={async () => {
                  if(!initialSlide) await this.setState({ initialSlide: true });
                  handleSelectDate(option.value);
                }} >
                  <div className='weekday'>
                    {option.weekday.toUpperCase()}
                  </div>
                  <div className='day'>
                    {option.day}
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

BigDatePicker = withStyles(styles)(BigDatePicker);

export { BigDatePicker };