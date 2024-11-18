import './styles/payment.css'
import useMenuStore from '../stores/cartStore';
import swish from '../assets/swish.svg';
import klarna from '../assets/klarna.svg';
import cash from '../assets/cash.svg';
import wpfbankcard from '../assets/wpfbankcard.svg';

function Payment() {

    const paymentMethod = useMenuStore(state => state.paymentMethod);
    const setPaymentMethod = useMenuStore(state => state.setPaymentMethod);

    const paymentOptions = [
        { id: "swish", label: "Swish", image: swish },
        { id: "klarna", label: "Klarna", image: klarna },
        { id: "cash", label: "Cash", image: cash },
        { id: "card", label: "WPF Bank Card", image: wpfbankcard },
    ];

    const handleSelection = (method: string) => {
        if (method !== paymentMethod) {
            setPaymentMethod(method);
        }
    };

    return (
        <div className='payment__wrapper'>
            <main className='payment'>
                <h1 className='payment__title'>Payment with</h1>
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