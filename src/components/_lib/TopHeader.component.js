import React from 'react'
import { NavLink } from 'react-router-dom';


const MiniDatePicker = (props) => {
  return (
    <div >Here comes the Datepicker</div>
  )
}

/**
 * renderNavLink - Render the buttons that navigate in the different routes from the website
 *
 * @param {String} label - the text that is inside the button 
 * @param {String} route - the route that you want to nav to
 * @returns {NavLink} - Return a NavLink button that access different routes from the website
 */

const renderNavLink = ({label, route}) => {
  return 	<NavLink to={route} className="nav-button">{label}</NavLink>
}

 /**
 *
 *
 * @param {Object} props - TopHeader parent (Main) passed props
 * @returns {JSX} 
 */
export const TopHeader = (props) => {
  const { history } = props

  return (
    <div className="top-header flex h sb al-c" >
      <nav className="side-buttons">
        {renderNavLink({route:"route", label:"Sobre a Raízs"})}
        {renderNavLink({route:"route", label:"Conheça os Produtores"})}
      </nav>
      <MiniDatePicker></MiniDatePicker>
      <nav className="side-buttons">
        {renderNavLink({route:"route", label:"Refazer Pedido"})}
        {renderNavLink({route:"route", label:"Precisa de Ajuda?"})}
      </nav>
    </div>
  )
}

