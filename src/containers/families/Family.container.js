import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, Button, Icon } from '@material-ui/core';
import compose from 'recompose/compose';
import { updateCartAction } from '../../store/actions';
import { Player, BigPlayButton } from 'video-react';
import "video-react/dist/video-react.css";

import { BaseContainer } from '../../helpers';
import { FamiliesController } from './Families.controller';
import { ProductsSlider } from '../../components';

const actions = { updateCartAction };

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    userSelect: 'none'
  },

  about: {
    '& > div': {
      maxWidth: '1280px',
      margin: 'auto',
      borderRadius: theme.spacing.unit,
      backgroundColor: 'white',
      overflow: 'hidden',
      padding: `${4 * theme.spacing.unit}px 0`,
      boxShadow: theme.shadows[2],
      '& > div.back': {
        cursor: 'pointer',
        display: 'inline-block',
        verticalAlign: 'middle',
        color: theme.palette.green.main,
        fontWeight: 700,
        paddingLeft: 4 * theme.spacing.unit,
        '& > span': {
          color: theme.palette.green.main,
          display: 'inline-block',
          verticalAlign: 'middle'
        }
      },
      '& > h1': {
        ...theme.typography.raizs,
        textAlign: 'left',
        marginTop: 2 * theme.spacing.unit,
        paddingLeft: 8 * theme.spacing.unit,
        paddingRight: 8 * theme.spacing.unit
      },
      '& > h2': {
        fontSize: theme.fontSizes.LG,
        lineHeight: '28px',
        fontWeight: 700,
        textAlign: 'left',
        marginTop: 2 * theme.spacing.unit,
        marginBottom: 8 * theme.spacing.unit,
        paddingLeft: 8 * theme.spacing.unit,
        paddingRight: 8 * theme.spacing.unit
      },
      '& > div.history': {
        padding: 8 * theme.spacing.unit,
        '& > div': {
          color: theme.palette.gray.main,
          lineHeight: '20px',
          whiteSpace: 'pre-wrap',
          columnCount: '2',
          fontWeight: 600
        }
      }
    }
  },

  player: {
    backgroundColor: 'transparent !important',
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, .5) !important',
    height: '100px !important',
    width: '100px !important',
    top: '0 !important',
    bottom: '0 !important',
    left: '0 !important',
    right: '0 !important',
    margin: 'auto !important',
    borderRadius: '50% !important',
    borderWidth: '0 !important',
    '&:before': {
      fontSize: '80px',
      marginTop: '28px'
    }
  },

  products: {
    padding: `${6 * theme.spacing.unit}px`,
    '& > div': {
      margin: 'auto',
      padding: '0 24px'
    },
    '& > h4': {
      fontSize: theme.fontSizes.LG,
      fontWeight: 700,
      margin: 'auto',
      padding: '0 24px',
      marginBottom: 2 * theme.spacing.unit
    }
  },

  action: {
    paddingBottom: 8 * theme.spacing.unit,
    '& > div': {
      maxWidth: '1280px',
      margin: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
        '& > div.cta': {
        backgroundColor: 'white',
        borderRadius: theme.spacing.unit,
        overflow: 'hidden',
        display: 'flex',
        padding: 4 * theme.spacing.unit,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
        '& > h2': {
          fontSize: theme.fontSizes.LG,
          lineHeight: '32px',
          fontWeight: 400,
          display: 'inline-block',
        },
        '& > button': {
          ...theme.buttons.primary,
          display: 'inline-block',
          fontSize: theme.fontSizes.LG
        }
      },
      '& > div.dream': {
        width: '280px',
        '& > div.image': {
          borderRadius: theme.spacing.unit,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url("https://image.shutterstock.com/image-photo/closeup-farmer-face-rice-field-450w-160258607.jpg")',
          width: '100%',
          height: '176px'
        },
        '& > h6': {
          fontSize: theme.fontSizes.LG,
          lineHeight: '32px',
          fontWeight: 700,
          marginTop: 2 * theme.spacing.unit,
        },
        '& > p': {
          color: theme.palette.gray.main,
          marginTop: 2 * theme.spacing.unit,
          lineHeight: '20px'
        }
      },
    }
  }
});

