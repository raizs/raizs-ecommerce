import React, { Component } from 'react';
import { withStyles, Icon } from '@material-ui/core';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import classnames from "classnames";
import chunk from "lodash.chunk";
import { connect } from "react-redux";
import Slider from 'react-slick';

import { dashboardUserPersonalData } from "../../../../assets";
import { Loading, DashboardSliderArrow } from '../../../../molecules';
import { UserAddressesRepository, PaymentRepository } from '../../../../repositories';
import {
  setUserAction,
  setCardsAction,
  showConfirmationModalAction,
  closeConfirmationModalAction,
  showFixedLoadingAction,
  closeFixedLoadingAction
} from '../../../../store/actions';
import { User } from '../../../../entities';

import mastercard from 'payment-icons/min/single/mastercard-old.svg';
import visa from 'payment-icons/min/single/visa.svg';
import flat from 'payment-icons/min/flat/default.svg';
import { toast } from 'react-toastify';

const actions = {
  setUserAction,
  setCardsAction,
  showConfirmationModalAction,
  closeConfirmationModalAction,
  showFixedLoadingAction,
  closeFixedLoadingAction
};

const BOX_WIDTH = 300;

const styles = theme => ({
  wrapper:{
    display: "inline-block",
    width: "100%",
    padding: 5 * theme.spacing.unit,
    verticalAlign: "top"
  },
  pageTitle: {
    ...theme.typography.bigTitle,
    textAlign: "left",
    marginBottom: 4*theme.spacing.unit
  },
  whiteBox: {
    marginTop: 4*theme.spacing.unit,
    backgroundColor: "white",
    width: "100%",
    borderRadius: theme.spacing.unit,
    padding: 2*theme.spacing.unit,
    position: "relative",
    '& > div.columns > div': {
      verticalAlign: 'top',
      display: 'inline-block',
      width: '50%'
    },
    '& div.chunk:focus': {
      outline: 'none'
    }
  },
  whiteBoxTitle: {
     ...theme.typography.formTitle,
    textAlign: "left",
    marginBottom: 2*theme.spacing.unit
  },
  personalData: {
    padding: theme.spacing.unit,
    paddingLeft: 0
  },
  personalDataKey: {
    fontSize:  theme.fontSizes.XS,
    display: "inline-block",
    fontWeight: 600,
    color:  theme.palette.black.main,
  },
  personalDataValue: {
    fontSize: theme.fontSizes.SM,
    display:"inline-block",
    color: theme.palette.gray.main,
    fontWeight: 500,
    marginLeft: theme.spacing.unit
  },
  underlineButton: {
    fontWeight: 700,
    fontSize: theme.fontSizes.XS,
    textDecoration: "underline",
    display: "inline-block",
    cursor: "pointer",
    '&:hover': {
      color: theme.palette.green.main
    }
  },
  rightCorner: {
    position:"absolute",
    top: 2*theme.spacing.unit,
    right: 2*theme.spacing.unit
  },
  addressBox:{
    width: BOX_WIDTH,
    display: "inline-block",
    verticalAlign: "middle",
    padding: 2 * theme.spacing.unit
  },
  addressName: {
    fontWeight: 700,
    color: theme.palette.black.main,
    fontSize: theme.fontSizes.XS,
    marginBottom: theme.spacing.unit
  },
  addressLine:{
    color: theme.palette.gray.main,
    fontSize: theme.fontSizes.MD,
    lineHeight: theme.fontSizes.MMD,
    fontWeight: 500
  },
  separator: {
    display: "inline-block",
    backgroundColor:  theme.palette.gray.darkBg,
    verticalAlign: "middle",
    height: "130px",
    width: "2px"
  },
  underlineButtonsBox: {
    marginTop: 4*theme.spacing.unit
  },
  addNew: {
    position: "absolute",
    top:  2*theme.spacing.unit,
    right: 2*theme.spacing.unit,
    cursor: "pointer"
  },
  addNewIcon: {
    display: "inline-block",
    verticalAlign: "middle",
    color:  theme.palette.green.main

  },
  addNewText: {
    display: "inline-block",
    verticalAlign: "middle",
    color: theme.palette.green.main,
    marginLeft: theme.spacing.unit,
    textDecoration: "underline",
    fontWeight: 700,
    fontSize: theme.fontSizes.SM
  }
});

