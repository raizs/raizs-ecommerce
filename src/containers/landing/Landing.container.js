import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';
import compose from 'recompose/compose';
import { abSections } from '../../assets';

const actions = {};

const styles = theme => ({
  topSection: {
    height: window.innerHeight - 96,
    textAlign: 'center',
    backgroundColor: theme.palette.gray.bg
  },
  h1: {
    paddingTop: '144px',
    fontSize: theme.fontSizes.XXL,
    lineHeight: '54px',
    fontWeight: 400
  },
  h2: {
    marginTop: '48px',
    fontSize: theme.fontSizes.LG,
    fontWeight: 700,
    lineHeight: '32px'
  },
  abSections: {
    backgroundColor: theme.palette.gray.bg,
    padding: '64px',
    display: 'flex',
    justifyContent: 'center', 
    '& > div.wrapper': {
      width: '100%',
      maxWidth: '1000px',
    }
  },
  abSection: {
    width: '100%',
    height: '320px',
    '& > div': {
      display: 'inline-block',
      verticalAlign: 'middle',
      '& > img': {
        height: '100%',
        width: '100%'
      }
    },
    '& + div': {
      marginTop: 3 * theme.spacing.unit
    }
  },
  abText: {
    '& > .title': {
      fontSize: theme.fontSizes.XL,
      fontWeight: 600,
      marginBottom: 2 * theme.spacing.unit
    },
    '& > .description': {
      fontSize: theme.fontSizes.MD,
      color: theme.palette.gray.main,
      fontWeight: 400
    }
  },
  abImage: {
    height: '100%'
  }
});

class Landing extends Component {
  state = {
    showTopButton: true 
  }

  componentDidMount() {
    
  }

  _renderAbSections() {
    const { classes } = this.props;

    return abSections.map(({ a, b }) => {

      const contentTypes = {
        text: el => (
          <div
            className={classes.abText}
            style={{
              width: `calc(${el.width} - 24px)`,
              [`margin${el.section === 'a' ? 'Right' : 'Left'}`]: '24px'
            }}
          >
            <h4 className='title'>{el.title}</h4>
            <p className='description'>{el.description}</p>
          </div>
        ),
        image: el => (
          <div
            className={classes.abImage}
            style={{
              width: `calc(${el.width} - 24px)`,
              [`margin${el.section === 'a' ? 'Right' : 'Left'}`]: '24px'
            }}
          >
            <img src={el.src} alt={el.alt} />
          </div>
        )
      };

      return (
        <div className={classes.abSection}>
          {contentTypes[a.type](a)}
          {contentTypes[b.type](b)}
        </div>
      )
    });
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div>
        <section className={classes.topSection}>
          <h1 className={classes.h1}>
            ORGÂNICOS CERTIFICADOS,<br/>DE PEQUENOS PRODUTORES,<br/>NA PORTA DA SUA CASA
          </h1>
          <h2 className={classes.h2}>
            Você escolhe o dia que quer receber, de segunda a sábado.<br/>
            Simples, rápido e seguro.
          </h2>
        </section>
        <section id='abSection' className={classes.abSections}>
          <div className='wrapper'>
            {this._renderAbSections()}
          </div>
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
  connect(mapStateToProps, actions),
  withFirebase
)(Landing);