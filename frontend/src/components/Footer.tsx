import './styles/footer.css';
import logo from '../assets/logo.svg';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import twitter from '../assets/twitter.svg';

const imageData = [
    { src: 'https://www.facebook.com/', alt: 'facebook', icon : facebook },
    { src: 'https://www.instagram.com/', alt: 'instagram', icon : instagram },
    { src: 'https://www.twitter.com/', alt: 'twitter', icon : twitter }
]


function Footer() {
  return (
    <footer className="footer">
        <section className='footer__des-container'>
            <article className="footer__description">
                <h3 className="footer__description-title">Adress</h3>
                <p className="footer__description-text">ConeZone Street</p>
            </article>
            <article className="footer__description">
                <h3 className="footer__description-title">Phone number</h3>
                <p className="footer__description-text">+123456789</p>
            </article>
            <article className="footer__description">
                <h3 className="footer__description-title">Email</h3>
                <p className="footer__description-text">conezone@gmail.com</p>
            </article>
        </section>
        <section className="footer__logo">
            <img className='footer__logo-image' src={logo} alt="" />
        </section>
        <section className='footer__social-container'>
            <h3 className='footer__social-title'>SOCIAL MEDIA</h3>
            <article className='footer__social'>
                {imageData.map((data, index) => (
                    <a className='footer__social-link' href={data.src} key={index}>
                        <img className='footer__social-image' src={data.icon} alt={data.alt} />
                    </a>
                ))}
            </article>
        </section>
        
    </footer>
  )
}

export default Footer

/* 
    författare: Najib
    förklaring: Footer komponenten som innehåller adress, telefonnummer, email och social media ikoner.
*/