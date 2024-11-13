import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/registerPage.css'

function Register() {
    return (
        <>
            <Header/>
            <section className="register__wrapper">
                <form className="register__form">
                    <h2 className="register__header">Create user</h2>
                    <label htmlFor="register__username">Username:</label>
                    <input type="text" id="register__username" name="username" />
                    
                    <label htmlFor="register__password">Password:</label>                <input type="password" id="register__password" name="password" />

                    <label htmlFor="register__secondpassword">Password:</label>
                    <input type="password" id="register__secondpassworrd" name="secondpassword" />

                    <label htmlFor="register__mail">Mail:</label>
                    <input type="mail" id="register__mail" name="mail" />
                        
                    <input type="submit" value="Create user" className="register__submit"></input>
                </form> 
            </section>
            <Footer/>
        </>
    )
}

export default Register;
