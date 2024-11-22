import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import { useState } from 'react';
import './styles/header.css'
import './styles/userHeader.css'
import useMenuStore from '../stores/cartStore';
import { useEffect } from 'react';

function UserHeader() {
    const cart = useMenuStore(state => state.cart);
    const totalQuantity = useMenuStore(state => state.totalQuantity);
    const [quantity, setQuantity] = useState(0);

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

    const logout = (): void => {
        console.log('Du har klickat på logga ut knappen')
    }

    return (
        <header className="header">
            <button className="header__button" onClick={toggleNav}><img className="button__hamburger" src="../../src/assets/hamburger.svg" /></button>
            <nav className="header__nav">
                <NavLink to="/" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__logo" src="../../../src/assets/logo.svg"/></NavLink>
                <NavLink to="/menu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                <NavLink to="/about" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                <NavLink to="/cart" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                    <img className="header__basket" src="../../src/assets/basket.svg"/>
                    {quantity > 0 && (
                        <div className='badge'>{quantity}</div>
                    )}
                </NavLink>
                <button className="nav__button" onClick={toggleUserMenu}>  <img className="header__user" src="../../src/assets/user.svg"/><p>User</p></button>
                <nav className={`nav__user-nav ${isUserMenuOpen ? 'showMenu' : ''}`}>
                    <NavLink to="/orderhistory" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>My Orders</NavLink>
                    <button className="nav__logout nav__link" onClick={logout}>Log Out</button>
                </nav>
            </nav>
            <nav className="header__nav header__nav--mobile">
                <NavLink to="/" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__logo" src="../../../src/assets/logo.svg"/></NavLink>
                <section className={`header__section ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/menu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                    <NavLink to="/about" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                    <NavLink to="/cart" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                        <img className="header__basket" src="../../src/assets/basket.svg"/>
                        {quantity > 0 && (
                            <div className='badge'>{quantity}</div>
                        )}
                    </NavLink>
                    <button className="nav__button" onClick={toggleUserMenu}>  <img className="header__user" src="../../src/assets/user.svg"/><p>User</p></button>
                    <nav className={`nav__user-nav nav__user-nav--mobile ${isUserMenuOpen ? 'showMenu' : ''}`}>
                        <NavLink to="/orderhistory" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>My Orders</NavLink>
                        <button className="nav__logout nav__link" onClick={logout}>Log Out</button>
                    </nav>
                </section>
            </nav>
        </header>
    )
}

export default UserHeader;

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