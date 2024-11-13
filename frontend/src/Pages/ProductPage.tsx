import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/productPage.css';

function ProductPage() {
    return (
        <>
        <Header />
            <section className="product">
                <article className="product__card">
                    <img src="" alt="" className="product__img" />
                    <p className="product__name"></p>
                    <p className="product__desc"></p>
                </article>
                <article className="product__info">
                    <p className="product__components"></p>
                    <p className="product__allergens"></p>
                </article>
                <button className="product__button">Give me one!</button>
            </section>
        <Footer />
        </>
    )
}

export default ProductPage

/**
 * Författare: Diliara
 * Product sida som innehåller information om produkten.
 */