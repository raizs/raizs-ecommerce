import React from 'react'
import Slider from 'react-slick';
import { withStyles } from '@material-ui/core';
import { mediaObjects } from '../../assets';

const N = 8;

const styles = theme => ({
  title: {
    ...theme.typography.raizs,
    marginTop: 0,
    marginBottom: 4 * theme.spacing.unit
  },
  sliderWrapper: {
    position: 'relative',
    marginTop: 12 * theme.spacing.unit,
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'middle',
      '& a': {
        cursor: 'default',
        textAlign: 'center',
        '& img': {
          cursor: 'pointer'
        },
        '&:focus': {
          outline: 'none'
        }
      }
    }
  }
});

let MediaSlider = props => {
  const { classes } = props;

  const settings = {
    slidesToShow: 3,
    centerMode: true,
    arrows: false,
    infinite: true,
    draggable: false,
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
            return <a target='blank' href={obj.url}><img src={obj.src} /></a>;
          })}
        </Slider>
      </div>
    </div>
  );
};

MediaSlider = withStyles(styles)(MediaSlider);

export { MediaSlider };