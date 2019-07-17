import React, { Component } from 'react'
import { withStyles, Tooltip } from '@material-ui/core';
import classnames from 'classnames';
import { Image } from '../../components';

const WIDTH = 64;
const HEIGHT = WIDTH;

const styles = theme => ({
  wrapper: {
    width: WIDTH,
    height: HEIGHT,
    display: 'inline-block',
    margin: 2 * theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    backgroundColor: 'white',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: theme.shadows[2],
    position: 'relative',
    '& > div.glass': {
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7))',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 2
    }
  },
  imageWrapper: {
    position: 'relative',
    height: 60,
    width: 60,
  },
  name: {
    ...theme.typography.textEllipsis,
    height: '1.125em',
    fontWeight: 500,
    marginTop: theme.spacing.unit,
    fontSize: theme.fontSizes.MD,
    verticalAlign: 'top'
  },
  price: {
    fontWeight: 600,
    fontSize: theme.fontSizes.SM,
    marginTop: theme.spacing.unit/2,
    color: theme.palette.gray.main
  },
  tooltip: {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.gray.main}`,
    '& div.wrapper': {
      '& > *': {
        display: 'inline-block',
        '&.info': {
          width: 'calc(100% - 72px)',
          verticalAlign: 'top',
          '& > p': {
            color: theme.palette.red,
            marginTop: theme.spacing.unit,
            fontWeight: 700,
            fontSize: theme.fontSizes.XSM
          }
        }
      }
    }
  },
  popper: {
    opacity: 1
  }
});

class CatalogUnavailableProduct extends Component {

  render() {
    const { classes, product } = this.props;
    const wrapperClasses = [classes.wrapper];
    const imageClasses = [classes.imageWrapper];

    return (
      <Tooltip
        classes={{
          popper: classes.popper,
          tooltip: classes.tooltip
        }}
        title={
          <div className='wrapper'>
            <Image
              width={64}
              height={64}
              alt={product.name}
              src={product.imageUrl} />
            <div className='info'>
              <h4 className={classes.name}>{product.name}</h4>
              <h6 className={classes.price}>{product.fullPrice}</h6>
              <p>Este produto está indísponível para a data escolhida.</p>
            </div>
          </div>
        }
      >
        <div
          id={`product-${product.id}`}
          className={classnames(wrapperClasses)}
        >
          <div className={classnames(imageClasses)}>
            <Image
              width={64}
              height={64}
              alt={product.name}
              src={product.imageUrl} />
          </div>
          <div className='glass'/>
        </div>
      </Tooltip>
    )
  }
}

CatalogUnavailableProduct = withStyles(styles)(CatalogUnavailableProduct);

export { CatalogUnavailableProduct };