import React from 'react'
import Slider from 'react-slick';
import { withStyles } from '@material-ui/core';
import { mediaObjects } from '../../assets';
import { SliderHelper } from '../../helpers';

const N = 8;

const styles = theme => ({
  title: {
    ...theme.typography.raizs,
    marginTop: 0,
    marginBottom: 4 * theme.spacing.unit
  },
  sliderWrapper: {
    padding: `${8 * theme.spacing.unit}px 0`,
    backgroundColor: 'white',
    '& .slick-track': {
      height: 80,
      position: 'relative',
      '& > div': {
        verticalAlign: 'middle',
      }
    }
  },
  item: {
    cursor: 'default',
    textAlign: 'center',
    margin: 'auto',
    height: 60,
    '& img': {
      cursor: 'pointer',
      display: 'inline-block',
      height: 60
    },
    '&:focus': {
      outline: 'none'
    }
  }
});

let MediaSlider = props => {
  const { classes } = props;
  const centerPadding = SliderHelper.mediaCenterPadding(window.innerWidth, 240);

  const settings = {
    centerMode: true,
    centerPadding,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div>
      <h3 className={classes.title}>
        Raízs na mídia
      </h3>
      <div className={classes.sliderWrapper}>
        <Slider {...settings}>
          {mediaObjects.map(obj => {
            return (
              <a className={classes.item} key={obj.url} target='blank' href={obj.url}>
                <img src={obj.src} />
              </a>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

MediaSlider = withStyles(styles)(MediaSlider);

export { MediaSlider };