import Footer from "../components/Footer"
import Header from "../components/Header"
import Login from "../components/Login"
import './styles/loginPage.css'

function LoginPage() {
    return (
        <>
            <Header/>
            <section className="login__wrapper">
                <Login/>
            </section>
            <Footer />
        </>
    )
}  
export default LoginPage