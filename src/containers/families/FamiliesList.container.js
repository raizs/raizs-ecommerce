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
    userSelect: 'none',
    paddingBottom: 8 * theme.spacing.unit
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
      '& > div > *': {
        display: 'inline-block',
        color: theme.palette.green.main,
        verticalAlign: 'middle',
        cursor: 'pointer'
      },
      '& > div > h4': {
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
  },

  action: {
    backgroundColor: 'white',
    boxShadow: theme.shadows[1],
    '& > div': {
      maxWidth: '1024px',
      margin: 'auto',
      display: 'flex',
      padding: 4 * theme.spacing.unit,
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > h2': {
        fontSize: theme.fontSizes.XL,
        lineHeight: '36px',
        fontFamily: 'raizs',
        fontWeight: 400,
        display: 'inline-block',
      },
      '& > button': {
        ...theme.buttons.primary,
        display: 'inline-block',
        fontSize: theme.fontSizes.LG
      }
    }
  }
});

class FamiliesList extends BaseContainer {
  constructor(props) {
    super(props, FamiliesController);
  }

  componentDidMount() {
    document.title = 'Raízs | Famílias';
    window.scrollTo({ y: 0 });
  }
  
  _renderList() {
    const { history } = this.props;

    return [1,2,3,4,5,6,7,8,9].map(item =>
      <div className='item' onClick={() => history.push(`/familias/${item.id || 1}`)}>
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
    const { classes, history } = this.props;
    const { handleScroll } = this.controller;

    return (
      <div className={classes.wrapper}>

        <section id='top' className={classes.topSection}>
          <h1>TODOS FAZEM<br/>A DIFERENÇA</h1>
          <div>
            <div onClick={handleScroll}>
              <h4>Conheça as Famílias</h4>
              <Icon>keyboard_arrow_down</Icon>
            </div>
          </div>
        </section>

        <section id='lista' className={classes.families}>
          {this._renderList()}
        </section>

        <section id='action' className={classes.action}>
          <div>
            <h2>Você pode impactar diretamente<br/>a vida dos produtores!</h2>
            <Button id='fundo' onClick={() => history.push('/quem-somos#fundo')}>Saiba mais</Button>
          </div>
        </section>

      </div>
    )
  }
}

const mapStateToProps = state => ({
});

FamiliesList = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(FamiliesList);

export { FamiliesList };