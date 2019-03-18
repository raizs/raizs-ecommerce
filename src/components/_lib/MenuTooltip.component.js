import React from 'react'
import PropTypes from 'prop-types'
import { subcategories } from '../../assets';

/**
 * renderMoreInfo - Function to render the right part of tooltip
 *
 * @param {String} img - Image URL
 * @param {String} title - Title to be rendered
 * @param {String} description - Description to be rendered
 * @param {Function} clickAction - Action to be called
 */
const renderMoreInfo = ({ img, title, description, clickAction }) => {
  return (
    <div className='more-info'>
      <div
        className='tooltip-image'
        style={{ backgroundImage: 'url(http://www.comidadibuteco.com.br/wp-content/themes/cdb2013/assets/img/petiscos/BeloHorizonte/OK_222_SimplesAssimsqn_BeloHorizonte_2018_JuliaFilogonio.jpg)' }}
      />
    </div>
  );
};

const MenuTooltip = ({ id, moreInfo }) => {
  return (
    <div className='header-tooltip-content'>
      <div className='subcategories'>
        {
          subcategories[id] ?
          subcategories[id].map(subcategory =>
            <div title={subcategory.label} key={subcategory.id} className='subcategory'>
              {subcategory.label}
            </div>
          ) : null
        }
      </div>
      {renderMoreInfo(moreInfo)}
    </div>
  );
};

MenuTooltip.propTypes = {
  id: PropTypes.string.isRequired,
  moreInfo: PropTypes.shape({
    img: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    clickAction: PropTypes.func,
  }),
};

MenuTooltip.defaultProps = {
  moreInfo: true
}

export { MenuTooltip };
