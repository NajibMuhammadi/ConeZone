import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/productPage.css';
import { ItemType } from '../types/interfaces';
import { fetchItems } from '../services/fetchItems';
import useMenuStore from '../stores/cartStore';

function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const url = 'itemsUrl';
    const [item, setItem] = useState<ItemType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const addToCart = useMenuStore(state => state.addToCart);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const fetchedItems = await fetchItems(url);
                const foundItem = fetchedItems.find((item: ItemType) => item.sk === id);
                if (!foundItem) {
                    throw new Error('Item not found');
                }
                setItem(foundItem);
            } catch (error) {
                console.error("Error fetching item:", error);
                setError('Failed to fetch item data');
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id, url]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="product__wrapper">
                <section className="product">
                    <article className="product__card" key={item.sk}>
                        <img src={item.image} alt={item.name} className="product__img" />
                    </article>
                    <article className="product__info">
                        <h3 className="product__name">{item.name}</h3>
                        <h4 className="product__desc">{item.desc}</h4>
                        <article className="product__lists">
                            <ul className="product__components">
                                <strong>Ingridients:</strong>
                                {item.components.map((component, index) => (
                                    <li className="product__component-item" key={index}>{component}</li>
                                ))}
                            </ul>
                        </article>
                        <section className="product__buttons">
                            <button className="product__button"
                                onClick={() => addToCart(item)}
                            >Give me one!</button>
                            <Link to="/menu">
                                <button className="product__back-btn">Go back</button>
                            </Link>
                        </section>
                    </article>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default ProductPage;

/**
 * Författare: Diliara
 * Product sida som innehåller information om produkten.
 * Tog bort allergens
 *
 *
 * Bugfix: Ida uppdaterade urlen
 */

// Författare: Lisa. Lägger in funktion addToCart med vår store