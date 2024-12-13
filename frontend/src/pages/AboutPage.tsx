import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/aboutPage.css';

import storeImage from '../assets/store.jpg';
import employee1 from '../assets/employee1.jpeg';
import employee2 from '../assets/employee2.jpeg';
import employee3 from '../assets/employee3.jpeg';
import employee4 from '../assets/employee4.jpeg';
import iceCream from '../assets/ice cream.jpg';

function AboutPage() {
    return (
        <>
            <Header />
            <div className="about-wrapper">
                <article className="history">
                    <h2 className="history__heading">
                        Our History
                    </h2>
                    <article className="history__container">
                        <p className="history__text">
                            At ConeZone, we believe in the magic of ice cream — those moments when a simple scoop transforms into a swirl of joy, and every bite transports you back to a summer day, no matter the season.
                            <br></br>
                            <br></br>
                            We quickly became known not only for our delicious ice cream but for our passion for crafting flavors that bring people together. From our beloved signature flavors to adventurous limited editions, every scoop at ConeZone is made with fresh ingredients and just a touch of whimsy.
                            <br></br>
                            <br></br>
                            Today, ConeZone has grown into a community spot where friends, families, and ice cream lovers come together to savor classic favorites, discover new creations, and share stories over dessert. So, grab a cone, and welcome to ConeZone!
                        </p>
                        <img src={storeImage} alt="" className="history__img" />
                    </article>
                </article>
                <article className="employees">
                    <h2 className="employees__heading">
                        Our Employees
                    </h2>
                    <section className="employees__container">
                        <article className="employees__item">
                            <section className="employees__desc-container">
                                <img src={employee1} alt="picture of a woman" className="employees__img" />
                                <h3 className="employees__name">Lisa</h3>
                                <p className="employees__position">Head of Ice</p>
                            </section>
                        </article>
                        <article className="employees__item">
                            <section className="employees__desc-container">
                                <img src={employee2} alt="" className="employees__img" />
                                <h3 className="employees__name">Diliara</h3>
                                <p className="employees__position">Head of Cream</p>
                            </section>
                        </article>
                        <article className="employees__item">
                            <section className="employees__desc-container">
                                <img src={employee3} alt="" className="employees__img" />
                                <h3 className="employees__name">Najib</h3>
                                <p className="employees__position">Head of Cone</p>
                            </section>
                        </article>
                        <article className="employees__item">
                            <section className="employees__desc-container">
                                <img src={employee4} alt="" className="employees__img" />
                                <h3 className="employees__name">Ida</h3>
                                <p className="employees__position">Head of Zone</p>
                            </section>
                        </article>
                    </section>
                </article>
                <article className="ice-cream">
                    <img src={iceCream} alt="" className="ice-cream__img" />
                </article>
                <article className="quote">
                    <h3 className="quote__text">“We strive to make the best Ice Cream in the world and having fun while we do it!”</h3>
                </article>
            </div>
            <Footer />
        </>
    )
}
export default AboutPage

/**
 * Författare: Diliara
 * About us sida som innehåller information om företaget, dess historia och anställda.
 */