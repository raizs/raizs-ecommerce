import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles, Collapse } from '@material-ui/core';
import { Loading, FacebookButton, GoogleButton } from '../../../../../molecules';
import { Formatter } from '../../../../../helpers';

import { AddressForm } from '.';

const styles = theme => ({
  section: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit
  },
  title: {
    backgroundColor: theme.palette.green.main,
    borderTopRightRadius: theme.spacing.unit,
    borderTopLeftRadius: theme.spacing.unit,
    padding: theme.spacing.unit,
    cursor: 'pointer',
    userSelect: 'none',
    '& > *': {
      display: 'inline-block',
      verticalAlign: 'middle'
    }
  },
  number: {
    color: 'white',
    fontWeight: 600,
    height: 3 * theme.spacing.unit,
    width: 3 * theme.spacing.unit,
    lineHeight: `${3 * theme.spacing.unit}px`,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, .3)'
  },
  label: {
    color: 'white',
    fontWeight: 600,
    marginLeft: theme.spacing.unit
  },
  content: {
    position: 'relative',
    marginTop: 3 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit,
    padding: `0 ${3 * theme.spacing.unit}px`
  },
  formTitle: {
    ...theme.typography.formTitle,
    textAlign: 'left'
  },
  textWithLineBehind: {
    ...theme.typography.textWithLineBehind,
    fontSize: theme.fontSizes.XS,
    marginTop: 2 * theme.spacing.unit,
    marginBottom: 2 * theme.spacing.unit,
  },
  doneWrapper: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit
  },
  doneNumber: {
    display: 'inline-block',
    color: theme.palette.green.main,
    fontWeight: 600,
    height: 3 * theme.spacing.unit,
    width: 3 * theme.spacing.unit,
    lineHeight: `${3 * theme.spacing.unit}px`,
    textAlign: 'center',
    borderRadius: '50%',
    backgroundColor: theme.palette.gray.bg
  },
  doneLabel: {
    display: 'inline-block',
    color: theme.palette.gray.main,
    fontWeight: 600,
    marginLeft: theme.spacing.unit
  },
  doneInfo: {
    color: theme.palette.gray.main,
    lineHeight: '1.375em'
  },
  doneChange: {
    color: theme.palette.black,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: theme.fontSizes.SM,
    fontWeight: 600,
    '&:hover': {
      color: theme.palette.green.main
    }
  }
});

class AddressSection extends Component {
  state = {
    isOpen: false,
    isDone: false
  }

  static propTypes = {
    prop: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    const prevIsOpen = this.props.isOpen, nextIsOpen = nextProps.isOpen;
    const prevIsDone = this.props.isDone, nextIsDone = nextProps.isDone;
    if(prevIsOpen !== nextIsOpen) this.setState({ isOpen: nextIsOpen });
    if(prevIsDone !== nextIsDone) this.setState({ isDone: nextIsDone });
  }

  _renderCollapsibleContent() {
    const {
      classes,
      addressSectionLoading,
      addressCep,
      addressAddress,
      addressNumber,
      addressComplement,
      addressNeighbourhood,
      addressCity,
      addressState,
      handleChange,
      handleCepBlur
    } = this.props;

    const toAddressForm = {
      handleChange,
      handleCepBlur,
      addressCep,
      addressAddress,
      addressNumber,
      addressComplement,
      addressNeighbourhood,
      addressCity,
      addressState
    };

    return (
      <div>
        { addressSectionLoading && <Loading absolute /> }

        <div className={classes.whole}>
          <h3 className={classes.formTitle}>Endereço de Entrega</h3>
          <AddressForm {...toAddressForm} />
        </div>
      </div>
    )
  }

  _renderCollapsible() {
    const { classes, user } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={classes.section}>

        <div className={classes.title} onClick={() => this.setState({ isOpen: !isOpen })}>
          <div className={classes.number}>2</div>
          <h4 className={classes.label}>ENTREGA</h4>
        </div>
        
        <Collapse in={isOpen}>
          <div className={classes.content}>
            {this._renderCollapsibleContent()}
          </div>
        </Collapse>
      </div>
    );
  }

  _renderDone() {
    const { classes, user, handleOpenSection } = this.props;
    return (
      <div className={classes.doneWrapper}>
        <div>
          <div className={classes.doneNumber}>2</div>
          <h4 className={classes.doneLabel}>ENTREGA</h4>
        </div>
        <div>
          <div className={classes.doneInfo}>{user.name}</div>
          <div className={classes.doneInfo}>{Formatter.formatCpf(user.cpf)}</div>
          <div className={classes.doneInfo}>{user.email}</div>
          <div className={classes.doneInfo}>{Formatter.formatPhone(user.phone)}</div>
        </div>
        <div className={classes.doneChange} onClick={() => handleOpenSection('user')}>
          alterar
        </div>
      </div>
    );
  }

  _renderSection() {
    const { isDone } = this.state;

    if(isDone) return this._renderDone();
    return this._renderCollapsible();
  }

  render() {
    return this._renderSection();
  }
}

AddressSection = withStyles(styles)(AddressSection);

export { AddressSection };