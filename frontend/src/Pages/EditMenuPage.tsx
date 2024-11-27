import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import './styles/editMenuPage.css';
import { fetchItems } from '../services/fetchItems';
import { ItemType } from '../types/interfaces';
import AdminHeader from '../components/AdminHeader';

function EditMenuPage() {
    const url = 'itemsUrl';
    const [items, setItems] = useState<ItemType[]>([]);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const fetchedItems = await fetchItems(url);
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        loadItems();
    }, [url]);

    return (
        <>
            <AdminHeader />
            <section className='edit-menu__wrapper'>
                <section className='edit-menu__container'>
                    <h2 className='edit-menu__header'>Edit menu</h2>
                    <button className="edit-menu__add-btn">Add item</button>
                    <section className="edit-menu__menu">
                        {items.map((item) => {
                            return (
                                <>
                                    <article className="edit-menu__menu-item">
                                        <img className="edit-menu__menu-image" src={item.image} alt="IceCream" />
                                        <article className="edit-menu__menu-des">
                                            <h2 className="edit-menu__menu-title">{item.name}</h2>
                                            <p className="edit-menu__menu-desc">{item.desc}</p>
                                            <p className="edit-menu__menu-price">{item.price} kr</p>
                                        </article>
                                        <article className="edit-menu__menu-changes">
                                            <img className='edit-menu__menu-edit' src="../../src/assets/edit.png" alt="Redigera" />
                                            <img className="edit-menu__menu-delete" src="../../src/assets/Vector.png" alt="Delete" />
                                        </article>
                                    </article>
                                </>
                            )
                        }
                        )}
                    </section>
                </section>
            </section>
            <Footer />
        </>
    )
}

export default EditMenuPage;

// Författare: Diliara
// En sida där admin kan redigera menyn