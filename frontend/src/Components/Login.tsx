import './styles/login.css'

function Login() {
    return (
        <form className="login__form">
            <h2 className="login__header">Login</h2>
            <label htmlFor="username">Username:</label>
            <input type="text" id="login__username" name="username" />
            
            <label htmlFor="password">Password:</label>
            <input type="password" id="login__password" name="password" />
            
            <input type="submit" value="Login" className="login__submit"></input>
        </form> 
    )
}

export default Login;
