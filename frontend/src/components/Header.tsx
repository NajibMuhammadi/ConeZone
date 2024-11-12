import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import './styles/header.css'

function Header() {
    return (
        <header className="header">
            <nav className="header__nav">
                <NavLink to="/" className={({ isActive } : NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__logo" src="../../../src/assets/logo.svg"></img></NavLink>
                    <NavLink to="/menu" className={({ isActive } : NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                    <NavLink to="/about" className={({ isActive } : NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                    <NavLink to="/login" className={({ isActive } : NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Login</NavLink>
                <NavLink to="/basket" className={({ isActive } : NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}><img className="header__basket" src="../../src/assets/basket.svg"></img></NavLink>
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
 */