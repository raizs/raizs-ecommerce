import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button, Icon } from '@material-ui/core';
import compose from 'recompose/compose';
import { updateCartAction } from '../../store/actions';

import { BaseContainer } from '../../helpers';
import { FamiliesController } from './Families.controller';

const actions = { updateCartAction };

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    userSelect: 'none'
  },
  primaryButton: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.LG,
    display: 'inline-block'
  },

  topSection: {
    height: window.innerHeight - 96,
    padding: `${12 * theme.spacing.unit}px 0`,
    '& > h1': {
      ...theme.typography.raizs,
      fontSize: '64px',
      lineHeight: '68px',
      textAlign: 'left',
      maxWidth: '1024px',
      margin: 'auto'
    },
    '& > div': {
      textAlign: 'left',
      maxWidth: '1024px',
      margin: 'auto',
      marginTop: 2 * theme.spacing.unit,
      '& > a > *': {
        display: 'inline-block',
        color: theme.palette.green.main,
        verticalAlign: 'middle',
        cursor: 'pointer'
      },
      '& > a > h4': {
        marginRight: theme.spacing.unit
      }
    }
  },

  families: {
    maxWidth: '1200px',
    margin: 'auto',
    padding: `${4 * theme.spacing.unit}px 0`,
    '& .item': {
      width: `calc(33% - ${4 * theme.spacing.unit}px)`,
      margin: `0 ${2 * theme.spacing.unit}px ${4 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`,
      cursor: 'pointer',
      borderRadius: theme.spacing.unit,
      display: 'inline-block',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: theme.shadows[1],
      '& > div.top': {
        fontFamily: 'raizs',
        fontSize: theme.fontSizes.MMD,
        lineHeight: '48px',
        backgroundColor: 'white',
        textAlign: 'center'
      },
      '& div.image-wrapper': {
        height: '160px',
        overflow: 'hidden',
        position: 'relative'
      },
      '& div.glass': {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.0)',
        transition: '.4s'
      },
      '& div.image': {
        backgroundImage: 'url("https://www.austockphoto.com.au/imgcache/uploads/photos/thumbnail/person-holding-box-of-fresh-fruit-and-veg-outside-on-a-farm-austockphoto-000069005.JPG?v=1.2.3")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '160px',
        transition: '.4s'
      },
      '& p': {
        position: 'absolute',
        top: 'calc(100% + 16px)',
        left: 0,
        right: 0,
        margin: 'auto',
        color: 'white',
        transition: '.4s',
        textAlign: 'center',
        fontWeight: 700,
        verticalAlign: 'middle',
        lineHeight: '24px',
        '& span': {
          verticalAlign: 'middle',
          color: 'white'
        }
      },
      '&:hover': {
        '& > div.top': {
          color: theme.palette.green.main,
        },
        '& div.image': {
          transform: 'scale(1.125)'
        },
        '& div.glass': {
          backgroundColor: 'rgba(0,0,0,.7)'
        },
        '& p': {
          top: 'calc(100% - 32px)',
        }
      }
    }
  }
});

class Families extends BaseContainer {
  constructor(props) {
    super(props, FamiliesController);
  }

  _renderList() {
    return [1,2,3,4,5,6,7,8,9].map(item =>
      <div className='item'>
        <div className='top'>Nome da família</div>
        <div className='image-wrapper'>
          <div className='image' />
          <div className='glass' />
        </div>
        <p>saiba mais <Icon>keyboard_arrow_right</Icon></p>
      </div>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>

        <section id='top' className={classes.topSection}>
          <h1>TODOS FAZEM<br/>A DIFERENÇA</h1>
          <div>
            <a href='#lista'>
              <h4>Conheça as Famílias</h4>
              <Icon>keyboard_arrow_down</Icon>
            </a>
          </div>
        </section>

        <section id='lista' className={classes.families}>
          {this._renderList()}
        </section>

      </div>
    )
  }
}

const mapStateToProps = state => ({
});

export default compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(Families);