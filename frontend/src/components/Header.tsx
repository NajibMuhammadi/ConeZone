import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import { useState } from 'react';
import './styles/header.css'
import useMenuStore from '../stores/cartStore';

function Header() {

    const [isOpen, setIsOpen] = useState(false);
    const totalQuantity = useMenuStore(state => state.totalQuantity); // Hämta totalQuantity-funktionen

    const toggleNav = (): void => {
        setIsOpen(!isOpen)
    }

    return (
        <header className="header">
            <button className="header__button" onClick={toggleNav}><img className="button__hamburger" src="../../src/assets/hamburger.svg" /></button>
            <nav className="header__nav">
                <NavLink to="/" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__logo" src="../../../src/assets/logo.svg"></img></NavLink>
                <NavLink to="/menu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                <NavLink to="/about" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                <NavLink to="/login" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Login</NavLink>
                <NavLink to="/cart" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__basket" src="../../src/assets/basket.svg"></img></NavLink>
            </nav>
            <nav className="header__nav header__nav--mobile">
                <NavLink to="/" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__logo" src="../../../src/assets/logo.svg"></img></NavLink>
                <section className={`header__section ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/menu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                    <NavLink to="/about" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                    <NavLink to="/login" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Login</NavLink>
                    <NavLink to="/cart" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                        <img className="header__basket" src="../../src/assets/basket.svg"></img>
                        {totalQuantity() > 0 && (
                            <div className='badge'>
                                {totalQuantity()}
                            </div>
                        )}
                    </NavLink>
                </section>
            </nav>
        </header>
    )
}

export default Header;

/**
 * Författare Ida
 * En funktion som sköter navigeringen på sidan. 
 * Har använt NavLink för att kunna hålla reda på vilken sida som är aktiv och inte.
 * Om sidan är aktiv får den klassen nav__link OCH nav__link--active annars bara nav__link
 * Skapade även en annan Nav för mobil view
 */