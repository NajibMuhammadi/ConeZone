import { NavLink, NavLinkRenderProps } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/header.css';
import useMenuStore from '../stores/cartStore';

function Header() {
    const cart = useMenuStore(state => state.cart);
    const totalQuantity = useMenuStore(state => state.totalQuantity);
    const [quantity, setQuantity] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setQuantity(totalQuantity());
    }, [cart, totalQuantity]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const toggleNav = (): void => {
        setIsOpen(!isOpen);
    };

    const toggleUserMenu = (): void => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <header className="header">
            <button className="header__button" onClick={toggleNav}>
                <img className="button__hamburger" src="../../src/assets/hamburger.svg" alt="Menu" />
            </button>
            <nav className="header__nav">
                <NavLink to="/" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                    <img className="header__logo" src="../../../src/assets/logo.svg" alt="Logo" />
                </NavLink>
                <NavLink to="/menu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                <NavLink to="/about" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                <NavLink to="/cart" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                    <img className="header__basket" src="../../src/assets/basket.svg" alt="Cart" />
                    {quantity > 0 && (
                        <div className='badge'>{quantity}</div>
                    )}
                </NavLink>
                <div className="header__user-container">
                    {isLoggedIn ? (
                        <>
                            <NavLink to="#" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active nav__link--login' : 'nav__link nav__link--login'} onClick={toggleUserMenu}>
                                <img className="header__user" src="../../src/assets/user.svg" alt="User" />
                                <p>User</p>
                            </NavLink>
                            {isUserMenuOpen && (
                                <div className="user-menu">
                                    <NavLink to="/user" className="user-menu__link">My Orders</NavLink>
                                    <NavLink to="/my-favourites" className="user-menu__link">My Favourites</NavLink>
                                    <NavLink to="/settings" className="user-menu__link">Settings</NavLink>
                                    <NavLink to="/logout" className="user-menu__link">Logout</NavLink>
                                </div>
                            )}
                        </>
                    ) : (
                        <NavLink to="/login" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active nav__link--login' : 'nav__link nav__link--login'}>
                            <img className="header__user" src="../../src/assets/user.svg" alt="User" />
                            <p>Login</p>
                        </NavLink>
                    )}
                </div>
            </nav>
            <nav className="header__nav header__nav--mobile">
                <NavLink to="/" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                    <img className="header__logo" src="../../../src/assets/logo.svg" alt="Logo" />
                </NavLink>
                <section className={`header__section ${isOpen ? 'open' : ''}`}>
                    <NavLink to="/menu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Menu</NavLink>
                    <NavLink to="/about" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>About Us</NavLink>
                    <NavLink to="/cart" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
                        <img className="header__basket" src="../../src/assets/basket.svg" alt="Cart" />
                        {quantity > 0 && (
                            <div className='badge'>{quantity}</div>
                        )}
                    </NavLink>
                    {isLoggedIn ? (
                        <NavLink to="#" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active nav__link--login' : 'nav__link nav__link--login'} onClick={toggleUserMenu}>
                            <img className="header__user" src="../../src/assets/user.svg" alt="User" />
                            <p>User</p>
                        </NavLink>
                    ) : (
                        <NavLink to="/login" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active nav__link--login' : 'nav__link nav__link--login'}>
                            <img className="header__user" src="../../src/assets/user.svg" alt="User" />
                            <p>Login</p>
                        </NavLink>
                    )}
                </section>
                {isUserMenuOpen && isLoggedIn && (
                    <div className="user-menu">
                        <NavLink to="/user" className="user-menu__link">My Orders</NavLink>
                        <NavLink to="/my-favourites" className="user-menu__link">My Favourites</NavLink>
                        <NavLink to="/settings" className="user-menu__link">Settings</NavLink>
                        <NavLink to="/logout" className="user-menu__link">Logout</NavLink>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;

/**
 * Författare Ida
 * En funktion som sköter navigeringen på sidan.
 * Har använt NavLink för att kunna hålla reda på vilken sida som är aktiv och inte.
 * Om sidan är aktiv får den klassen nav__link OCH nav__link--active annars bara nav__link
 * Skapade även en annan Nav för mobil view
 */

// Författare Lisa
// Lägger in funktion samt en badge som visar quantity för varukorgen.
//  Uppdateras när cart ändras. 

// Författare Diliara
// Gjorde så att man kan klicka på user och 
// få upp en meny, beroende på setIsLoggedin visas olika grejer (user menu för inloggad 
// och login för utloggad)