import React from 'react'
import Slider from 'react-slick';
import { withStyles } from '@material-ui/core';
import { ClientComment } from '../../molecules';

const N = 8;

const styles = theme => ({
  title: {
    ...theme.typography.raizs,
    marginTop: 0,
    marginBottom: 4 * theme.spacing.unit
  },
  sliderWrapper: {
    position: 'relative',
    marginTop: 4 * theme.spacing.unit,
    '& .slick-slider': {
      padding: `0 ${.48 * window.innerWidth - 332}px !important`
    },
    '& .slick-slide': {
      display: 'inline-block',
      verticalAlign: 'top',
      '& > div:focus, & > div > div:focus': {
        outline: 'none'
      },
      '&.slick-active div.wrapper': {
        border: `1px solid ${theme.palette.green.main}`
      }
    },
    '& .slick-dots': {
      marginTop: 3 * theme.spacing.unit,
      '& li': {
        width: 'auto',
        display: 'inline-block',
        margin: '0 4px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        height: '8px',
        width: '8px',
        borderRadius: '50%',
        '&:first-child': {
          marginLeft: `calc(50% - ${N * 12}px)`
        },
        '& button': {
          position: 'absolute',
          color: 'transparent',
          backgroundColor: theme.palette.gray.main,
          height: '8px',
          width: '8px',
          borderRadius: '50%',
          cursor: 'pointer',
        },
        '&.slick-active button': {
          backgroundColor: theme.palette.green.main,
        }
      }
    }
  }
});

let ClientCommentsSlider = props => {
  const { classes } = props;

  const settings = {
    slidesToShow: 1,
    centerMode: true,
    arrows: false,
    dots: true,
    infinite: true,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const arr = [];
  for(let i = 0; i < N; i++) {
    arr.push('dummy');
  }

  return (
    <div>
      <h3 className={classes.title}>
        Veja o que outros clientes tem a dizer!
      </h3>
      <div className={classes.sliderWrapper}>
        <Slider {...settings}>
          {arr.map(comment => {
            return <ClientComment />;
          })}
        </Slider>
      </div>
    </div>
  );
};

ClientCommentsSlider = withStyles(styles)(ClientCommentsSlider);

export { ClientCommentsSlider };