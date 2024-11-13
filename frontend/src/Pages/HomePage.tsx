import './styles/homePage.css'
import iceCreamPic from '../assets/openart-image_PfdOx5Cb_1731064103830_raw.jpg';
import arrow from '../assets/Arrow 1.png'
import star from '../assets/material-symbols_star.png'
import SoyoBoy from '../assets/SoyoBoy.png'
import FancyLady from '../assets/FancyLady.png'
import IceCreamLover from '../assets/IceCreamLover.png'
import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage() {

  return (
    <>
      <Header />
      <section className='homePage__wrapper'>
        <section className="homePage__jumbotron">
          <h1 className="homePage__jumbotron-header">Where Sweet Meets Street!</h1>
          <p className="homePage__jumbotron-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </section>
        <section className="homePage__content">
          <img className="homePage__picture" src={iceCreamPic} alt="IceCreamImg" />
          <article className='homePage__aside' >
            <p className="homePage__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            <button className="homePage__button">
              <p className='homePage__button-text'>Menu</p>
              <img className='homePage__arrow' src={arrow} alt="arrow" />
            </button>
          </article>
        </section>
        <article className="homePage__slogan">
          <p className="homePage__slogan-text">Never fear, your Ice Cream is here!</p>
        </article>
        <section className="homePage__reviews">
          <section className="homePage__ourRating">
            <p className="homePage__ourRating-header">OUR RATING</p>
            <article className='homePage__ourRating-starsContainer'>
              <img className="homePage__ourRating-stars" src={star} alt="star" />
              <img className="homePage__ourRating-stars" src={star} alt="star" />
              <img className="homePage__ourRating-stars" src={star} alt="star" />
              <img className="homePage__ourRating-stars" src={star} alt="star" />
              <img className="homePage__ourRating-stars" src={star} alt="star" />
            </article>
          </section>
          <section className="homePage__reviews-list">
            <article className="homePage__review">
              <img className="homePage__review-img" src={SoyoBoy} alt="reviewPerson1" />
              <p className="homePage__review-text"> <span className='homePage__review-boldtext'>"Blablabla"</span> - from SoyoBoy</p>
            </article>
            <article className="homePage__review">
              <img className="homePage__review-img" src={FancyLady} alt="reviewPerson2" />
              <p className="homePage__review-text"><span className='homePage__review-boldtext'>"Yummy!"</span> - from FancyLady</p>
            </article>
            <article className="homePage__review">
              <img className="homePage__review-img" src={IceCreamLover} alt="reviewPerson3" />
              <p className="homePage__review-text"><span className='homePage__review-boldtext'>"So, so good!"</span> - from IceCreamLover192</p>
            </article>
          </section>
        </section>
      </section>
      <Footer />
    </>
  )
}

export default HomePage