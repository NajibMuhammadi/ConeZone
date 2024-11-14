import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './styles/productPage.css';
import { ItemType } from '../types/interfaces';
import { fetchItems } from '../services/fetchItems';

function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const url = 'localUrl';
    const [item, setItem] = useState<ItemType | null>(null);
    const [error, setError] = useState<string | null>(null);

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
                        <p className="product__name">{item.name}</p>
                        <p className="product__desc">{item.desc}</p>
                        <article className="product__lists">
                        <ul className="product__components">
                            <strong>Ingridients:</strong>
                            {item.components.map((component, index) => (
                                <li className="product__component-item" key={index}>{component}</li>
                            ))}
                        </ul>
                        <p className="product__allergens">Allergens:</p>
                        </article>
                        <button className="product__button">Give me one!</button>
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
 */