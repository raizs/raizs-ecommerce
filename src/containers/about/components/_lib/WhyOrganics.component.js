import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { withStyles, Icon } from '@material-ui/core';
import { whyOrganicsAnimals, whyOrganicsEnvironment, whyOrganicsHealth } from '../../../../assets';
import ReactSVG from 'react-svg';

const styles = theme => ({
  wrapper: {
    padding: `0 ${2 * theme.spacing.unit}px`
  },
  title: {
    ...theme.typography.timelineSectionTitle,
  },
  bigTitle: {
    ...theme.typography.bigTitle
  },
  content: {
    margin: `${6 * theme.spacing.unit}px 0`,
  },
  top: {
    width: '33.3333%',
    marginLeft: '33.3333%'
  },
  bottom: {
    '& > div': {
      display: 'inline-block',
      width: '33.3333%',
      verticalAlign: 'middle'
    }
  },
  card: {
    textAlign: 'center',
    padding: `${4 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`,
    '& h3': {
      fontSize: theme.fontSizes.LG,
      fontWeight: 700,
    },
    '& .icon': {
      height: 64,
      width: 64,
      display: 'inline-block',
      verticalAlign: 'middle',
      marginRight: 2 * theme.spacing.unit
    },
    '& > p': {
      ...theme.typography.infoText
    },
    '& div.icon-text': {
      marginBottom: 2 * theme.spacing.unit,
      '& > *': {
        display: 'inline-block',
        verticalAlign: 'middle'
      }
    }
  },
  image: {
    backgroundImage: 'url("http://www.revistacodigos.com/wp-content/uploads/2018/10/comidaorganica.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '500px'
  }
});

const _renderCard = ({ title, description, icon }, classes) => {
  return (
    <div className={classes.card}>
      <div className='icon-text'>
        <ReactSVG
          src={`/icons/${icon}.svg`}
          className='icon'
        />
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  )
};

let WhyOrganics = ({ classes, id }) => {

  return (
    <div id={id} className={classnames(classes.wrapper, 'offset-important')}>
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