import { NavLink, NavLinkRenderProps, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './styles/header.css'
import './styles/userHeader.css'
import './styles/adminHeader.css'
import useMenuStore from '../stores/cartStore';
import { useEffect } from 'react';

import hamburgerIcon from '../assets/hamburger.svg';
import logo from '../assets/logo.svg';
import basketIcon from '../assets/basket.svg';
import userIcon from '../assets/user.svg';

function AdminHeader() {
    const cart = useMenuStore(state => state.cart);
    const totalQuantity = useMenuStore(state => state.totalQuantity);
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    //Uppdaterar när cart ändras
    useEffect(() => {
        setQuantity(totalQuantity());
    }, [cart, totalQuantity]);

    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = (): void => {
        setIsOpen(!isOpen)
    }

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const toggleUserMenu = (): void => {
        setIsUserMenuOpen(!isUserMenuOpen)
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    console.log(isLoggedIn);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const logout = (): void => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsUserMenuOpen(false);
        navigate('/');
    };

    return (
        <header className="header">
            <button className="header__button" onClick={toggleNav}><img className="button__hamburger" src={hamburgerIcon} alt="hamburger menu"/></button>
            <nav className="header__nav">
                <NavLink to="/" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__logo" src={logo} alt="header logo" /></NavLink>
                <NavLink to="/menu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                <NavLink to="/about" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                <NavLink to="/cart" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                    <img className="header__basket" src={basketIcon} alt="cart"/>
                    {quantity > 0 && (
                        <div className='badge'>{quantity}</div>
                    )}
                </NavLink>
                <button className="nav__button" onClick={toggleUserMenu}>  <img className="header__user" src={userIcon} alt="navigation menu"/><p>Admin</p></button>
                <nav className={`nav__user-nav ${isUserMenuOpen ? 'showMenu' : ''}`}>
                    <section className="user-nav__section">
                        <NavLink to="/kitchenview" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Kitchen View</NavLink>
                        <NavLink to="/editmenu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Edit Menu</NavLink>
                        <NavLink to="/showorders" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Show All Orders </NavLink>
                    </section>
                    <button className="nav__logout nav__link" onClick={logout}>Log Out</button>
                </nav>
            </nav>
            <nav className="header__nav header__nav--mobile">
                <NavLink to="/" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__logo" src={logo} alt="header logo"/></NavLink>
                <section className={`header__section ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/menu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                    <NavLink to="/about" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                    <NavLink to="/cart" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                        <img className="header__basket" src={basketIcon} alt="cart"/>
                        {quantity > 0 && (
                            <div className='badge'>{quantity}</div>
                        )}
                    </NavLink>
                    <button className="nav__button" onClick={toggleUserMenu}>  <img className="header__user" src={basketIcon} alt="navigation menu"/><p>Admin</p></button>
                    <nav className={`nav__user-nav nav__user-nav--mobile ${isUserMenuOpen ? 'showMenu' : ''}`}>
                        <NavLink to="/kitchenview" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Kitchen View</NavLink>
                        <NavLink to="/editmenu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Edit Menu</NavLink>
                        <NavLink to="/showorders" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Show All Orders </NavLink>
                        <button className="nav__logout nav__link" onClick={logout}>Log Out</button>
                    </nav>
                </section>
            </nav>
        </header>
    )
}

export default AdminHeader;

/**
 * Författare Ida
 * En funktion som sköter navigeringen på sidan.
 * Har använt NavLink för att kunna hålla reda på vilken sida som är aktiv och inte.
 * Om sidan är aktiv får den klassen nav__link OCH nav__link--active annars bara nav__link
 * Skapade även en annan Nav för mobil view
 * På denna sida har vi även lagt till ännu en nav meny för inloggade användare
 */

// Författare Lisa
// Lägger in funktion samt en badge som visar quantity för varukorgen.
//  Uppdateras när cart ändras. 

// Författare: Diliara
// Loggar ut användaren och tar bort token från sessionStorage,
// navigerar användaren till startsidan och stänger användarmenyn