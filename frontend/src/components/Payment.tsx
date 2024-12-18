import './styles/payment.css'
import useMenuStore from '../stores/cartStore';
import swish from '../assets/swish.svg';
import klarna from '../assets/klarna.svg';
import cash from '../assets/cash.svg';
import card from '../assets/card.svg';

function Payment({ onNext }: { onNext: () => void }) {

    const paymentMethod = useMenuStore(state => state.paymentMethod);
    const setPaymentMethod = useMenuStore(state => state.setPaymentMethod);

    const paymentOptions = [
        { id: "swish", label: "Swish", image: swish },
        { id: "klarna", label: "Klarna", image: klarna },
        { id: "cash", label: "Cash", image: cash },
        { id: "card", label: "Card", image: card },
    ];

    const handleSelection = (method: string) => {
        if (method !== paymentMethod) {
            setPaymentMethod(method);
        }
        onNext();
    };

    return (
        <div className='payment__wrapper'>
            <main className='payment'>
                <h2 className='payment__title'>Payment</h2>
                <span className='payment__divider'></span>
                <section className='payment__methods-container'>
                    {paymentOptions.map((option) => (
                        <article key={option.id} className='payment__method'>
                            <img className='payment__method-image' src={option.image} alt={option.label} />
                            <div className='payment__radio-container'>
                                <input
                                    type="radio"
                                    id={option.id}
                                    name="paymentMethod"
                                    value={option.label}
                                    checked={paymentMethod === option.label}
                                    onChange={(e) => handleSelection(e.target.value)}
                                    className="payment__radio"
                                />
                                <label htmlFor={option.id} className="payment__radio-label">
                                    {option.label}
                                </label>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Payment

// Författare Diliara

// Författare Lisa
// Implementerat funktionalitet med store och handle selection

// /** Författare: Najib
// Edited: Diliara
// La till en onSubmit för att gå vidare till nästa komponent
