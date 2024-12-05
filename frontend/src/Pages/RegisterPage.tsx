import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/registerPage.css';
import { postFetch } from '../services/postFetch';
import { RegisterType } from '../types/interfaces';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            navigate('/menu');
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const data: RegisterType = {
                username,
                password,
                confirmPassword,
                email
            };
            const response = await postFetch('registersUrl', data);

            setSuccess(response.body.message);
            if(response.body.success){
                navigate('/login');
            }

        } catch (err) {
            console.error('Error:', err);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
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

                    {error && <div className="register__error-message">{error}</div>}
                    {success && <div className="register__success-message">{success}!</div>}

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
    hämtade token från session storage och naviger till menyn om användaren är redan inloggad, 
    det vill säga man kan inte komma åt registrerings url om användaren redan är inloggad.

 */

/* författare: Diliara
    skriver ut felmeddelanden om användaren inte lyckas registrera eller 
    skriver ut ett meddelande om användaren lyckas registrera sig
*/
