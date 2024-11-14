import './styles/payment.css'

import swish from '../assets/swish.svg';
import klarna from '../assets/klarna.svg';
import cash from '../assets/cash.svg';
import wpfBankCard from '../assets/wpfbankcard.svg';

function Payment() {
  return (
    <div className='payment__wrapper'>
        <main className='payment'>
            <h1 className='payment__title'>Payment with</h1>
            <span className='payment__divider'></span>
            <section className='payment__methods-container'>
                <article className='payment__method'>
                    <img className='payment__method-image' src={swish} alt='Swish' />
                </article>
                <article className='payment__method payment__method--flexStart'>
                    <img className='payment__method-image' src={klarna} alt='Klarna' />
                </article>
                <article className='payment__method'>
                    <img className='payment__method-image' src={cash} alt='Cash' />
                </article>
                <article className='payment__method payment__method--flexStart'>
                    <img className='payment__method-image' src={wpfBankCard} alt='WPF Bank Card' />
                </article>
            </section>
        </main>
    </div>
  )
}

export default Payment