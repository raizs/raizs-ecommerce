import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import classnames from "classnames"


const styles = theme => ({
  wrapper: {
    marginRight: 2 * theme.spacing.unit,
    width: '136px'
  },
  title:{
    fontSize: theme.fontSizes.MD,
    textDecoration: 'underline',
    color: theme.palette.black.main,
    fontWeight: 700,
    marginTop: 5 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit
  },
  sectionLink:{
    cursor: "pointer",
    marginBottom: 2 * theme.spacing.unit,
    fontSize: theme.fontSizes.SM,
    color: theme.palette.gray.main,
    fontWeight: 500,
    "&:hover":{
      color: theme.palette.green.main
    }
  },
  selectedLink:{
    color: theme.palette.black.main,
    fontWeight: 700
  },
});

class SideMenu extends Component {

  _renderSectionLinks() {
    const { classes, sections } = this.props;
    return sections.map(section => {
      const classesArr = [classes.sectionLink]
      if (this.props.location.pathname.startsWith(section.route)) classesArr.push(classes.selectedLink) 
      return <div
        key={section.title}
        className={classnames(classesArr)}
        onClick={() => this.props.history.push(section.route)}
      >
        {section.title}
      </div>
    })
  }

  render() {
    const { classes, title } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.title}>{title}</div>
        {this._renderSectionLinks()}
      </div>
    )
  }
};

SideMenu = compose(
  withStyles(styles),
  withRouter,
  )(SideMenu);

export { SideMenu };