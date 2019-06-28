import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { withStyles, Button } from '@material-ui/core';
import compose from 'recompose/compose';

const styles = theme => ({
  wrapper: {
    backgroundColor: theme.palette.gray.bg,
    height: window.innerHeight - 96,
    padding: 8 * theme.spacing.unit,
    textAlign: 'center',
    userSelect: 'none',
    '& > h2': {
      ...theme.typography.raizs,
      marginBottom: 3 * theme.spacing.unit
    },
    '& > h3': {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 700,
      marginBottom: 6 * theme.spacing.unit
    }
  },
  primaryButton: {
    ...theme.buttons.primary,
    fontSize: theme.fontSizes.LG,
    display: 'inline-block'
  }
});

class Home extends Component {
  
  componentDidMount() {
    document.title = 'Raízs Orgânicos';    
  }
  
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <h2>Está na dúvida?</h2>
        <h3>Te ajudamos a escolher entre<br/>uma assinatura de cesta ou um pedido avulso.</h3>
        <div style={{ textAlign: 'center' }}>
          <Button className={classes.primaryButton}>Fazer o Quiz</Button>
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(Home);