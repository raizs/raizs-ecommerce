import React from 'react'
import classnames from 'classnames';
import { withStyles, Icon } from '@material-ui/core';

export const CLIENT_COMMENT_WIDTH = 540;

const styles = theme => ({
  wrapper: {
    backgroundColor: 'white',
    borderRadius: theme.spacing.unit,
    width: 540,
    minHeight: '240px',
    padding: 4 * theme.spacing.unit,
    margin: '16px auto',
    textAlign: 'left',
    fontFamily: 'Raleway',
    verticalAlign: 'top',
    userSelect: 'none'
  },
  avatarWrapper: {
    paddingRight: 4 * theme.spacing.unit,
  },
  content: {
    display: 'flex'
  },
  avatar: {
    height: '80px',
    width: '80px',
    borderRadius: '50%'
  },
  texts: {
    '& p.comment': {
      fontSize: theme.fontSizes.MD,
      color: theme.palette.gray.main,
      fontWeight: 500,
      lineHeight: theme.fontSizes.MMD
    },
    '& div.bottom': {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 2 * theme.spacing.unit,
      '& > p': {
        fontSize: theme.fontSizes.MMD,
        lineHeight: theme.fontSizes.LG,
        fontWeight: 700
      }
    }
  }
});

let ClientComment = props => {
  const { classes } = props;
  return (
    <div className={classnames(classes.wrapper, 'wrapper')}>
      <div className={classes.content}>
        <div className={classes.avatarWrapper}>
          <img
            className={classes.avatar}
            src={'https://vignette.wikia.nocookie.net/wii/images/6/66/Blurb_1up_mushroom_20090220-1-.png/revision/latest?cb=20100427010802'}
            alt='people lol'
            />
        </div>
        <div className={classes.texts}>
          <Icon fontSize='large'>format_quote</Icon>
          <p className='comment'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquet, nisi at tincidunt semper, nibh tortor tempus tortor, et sagittis ligula nisi nec augue. Quisque sagittis, nisi non auctor lacinia, odio massa pharetra augue, in rhoncus augue tortor id nisl.</p>
          <div className='bottom'>
            <p>Lopes el Mestre</p>
          </div>
        </div>
      </div>
    </div>
  )
};

ClientComment = withStyles(styles)(ClientComment);

export { ClientComment };