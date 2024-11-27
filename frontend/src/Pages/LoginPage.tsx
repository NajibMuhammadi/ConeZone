import Footer from "../components/Footer";
import Header from "../components/Header";
import './styles/loginPage.css';
import { NavLink, useNavigate } from "react-router-dom";
import { postFetch } from "../services/postFetch";
import { LoginType } from "../types/interfaces";
import { useState } from "react";

function LoginPage() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setSuccess(null);

        try {
            const loginData: LoginType = {
                usernameOrEmail,
                password
            };
            const response = await postFetch('loginsUrl', loginData);

            console.log('Response:', response);
            setSuccess(response.data.message);

            if (response.data.success) {
                saveTokenToSessionStorage(response.token);
                if (response.data.data.isAdmin) {
                    console.log('Admin');
                    navigate('/kitchenview');
                } else {
                    navigate('/user');
                }
            }
        } catch (err) {
            console.error('Error:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    const saveTokenToSessionStorage = (token: string) => {
        sessionStorage.setItem('token', token);
    };

    return (
        <>
            <Header />
            <section className="login__wrapper">
                <form className="login__form" onSubmit={handleSubmit}>
                    <h2 className="login__header">Login</h2>
                    {error && <div className="register__error-message">{error}</div>}
                    {success && <div className="register__success-message">{success}!</div>}
                    <label htmlFor="login__username">Username:</label>
                    <input
                        type="text"
                        id="login__username"
                        name="username"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                    <label htmlFor="login__password">Password:</label>
                    <input
                        type="password"
                        id="login__password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="Login" className="login__submit" />
                </form>
                <NavLink to="/register" className="login__register">Not a member? Create user here!</NavLink>
            </section>
            <Footer />
        </>
    );
}

export default LoginPage;


/* 
    * Författare: Ida
    * Login-sida där användaren kan logga in med användarnamn eller e-post och lösenord
 */

/* 
    * Författare: Najib
    * kopplar ihop LoginPage med PostFetch för att posta data till databasen
 */

// Edited: Diliara
// La till en if sats, om user har isAdmin true, 
// navigera till kitchenview annars navigera till user