import React from 'react'
import PropTypes from 'prop-types'
import { subcategories } from '../../assets';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/headerPopper.styles';

/**
 * _renderMoreInfo - Function to render the right part of tooltip
 *
 * @param {String} img - Image URL
 * @param {String} title - Title to be rendered
 * @param {String} description - Description to be rendered
 * @param {Function} clickAction - Action to be called
 */
const _renderMoreInfo = ({ img, title, description, clickAction }, classes) => {
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

const _renderSubcategories = (categoryId, classes) => {
  const subs = subcategories[categoryId];

  return Boolean(subs) ? subs.map(subcategory => (
    <div
      key={subcategory.id}
      title={subcategory.label}
      className={classes.subcategory}
      onClick={() => console.log(subcategory.id)}
    >
      {subcategory.label}
    </div>
  )) : null;
};

/**
 * HeaderPopper - The content of the popper
 * spanned from the header popper button
 *
 * @param {Object} props - This component's props
 * @returns {JSX}
 */
let HeaderPopper = ({ classes, id, moreInfo }) => {
  return (
    <div>
      <div className={classes.subcategories} id={id}>
        {_renderSubcategories(id, classes)}
      </div>
      {Boolean(moreInfo) ? _renderMoreInfo(moreInfo, classes) : null}
    </div>
  );
};

HeaderPopper.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  // moreInfo: PropTypes.shape({
  //   img: PropTypes.string,
  //   title: PropTypes.string,
  //   description: PropTypes.string,
  //   clickAction: PropTypes.func,
  // }),
};

HeaderPopper.defaultProps = {
  moreInfo: true
}

HeaderPopper = withStyles(styles)(HeaderPopper);

export { HeaderPopper };
