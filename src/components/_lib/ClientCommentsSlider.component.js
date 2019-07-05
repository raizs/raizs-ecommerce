import React from 'react'
import Slider from 'react-slick';
import { withStyles } from '@material-ui/core';
import { ClientComment } from '../../molecules';
import { SliderHelper } from '../../helpers';
import { CLIENT_COMMENT_WIDTH } from '../../molecules/_lib/ClientComment.molecule';

const N = 8;

const styles = theme => ({
  title: {
    ...theme.typography.raizs,
    marginTop: 0,
    marginBottom: 4 * theme.spacing.unit
  }
});

let ClientCommentsSlider = props => {
  const { classes } = props;
  const centerPadding = SliderHelper.clientCommentsCenterPadding(window.innerWidth, CLIENT_COMMENT_WIDTH);

  const settings = {
    slidesToShow: 1,
    centerMode: true,
    centerPadding,
    arrows: false,
    dots: true,
    infinite: true,
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
      <Slider {...settings}>
        {arr.map(comment => {
          return <ClientComment key={comment} />;
        })}
      </Slider>
    </div>
  );
};

ClientCommentsSlider = withStyles(styles)(ClientCommentsSlider);

export { ClientCommentsSlider };