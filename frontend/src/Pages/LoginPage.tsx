import Footer from "../components/Footer"
import Header from "../components/Header"
import './styles/loginPage.css'
import { NavLink } from "react-router-dom"

function LoginPage() {
    return (
        <>
            <Header/>
            <section className="login__wrapper">
                <form className="login__form">
                    <h2 className="login__header">Login</h2>
                    <label htmlFor="login__username">Username:</label>
                    <input type="text" id="login__username" name="username" />
                    
                    <label htmlFor="login__password">Password:</label>
                    <input type="password" id="login__password" name="password" />
                    
                    <input type="submit" value="Login" className="login__submit"></input>
                </form> 
                <NavLink to="/register" className="login__register">Not a member? Create user here!</NavLink>
            </section>
            <Footer />
        </>
    )
}  
export default LoginPage