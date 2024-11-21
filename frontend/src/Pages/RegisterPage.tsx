import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/registerPage.css';
import { postFetch } from '../services/postFetch';
import { RegisterType } from '../types/interfaces';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const data: RegisterType = {
                username,
                password,
                confirmPassword,
                email
            };
            await postFetch('registersUrl', data);
        } catch (err) {
            console.error('Error:', err);
            setError('An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />
            <section className="register__wrapper">
                <form className="register__form" onSubmit={handleSubmit}>
                    <h2 className="register__header">Create user</h2>

                    {error && <div className="error-message">{error}</div>}

                    <label htmlFor="register__username">Username:</label>
                    <input
                        type="text"
                        id="register__username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="register__password">Password:</label>
                    <input
                        type="password"
                        id="register__password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="register__secondpassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="register__secondpassword"
                        name="secondpassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <label htmlFor="register__mail">Email:</label>
                    <input
                        type="email"
                        id="register__mail"
                        name="mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="submit"
                        value={isLoading ? 'Registering...' : 'Register'}
                        className="register__submit"
                        disabled={isLoading}
                    />
                </form>
            </section>
            <Footer />
        </>
    );
}

export default Register;

/* 
    författare: Ida
    Skapar en sida där användaren kan registrera sig för att skapa ett konto.
 */

/* 
    författare: Najib
    funktionen tar in användarens input och skickar det till en databas för att skapa ett konto
 */