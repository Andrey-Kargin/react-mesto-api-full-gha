import Logo from '../images/logo.svg';
import { useState } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import {AiOutlineMenu} from "react-icons/ai";
import {AiOutlineClose} from "react-icons/ai";

function Header(props) {
  const [nav, setNav] = useState(false);
  function handleOnClick() {
    setNav(!nav);
    props.onSignOut();
  }
  return( 
    <>
    <nav className={ nav ? ['header__nav-bar', 'active'].join(' ') : 'header__nav-bar'}>
      <p className='header__nav-bar_email'>{props.email}</p>
      <button className="header__nav-bar_signout" onClick={handleOnClick}>
        Выйти
      </button>
    </nav>
    <header className="header">
      <img src={Logo} alt="Логотип Место" className="header__logo" />       
        <Routes>
          <Route exact path='/signin' element ={
            <div className='header__info'>
          <NavLink to="/signup" className="header__link">
            Регистрация
          </NavLink>
          </div>
          }
          />
          <Route exact path='/signup' element ={
            <div className='header__info'>
          <NavLink to="/signin" className="header__link">
            Войти
          </NavLink>
          </div>
          }
          />
        <Route exact path='/react-mesto-auth' element ={
          <>
          <div className='header__info'>
             <p className='header__email'>{props.email}</p>
        <button className="header__signout" type='button' onClick={props.onSignOut}>
          Выйти
        </button>
        </div>
        
        
        <div onClick={() => setNav(!nav)} className='burger'>
          {nav ? <AiOutlineClose size={20} className='burger__close' /> : <AiOutlineMenu size={24} className='burger__menu' />}
        </div>
        </>
        }
        />
        </Routes> 
    </header>
    </>
  )
}

export default Header