import React from 'react'
import { NavLink } from 'react-router-dom';


const DatePicker = (props) => {
  return (
    <div >Here comes the Datepicker</div>
  )
}
const renderNavLink = ({label, route}) => {
  return 	<NavLink to={route} className="nav-button">{label}</NavLink>
}

export const TopHeader = (props) => {
  const { history } = props

  return (
    <div className="top-header flex h sb al-c" >
      <nav className="side-buttons">
        {renderNavLink({route:"route", label:"Sobre a Raízs"})}
        {renderNavLink({route:"route", label:"Conheça os Produtores"})}
      </nav>
      <DatePicker></DatePicker>
      <nav className="side-buttons">
        {renderNavLink({route:"route", label:"Refazer Pedido"})}
        {renderNavLink({route:"route", label:"Precisa de Ajuda?"})}
      </nav>
    </div>
  )
}

// export { TopHeader }
