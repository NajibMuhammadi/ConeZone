import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import './styles/editMenuPage.css';
import { fetchItems } from '../services/fetchItems';
import { ItemType } from '../types/interfaces';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { deleteItem } from '../services/deleteItem';
import {jwtDecode} from 'jwt-decode';

import editIcon from '../assets/edit.png';
import vector from '../assets/Vector.png';

function EditMenuPage() {
    const url = 'itemsUrl';
    const token = sessionStorage.getItem('token');
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

    const removeItem = async (sk : string) => {

        if(token) {
            try {
                const decoded: {isAdmin: boolean} = jwtDecode(token);
                const isAdmin = decoded.isAdmin;

                if(isAdmin) {
                    try {     
                    await deleteItem('itemsUrl', sk);
                    } catch(error) {
                        console.error('Error adding item', error)
                    }
                }
            } catch (error) {
                console.error('Error parsing token', error)
            }
        }
    }

    return (
        <>
            <Header />
            <section className='edit-menu__wrapper'>
                <section className='edit-menu__container'>
                    <h2 className='edit-menu__header'>Edit menu</h2>
                    <Link to={'/add'}><button className="edit-menu__add-btn">Add item</button></Link>
                    <section className="edit-menu__menu">
                        {items.map((item) => {
                            return (
                                <>
                                    <article className="edit-menu__menu-item">
                                        <img className="edit-menu__menu-image" src={item.image} alt="IceCream" />
                                        <article className="edit-menu__menu-des">
                                            <h2 className="edit-menu__menu-title">{item.name}</h2>
                                        </article>
                                        <article className="edit-menu__menu-changes">
                                            <Link to={`/item/${item.sk}`}><img className='edit-menu__menu-edit' src={editIcon} alt="Redigera" /></Link>
                                            <img className="edit-menu__menu-delete" src={vector} alt="Delete" onClick={() => item.sk && removeItem(item.sk)} />
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

/** 
 * Författare: Diliara
 * En sida där admin kan redigera menyn
 * 
 * Edited: Ida
 * La till en länk för att navigera till sidan där man kan edit items.
 * La till en funktion som raderar items utifrån dess sk och sedan uppdaterar sidan
*/