class DashboardUser extends Component {
  state = {
    loading: true,
    chunkSize: 2
  }

  componentWillMount() {
    if(this.props.user) this.setState({ loading:false });
  }

  componentDidMount() {
    let availableWidth = 650; // width in smaller screen 1024px
    const el = document.querySelector('#addresses');
    if(el) availableWidth = el.clientWidth - 48; // minus padding and margin
    const chunkSize = Math.floor(availableWidth/BOX_WIDTH);
    this.setState({ chunkSize });
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.user && nextProps.user) this.setState({ loading:false });
  }

  _renderPersonalData() {
    const { classes, user } = this.props;
    const chunked = chunk(dashboardUserPersonalData, 3);
    return chunked.map((c, i) => (
      <div key={i} style={{ verticalAlign: 'top' }}>
        {c.map(data => {
          return (
            <div className={classes.personalData} key={data.label}>
              <div className={classes.personalDataKey}>{data.label}:</div>          
              <div className={classes.personalDataValue}>{user[data.id]}</div>          
            </div>
          );  
        })}
      </div>
    ));
  }

  _deleteAddressClick(address_id, key) {
    this.props.showConfirmationModalAction({
      msg: 'Tem certeza que deseja excluir este endereço?',
      callback: () => this._deleteAddressSubmit(address_id, key),
      title: 'Atenção',
      confirmationLabel: 'Sim, tenho certeza'
    });
  }

  async _deleteAddressSubmit(id, key) {
    const adressRepo = new UserAddressesRepository();
    const {
      user,
      closeConfirmationModalAction,
      showFixedLoadingAction,
      closeFixedLoadingAction
    } = this.props;

    closeConfirmationModalAction();
    showFixedLoadingAction();
    const promise = await adressRepo.remove(id);
    closeFixedLoadingAction();

    if(!promise.err) {
      const userOriginal = user.original;
      userOriginal.children.splice(key, 1);
  
      const newUser = new User(userOriginal);
      this.props.setUserAction(newUser);
      toast('Endereço excluído com sucesso.');
    } else {
      toast('Ocorreu um erro em nossos servidores. Tente novamente mais tarde.');
    }
  }

  _deleteCardClick(card_id) {
    this.props.showConfirmationModalAction({
      msg: 'Tem certeza que deseja excluir este cartão?',
      callback: () => this._deleteCardSubmit(card_id),
      title: 'Atenção',
      confirmationLabel: 'Sim, tenho certeza'
    });
  }

  async _deleteCardSubmit(card_id) {
    const repo = new PaymentRepository();
    const customer_id = this.props.user.mpid;
    const {
      cards,
      closeConfirmationModalAction,
      showFixedLoadingAction,
      closeFixedLoadingAction
    } = this.props;
    
    closeConfirmationModalAction();
    showFixedLoadingAction();
    const promise = await repo.deleteCard({ customer_id, card_id })
    closeFixedLoadingAction();

    if(!promise.err) {
      const newCards = cards.remove(card_id);
      this.props.setCardsAction(newCards);
      toast('Cartão excluído com sucesso.')
    } else {
      if(promise.err.code === 672) toast('Este cartão está sendo usado em uma assinatura. Cancele a assinatura para poder excluir o cartão.');
    }
  }

  _renderAddresses() {
    const { user, classes } = this.props;
    const { chunkSize } = this.state;

    if(!user.addresses.all.length) return <div>Você ainda não tem interessos cadastrados</div>;

    const chunked = chunk(user.addresses.all, chunkSize);
    const settings = {
      prevArrow: <DashboardSliderArrow to='prev' />,
      nextArrow: <DashboardSliderArrow to='next' />,
    };

    return (
      <Slider {...settings}>
        {chunked.map(c =>
          <div className='chunk'>
            {c.map((adr, key) => {
              return <span key={key}>
                {key === 0 || <div className={classes.separator}></div>}
                <div className={classes.addressBox}>
                  <div className={classes.addressName}>{adr.name}</div>
                  <div className={classes.addressLine}>{adr.formattedAddress}</div>
                  <div className={classes.addressLine}>{adr.formattedAddress2}</div>
                  <div className={classes.addressLine}>CEP: {adr.cep}</div>
                  <div className={classes.underlineButtonsBox}>
                    <div
                      style={{ marginRight: '8px' }}
                      className={classes.underlineButton}
                      onClick={()=>this.props.history.push(`/painel/editar/endereco/${adr.id}`)}
                    >
                      editar
                    </div>
                    <div
                      className={classes.underlineButton}
                      onClick={()=>this._deleteAddressClick(adr.id, key)}
                    >
                      excluir
                    </div>
                  </div>
                </div>
              </span>
            })}
          </div>
        )}
      </Slider>
    );
  }

  _renderCards() {
    const { cards, classes } = this.props;
    const { chunkSize } = this.state;

    if(!cards.all.length) return <div>Você ainda não tem interessos cadastrados</div>;

    const chunked = chunk(cards.all, chunkSize);
    const settings = {
      prevArrow: <DashboardSliderArrow to='prev' />,
      nextArrow: <DashboardSliderArrow to='next' />,
    };

    const icons = { mastercard, visa };

    return (
      <Slider {...settings}>
        {chunked.map(c =>
          <div className='chunk'>
            {c.map((card, key) => {
              return <span key={key}>
                {key === 0 || <div className={classes.separator}></div>}
                <div className={classes.addressBox}>
                  <div className={classes.personalData}>
                    <div className={classes.personalDataKey} style={{ verticalAlign: 'middle' }}>
                      <img alt='brand' src={icons[card.brand.toLowerCase()] || flat}  style={{ height: 24, width: 40 }}/>
                    </div>          
                    <div className={classes.personalDataValue} style={{ verticalAlign: 'middle' }}>{card.finalStringNumbers}</div>          
                  </div>
                  <div className={classes.personalData}>
                    <div className={classes.personalDataKey}>NOME</div>          
                    <div className={classes.personalDataValue}>{card.holderName}</div>          
                  </div>
                  <div className={classes.personalData}>
                    <div className={classes.personalDataKey}>VENCIMENTO</div>
                    <div className={classes.personalDataValue}>{card.exp}</div>          
                  </div>
                  <div className={classes.underlineButtonsBox}>
                    <div
                      className={classes.underlineButton}
                      onClick={()=>this._deleteCardClick(card.id)}
                    >
                      excluir
                    </div>
                  </div>
                </div>
              </span>
            })}
          </div>
        )}
      </Slider>
    );
  }

  render() {
    const { classes } = this.props;

    if(this.state.loading) {
      return <div className={classes.wrapper}>
        <Loading/>
      </div>;
    }

    return (
      <div className={classes.wrapper}>
        <h1 className={classes.pageTitle}>Perfil</h1>

        <div className={classes.whiteBox}>
          <div className={classes.whiteBoxTitle}>Dados Pessoais</div>
          <div className='columns'>
            {this._renderPersonalData()}
          </div>
          <div onClick={()=>this.props.history.push("/painel/editar/dados-pessoais")} className={classnames(classes.underlineButton, classes.rightCorner)}>alterar</div>
        </div>

        <div className={classes.whiteBox} id='addresses'>
          <div className={classes.whiteBoxTitle}>Endereços Salvos</div>
          {this._renderAddresses()}
          <div className={classes.addNew} onClick={() => this.props.history.push("/painel/editar/endereco/novo")}>
            <Icon className={classes.addNewIcon}>add_circle_outline</Icon>
            <div className={classes.addNewText}>
              Adicionar novo endereço
            </div>
          </div>
        </div>

        <div className={classes.whiteBox}>
          <div className={classes.whiteBoxTitle}>Cartões Salvos</div>
          {this._renderCards()}
          <div className={classes.addNew} onClick={() => this.props.history.push("/painel/editar/cartao/novo")}>
            <Icon className={classes.addNewIcon}>add_circle_outline</Icon>
            <div className={classes.addNewText}>
              Adicionar novo cartão
            </div>
          </div>
        </div>

      </div>
    )
  }
};

const mapStateToProps = state => ({
  user: state.user.current,
  userAddresses: state.userAddresses.model,
  cards: state.cards.model,
})

DashboardUser = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, actions)
  )(DashboardUser);
export { DashboardUser }