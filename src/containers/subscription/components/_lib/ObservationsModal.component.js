import React from 'react'
import { withStyles, Button } from '@material-ui/core';
import { Modal } from '../../../../components';

const styles = theme => ({
  halfSection: {
    width: '50%',
    display: 'inline-block',
    verticalAlign: 'top',
    textAlign: 'center',
    padding: `0 ${2 * theme.spacing.unit}px`,
    '& > h4': {
      fontSize: theme.fontSizes.LG,
      fontWeight: 700,
      marginBottom: 2 * theme.spacing.unit
    },
    '& > h6': {
      fontSize: theme.fontSizes.SM,
      fontWeight: 500,
      color: theme.palette.gray.main,
      marginBottom: 2 * theme.spacing.unit,
      lineHeight: '16px'
    },
    '& > textarea': {
      width: '100%',
      height: '200px',
      padding: theme.spacing.unit,
      borderRadius: theme.spacing.unit,
      lineHeight: '16px',
      border: `1px solid ${theme.palette.gray.border}`,
      resize: 'none',
      '&:focus': {
        border: `1px solid ${theme.palette.green.main}`,
      }
    }
  },
  button: {
    ...theme.buttons.primary,
    marginTop: 2 * theme.spacing.unit,
    display: 'inline-block',
    fontSize: theme.fontSizes.MMD
  }
});

let ObservationsModal = props => {
  const {
    classes,
    open,
    handleSubmit,
    handleClose,
    handleChange,
    restrictions,
    preferences
  } = props;
  return (
    <Modal open={open} handleClose={handleClose}>
      <form
        style={{ textAlign: 'center' }}
      >
        <div className={classes.halfSection}>
          <h4>Restrições</h4>
          <h6>Digite abaixo qualquer restrição ou alergia para envio de produto</h6>
          <textarea
            id='restrictions'
            placeholder={`Ex: Não trazer lorem ipsum, apenas ipsum lorems\n\nDuas linhas!`}
            value={restrictions}
            onChange={handleChange}
          />
        </div>
        <div className={classes.halfSection}>
          <h4>Preferências</h4>
          <h6>Digite abaixo qualquer preferência para envio de produto</h6>
          <textarea
            id='preferences'
            placeholder={`Ex: Sempre trazer lorem ipsum\n\nDuas linhas!`}
            value={preferences}
            onChange={handleChange}
          />
        </div>
        <Button
          id='submitObservations'
          className={classes.button}
          onClick={handleSubmit}
        >
          Salvar
        </Button>
      </form>
    </Modal>
  )
}

ObservationsModal = withStyles(styles)(ObservationsModal);

export { ObservationsModal };