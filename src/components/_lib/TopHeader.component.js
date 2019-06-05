import React from 'react'
import { NavLink } from 'react-router-dom';
import { MiniDatePicker } from '../../molecules';

/**
 * renderNavLink - Renders the buttons that navigate in the different routes of the website
 *
 * @param {String} label - the text that is inside the button 
 * @param {String} route - the route that you want to nav to
 * @returns {NavLink} - Return a NavLink button that access different routes of the website
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
export const TopHeader = props => {
  const { handleSelectDate, selectedDate } = props;

  return (
    <div className="top-header flex h sb al-c" >
      <nav className="side-buttons">
        {renderNavLink({route:"quem-somos", label:"Sobre a Raízs"})}
        {renderNavLink({route:"familias", label:"Conheça os Produtores"})}
      </nav>
      <nav className="side-buttons">
        {renderNavLink({route:"route", label:"Refazer Pedido"})}
        {renderNavLink({route:"route", label:"Precisa de Ajuda?"})}
      </nav>
    </div>
  )
};
