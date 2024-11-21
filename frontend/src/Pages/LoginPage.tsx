import Footer from "../components/Footer"
import Header from "../components/Header"
import './styles/loginPage.css'
import { NavLink } from "react-router-dom"
import { postFetch } from "../services/postFetch"
import { LoginType } from "../types/interfaces"
import { useState } from "react"

function LoginPage() {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const loginData: LoginType = {
                usernameOrEmail : usernameOrEmail,
                password
            };
            await postFetch('loginsUrl', loginData);
        } catch (err) {
            console.error('Error:', err);
        }
    }

    return (
        <>
            <Header/>
            <section className="login__wrapper">
                <form className="login__form" onSubmit={handleSubmit}>
                    <h2 className="login__header">Login</h2>
                    <label htmlFor="login__username">Username:</label>
                    <input type="text" id="login__username" name="username"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                     />
                    
                    <label htmlFor="login__password">Password:</label>
                    <input type="password" id="login__password" name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <input type="submit" value="Login" className="login__submit"></input>
                </form> 
                <NavLink to="/register" className="login__register">Not a member? Create user here!</NavLink>
            </section>
            <Footer />
        </>
    )
}  
export default LoginPage


/* 
    * Författare: Ida
    * Login-sida där användaren kan logga in med användarnamn eller e-post och lösenord
 */

/* 
    * Författare: Najib
    * kopplar ihop LoginPage med PostFetch för att posta data till databasen
 */