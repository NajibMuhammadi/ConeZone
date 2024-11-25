import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/userPage.css';

function UserPage() {
    return (
        <>
            <Header />
            <section className="user__wrapper">
                <section className="user__orders">
                    <h2 className="user__header">My orders</h2>
                    <section className="user__orders-container">
                        <article className="user__order-item">
                            <section className="user__order-img">
                                <img src="../../src/assets/Strawberrylicious.png" alt="strawberry ice cream" className="user__img" />
                                <img src="../../src/assets/Peachylicious.png" alt="peach ice cream" className="user__img" />
                                <img src="../../src/assets/Lemonlicious.png" alt="lemon ice cream" className="user__img" />
                                <img src="../../src/assets/Blueberrylicious.png" alt="blueberry ice cream" className="user__img" />
                            </section>
                            <section className="user__order-info">
                                <p className="user__date">
                                    <strong>March 25, 2024</strong>
                                    <br />
                                    21:09
                                </p>
                                <p className="user__total">
                                    <strong>Total</strong>
                                    <br />
                                    100kr
                                </p>
                            </section>
                        </article>
                        <article className="user__order-item">
                            <section className="user__order-img">
                                <img src="../../src/assets/Strawberrylicious.png" alt="strawberry ice cream" className="user__img" />
                            </section>
                            <section className="user__order-info">
                                <p className="user__date">
                                    <strong>June 17, 2024</strong>
                                    <br />
                                    11:47
                                </p>
                                <p className="user__total">
                                    <strong>Total</strong>
                                    <br />
                                    25kr
                                </p>
                            </section>
                        </article>
                        <article className="user__order-item">
                            <section className="user__order-img">
                                <img src="../../src/assets/Lemonlicious.png" alt="lemon ice cream" className="user__img" />
                                <img src="../../src/assets/Blueberrylicious.png" alt="blueberry ice cream" className="user__img" />
                            </section>
                            <section className="user__order-info">
                                <p className="user__date">
                                    <strong>July 3, 2024</strong>
                                    <br />
                                    14:22
                                </p>
                                <p className="user__total">
                                    <strong>Total</strong>
                                    <br />
                                    50kr
                                </p>
                            </section>
                        </article>
                    </section>
                </section>
            </section>
            <Footer />
        </>
    )
}

export default UserPage

// Författare Diliara
// Här visas användarens tidigare ordrar