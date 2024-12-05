import { NavLink, NavLinkRenderProps, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/header.css';
import './styles/userHeader.css'
import './styles/adminHeader.css'
import useMenuStore from '../stores/cartStore';
import { jwtDecode } from 'jwt-decode';

function Header() {
    const { sk } = useParams<{ sk: string }>();
    const cart = useMenuStore(state => state.cart);
    const totalQuantity = useMenuStore(state => state.totalQuantity);
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();
    const [orderNumber, setOrderNumber] = useState<string | null>(null);

    useEffect(() => {
        setQuantity(totalQuantity());
        const updatedOrderNumber = sessionStorage.getItem('orderNumber')
        setOrderNumber(updatedOrderNumber)
    }, [cart, totalQuantity]);

    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                const decoded: { isAdmin: boolean } = jwtDecode(token);
                const isAdmin = decoded.isAdmin;
                console.log('isAdmin:', isAdmin);
            } catch (err) {
                console.error('Error parsing token:', err);
            }
        }
        setIsLoggedIn(!!token);
        setIsAdmin(!!token && (jwtDecode<{ isAdmin: boolean }>(token)).isAdmin);
    }, []);

    const toggleNav = (): void => {
        setIsOpen(!isOpen);
    };

    const toggleUserMenu = (): void => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const logout = (): void => {
        console.log('You have clicked the logout button');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isAdmin');
        sessionStorage.removeItem('orderNumber');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsUserMenuOpen(false);
        navigate('/');
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
                {orderNumber && (
                    <button className="nav__link nav__button" onClick={() => navigate('/order', { state: { slideIndex: 3, sk: sk } })}>
                        Your Order
                    </button>
                )}
                {isLoggedIn ? (
                    <>
                        <button className="nav__button" onClick={toggleUserMenu}>
                            <img className="header__user" src="../../src/assets/user.svg" alt="User" />
                            <p>{isAdmin ? 'Admin' : 'User'}</p>
                        </button>
                        <nav className={`nav__user-nav ${isUserMenuOpen ? 'showMenu' : ''}`}>
                            <section className="user-nav__section">
                                {isAdmin ? (
                                    <>
                                        <NavLink to="/kitchenview" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Kitchen View</NavLink>
                                        <NavLink to="/editmenu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Edit Menu</NavLink>
                                        <NavLink to="/showorders" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Show All Orders</NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to="/user" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>My Orders</NavLink>
                                        {/* <NavLink to="/my-favourites" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>My Favourites</NavLink> */}
                                        <NavLink to="/my-info" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>My Info</NavLink>
                                    </>
                                )}
                            </section>
                            <button className="nav__logout nav__link" onClick={logout}>Log Out</button>
                        </nav>
                    </>
                ) : (
                    <NavLink to="/login" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active nav__link--login' : 'nav__link nav__link--login'}>
                        <img className="header__user" src="../../src/assets/user.svg" alt="User" />
                        <p>Login</p>
                    </NavLink>
                )}
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
                    {orderNumber && (
                        <button className="nav__link nav__button" onClick={() => navigate('/order', { state: { slideIndex: 3, sk: sk } })}>
                            Your Order
                        </button>
                    )}
                    {isLoggedIn ? (
                        <>
                            <button className="nav__button" onClick={toggleUserMenu}>
                                <img className="header__user" src="../../src/assets/user.svg" alt="User" />
                                <p>{isAdmin ? 'Admin' : 'User'}</p>
                            </button>
                            <nav className={`nav__user-nav nav__user-nav--mobile ${isUserMenuOpen ? 'showMenu' : ''}`}>
                                <section className="user-nav__section">
                                    {isAdmin ? (
                                        <>
                                            <NavLink to="/kitchenview" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Kitchen View</NavLink>
                                            <NavLink to="/editmenu" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Edit Menu</NavLink>
                                            <NavLink to="/showorders" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>Show All Orders</NavLink>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink to="/user" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>My Orders</NavLink>
                                            {/* <NavLink to="/my-favourites" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>My Favourites</NavLink> */}
                                            <NavLink to="/my-info" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>My Info</NavLink>
                                        </>
                                    )}
                                    <button className="nav__logout nav__link" onClick={logout}>Log Out</button>
                                </section>
                            </nav>
                        </>
                    ) : (
                        <NavLink to="/login" className={({ isActive }: NavLinkRenderProps) => isActive ? 'nav__link nav__link--active nav__link--login' : 'nav__link nav__link--login'}>
                            <img className="header__user" src="../../src/assets/user.svg" alt="User" />
                            <p>Login</p>
                        </NavLink>
                    )}
                </section>
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
// Lägger in YourOrder funktion.

// Författare Diliara
// Gjorde så att man kan klicka på user och
// få upp en meny, lagrar admin/ user geno alla sidor

// Författare Najib
// hämtade token från sessionstorage och dekodade den för att se om användaren är admin eller inte
// bugfixade så att your order knappen finns även i mobilläge