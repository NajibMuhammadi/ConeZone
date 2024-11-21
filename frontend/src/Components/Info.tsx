import './styles/info.css';
import { useState } from 'react';
import useMenuStore from '../stores/cartStore';

function Info({ onNext }: { onNext: () => void }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const setOrder = useMenuStore((state) => state.setOrder);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (!name.trim()) {
                throw { msg: 'Name is required.' };
            }
            if (!/^\+?[0-9]+$/.test(phone)) {
                throw { msg: 'Please enter a valid phone number with only numbers and an optional + at the beginning.' };
            }
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
                throw { msg: 'Please enter a valid email address.' };
            }
            setErrorMsg(null);
            setOrder(name, phone, email);
            onNext();
        } catch (error: any) {
            setErrorMsg(error.msg || 'An unexpected error occurred.');
        }
    }

    return (
        <section className="info__wrapper">
            <form className="info__form" onSubmit={handleSubmit}>
                <h2 className="info__header">Info</h2>
                {errorMsg && <p className="error-msg">{errorMsg}</p>}
                <label htmlFor="info__name">Name:</label>
                <input
                    type="text"
                    id="info__name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="info__phone">Phone number:</label>
                <input
                    type="tel"
                    id="info__phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <label htmlFor="info__email">Email:</label>
                <input
                    type="email"
                    id="info__email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="info__submit">Continue</button>
            </form>
        </section>
    );
}

export default Info;

/*
Författare: Diliara
Info komponent med formulär för att fylla i namn, telefonnummer och email
La till en onSubmit för att gå vidare till nästa komponent
*/

/* Författare: Lisa
Lägger till felmeddelande  för validering i frontend 
*/