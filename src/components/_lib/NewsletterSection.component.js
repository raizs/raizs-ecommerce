import React from 'react'
import { withStyles, Button } from '@material-ui/core';
import { Loading } from '../../molecules';

const N = 8;

const styles = theme => ({
  wrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.palette.green.main,
    textAlign: 'center',
    '& > h5': {
      color: 'white',
      fontSize: theme.fontSizes.LG,
      lineHeight: '28px',
      fontWeight: 700,
      marginBottom: 3 * theme.spacing.unit,
      paddingTop: 6 * theme.spacing.unit
    },
    '& > div.input-wrapper': {
      position: 'relative',
      display: 'inline-block',
      width: '720px',
      paddingBottom: 6 * theme.spacing.unit,
      '&  > input': {
        width: '100%',
        padding: 4 * theme.spacing.unit,
        borderRadius: theme.spacing.unit,
        fontSize: theme.fontSizes.MD,
        '&:focus': {
          outline: 'none'
        }
      },
      '& > button': {
        ...theme.buttons.secondary,
        fontSize: theme.fontSizes.MD,
        height: '45px',
        position: 'absolute',
        right: '32px',
        top: '20px',
      }
    }
  }
});

let NewsletterSection = props => {
  const {
    id,
    value,
    classes,
    handleSubmit,
    handleChange,
    loading
  } = props;

  return (
    <section className={classes.wrapper}>
      {loading && <Loading absolute />}
      <h5>Fique por dentro de novidades e promoções,<br/>inscreva-se na nossa newsletter.</h5>
      <div className='input-wrapper'>
        <input
          id={id}
          value={value}
          placeholder='Digite seu e-mail aqui'
          onChange={handleChange}
        />
        <Button id='sendNewsletter' onClick={handleSubmit} >
          Enviar
        </Button>
      </div>
    </section>
  );
};

NewsletterSection = withStyles(styles)(NewsletterSection);

export { NewsletterSection };