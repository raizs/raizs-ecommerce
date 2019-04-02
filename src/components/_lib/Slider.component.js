import React, { Component } from "react";
import Slick from "react-slick";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  a: 'b'
});
 
class Slider extends Component {

  renderComponents() {
    const { components } = this.props;

    return components.map(component => (
      <div>{component}</div>
    ));
  }

  render() {
    var settings = {
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <Slick {...settings}>
        {this.renderComponents()}
      </Slick>
    );
  }
}

Slider = withStyles(styles)(Slider);

export { Slider };