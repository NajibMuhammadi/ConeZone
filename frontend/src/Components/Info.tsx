import './styles/info.css';
import { useState } from 'react';
import useMenuStore from '../stores/cartStore';

function Info({ onNext }: { onNext: () => void }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const setOrder = useMenuStore((state) => state.setOrder);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOrder(name, phone, email, '');
        onNext();
    }

    return (
        <>
            <section className="info__wrapper">
                <form className="info__form" onSubmit={handleSubmit}>
                    <h2 className="info__header">Info</h2>
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
        </>
    );
}

export default Info;

/*
Författare: Diliara
Info komponent med formulär för att fylla i namn, telefonnummer och email
La till en onSubmit för att gå vidare till nästa komponent
*/