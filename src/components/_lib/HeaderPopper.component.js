import React from 'react'
import PropTypes from 'prop-types'
import { subcategories } from '../../assets';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  subcategories: {
    padding: theme.spacing.unit,
    '&#grocery': {
      columns: '2 150px'
    },
    verticalAlign: 'top',
    display: 'inline-block'
  },
  subcategory: {
    marginBottom: 3 * theme.spacing.unit,
    fontSize: theme.fontSizes.MD,
    color: theme.palette.gray.main,
    cursor: 'pointer',
    '&:hover': {
      fontWeight: 700
    },
    '&:after': {
      display: 'block',
      content: 'attr(title)',
      fontWeight: 700,
      height: 0,
      overflow: 'hidden',
      visibility: 'hidden'
    }
  },
  moreInfo: {
    display: 'inline-block',
    maxWidth: '170px',
    textAlign: 'center',
    '& div.image': {
      height: '170px',
      width: '170px',
      verticalAlign: 'top',
      display: 'inline-block'
    },
    '& div.title': {
      fontWeight: 700,
      color: theme.palette.black.main,
      fontSize: theme.fontSizes.MD,
      margin: `${2 * theme.spacing.unit}px 0`,
      textAlign: 'center'
    },
    '& div.description': {
      color: theme.palette.gray.main,
      fontSize: theme.fontSizes.XS,
      textAlign: 'center'
    }
  },
  moreInfoButton: {
    ...theme.buttons.primary,
    marginTop: `${2 * theme.spacing.unit}px`,
    display: 'inline-block'
  }
});

/**
 * renderMoreInfo - Function to render the right part of tooltip
 *
 * @param {String} img - Image URL
 * @param {String} title - Title to be rendered
 * @param {String} description - Description to be rendered
 * @param {Function} clickAction - Action to be called
 */
const renderMoreInfo = ({ img, title, description, clickAction }, classes) => {
  return (
    <div className={classes.moreInfo}>
      <div
        className='image'
        style={{ backgroundImage: 'url(http://www.comidadibuteco.com.br/wp-content/themes/cdb2013/assets/img/petiscos/BeloHorizonte/OK_222_SimplesAssimsqn_BeloHorizonte_2018_JuliaFilogonio.jpg)' }}
      />
      <div className='title'>
        TÍTULO
      </div>
      <div className={classes.description}>
        Alguma descrição vai aqui, pode ser um pouco mais longa
      </div>
      <button onClick={clickAction} className={classes.moreInfoButton}>COMPRAR</button>
    </div>
  );
};

let HeaderPopper = ({ classes, id, moreInfo }) => {
  return (
    <div>
      <div className={classes.subcategories} id={id}>
        {
          subcategories[id] ?
          subcategories[id].map(subcategory =>
            <div
              key={subcategory.id}
              title={subcategory.label}
              className={classes.subcategory}
              onClick={() => console.log(subcategory.id)}
            >
              {subcategory.label}
            </div>
          ) : null
        }
      </div>
      {Boolean(moreInfo) ? renderMoreInfo(moreInfo, classes) : null}
    </div>
  );
};

HeaderPopper.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  moreInfo: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    clickAction: PropTypes.func,
  }),
};

HeaderPopper.defaultProps = {
  moreInfo: true
}

HeaderPopper = withStyles(styles)(HeaderPopper);

export { HeaderPopper };