class Family extends BaseContainer {
  constructor(props) {
    super(props, FamiliesController);
  }

  _renderHistory() {
    return <div>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam cursus, leo aliquam ullamcorper porttitor, justo orci semper massa, ut tincidunt ante velit ac lectus. Phasellus tristique enim diam. Integer iaculis rhoncus velit vel condimentum. Donec et tincidunt enim, ac maximus est.\n\nEtiam ullamcorper dui consequat finibus rutrum. In ante lacus, aliquet quis porta id, aliquam sit amet nulla. Donec convallis semper dolor, quis blandit enim dictum at. Nunc pretium massa ac elit laoreet, eu sagittis libero luctus. In commodo faucibus magna, sed posuere orci eleifend ut. Donec a rhoncus ligula. Duis ullamcorper quis lectus eget fermentum.Proin auctor volutpat nisi eu congue.\n\nAliquam consequat eros id nisl pellentesque malesuada. Integer non elit non nunc molestie eleifend. Ut nunc urna, fermentum eget venenatis nec, imperdiet a mauris. Nulla facilisi. Donec interdum sapien in metus gravida maximus. Fusce placerat feugiat sagittis. Suspendisse eu consectetur sem. Mauris eu enim mauris.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nullam dui lorem, pellentesque a posuere eget, tincidunt vel turpis.\n\nIn dictum, magna nec ultricies eleifend, ante ligula ultricies urna, a rutrum est ante ut odio. Aenean pretium nisl lorem. Cras sodales ut leo sit amet sollicitudin. Nam semper nec tellus vitae mollis. Sed laoreet arcu urna, ut faucibus mi viverra sed. Vivamus vitae eros molestie, auctor turpis in, viverra nunc. Donec imperdiet quam eget lacus posuere rhoncus.Morbi sagittis faucibus fermentum. Aenean tincidunt sagittis felis, vitae convallis risus fringilla tristique. Suspendisse potenti.\n\nNunc fringilla est id ullamcorper malesuada. Morbi tempus tempus turpis non convallis. Sed urna tortor, convallis at neque sed, mollis tristique felis. Nunc ut justo eu mi sagittis commodo elementum non massa.'}</div>
  }

  render() {
    const { classes, history, popularProducts, cart } = this.props;
    const { handleUpdateCart } = this.controller;

    return (
      <div className={classes.wrapper}>

        <section id='about' className={classes.about}>
          <div>
            <div className='back' onClick={() => history.push('/familias')}>
              <Icon>keyboard_arrow_left</Icon> Voltar
            </div>
            <h1>Nome da família</h1>  
            <h2>"Meu pai me ensinou desde pequeno a cuidar da horta.”</h2>
            <Player
              width='100%'
              height={540}
              className={classes.player}
              src='http://techslides.com/demos/sample-videos/small.webm'
            >
              <BigPlayButton className={classes.playButton} position='center' />
            </Player>
            <div className='history'>
              {this._renderHistory()}
            </div>
          </div>
        </section>

        <section id='products' className={classes.products}>
          <h4>Produtos dessa família</h4>
          <div>
            <ProductsSlider
              cart={cart}
              handleUpdateCart={handleUpdateCart}
              products={popularProducts}
            />
          </div>
        </section>

        <section id='action' className={classes.action}>
          <div>
            <div className='cta'>
              <h2>
                Personalize uma cesta e<br/>
                receba orgânicos frequinhos,<br/>
                de diferentes famílias produtoras,<br/>
                toda semana!
              </h2>
              <Button id='assinatura' onClick={() => history.push('/assinatura')}>Montar cesta</Button>
            </div>
            <div className='dream'>
              <div className='image'/>
              <h6>Nome</h6>
              <p>De geração em geração, a família divide o sonho de que o produtor orgânico familiar seja mais valorizado, tanto pelo consumidor quanto pelo mercado.</p>
            </div>
          </div>
        </section>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  popularProducts: state.products.popularProducts,
  cart: state.cart.current
});

Family = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
)(Family);

export { Family };