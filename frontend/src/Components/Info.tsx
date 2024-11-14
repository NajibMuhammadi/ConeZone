import { Link } from 'react-router-dom';
import './styles/info.css';

function Info() {
    return (
        <>
            <section className="info__wrapper">
                <form className="info__form">
                    <h2 className="info__header">Info</h2>
                    <label htmlFor="info__name">Name:</label>
                    <input type="text" id="info__name" name="name" />

                    <label htmlFor="info__phone">Phone number:</label>
                    <input type="tel" id="info__phone" name="phone" />            

                    <label htmlFor="info__email">Email:</label>
                    <input type="email" id="info__email" name="email" />

                    <Link to="/payment" className="info__submit">Continue</Link>
                </form>
            </section>
        </>
    )
}

export default Info

/*
Författare: Diliara
Info komponent med formulär för att fylla i namn, telefonnummer och email
*/