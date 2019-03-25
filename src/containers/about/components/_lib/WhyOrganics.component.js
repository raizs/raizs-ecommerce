import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles/whyOrganics.styles'
import { withStyles, Icon } from '@material-ui/core';
import { whyOrganicsAnimals, whyOrganicsEnvironment, whyOrganicsHealth } from '../../../../assets';

const _renderCard = ({ title, description, icon }, classes) => {
  return (
    <div className={classes.card}>
      <div className='icon-text'>
        <Icon>{icon}</Icon>
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  )
};

let WhyOrganics = ({ classes, translate }) => {

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        POR QUE ORGÂNICOS
      </div>
      <h2 className={classes.bigTitle} >
        Você entende os impactos de consumir alimentos orgânicos?
      </h2>
      <div className={classes.content}>
        <div className={classes.top}>
          {_renderCard(whyOrganicsHealth, classes)}
        </div>
        <div className={classes.bottom}>
          {_renderCard(whyOrganicsAnimals, classes)}
          <div className={classes.image} />
          {_renderCard(whyOrganicsEnvironment, classes)}
        </div>
      </div>
    </div>
  );
}

WhyOrganics.propTypes = {
  classes: PropTypes.object.isRequired,
};

WhyOrganics = withStyles(styles)(WhyOrganics);

export { WhyOrganics };