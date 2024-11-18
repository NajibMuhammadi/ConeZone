import './styles/info.css';

function Info({ onNext }: { onNext: () => void }) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onNext();
    };

    return (
        <>
            <section className="info__wrapper">
                <form className="info__form" onSubmit={handleSubmit}>
                    <h2 className="info__header">Info</h2>
                    <label htmlFor="info__name">Name:</label>
                    <input type="text" id="info__name" name="name" />

                    <label htmlFor="info__phone">Phone number:</label>
                    <input type="tel" id="info__phone" name="phone" />            

                    <label htmlFor="info__email">Email:</label>
                    <input type="email" id="info__email" name="email" />

                    <button type="submit" className="info__submit">Continue</button>
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