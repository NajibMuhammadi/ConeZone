import Footer from "../components/Footer"
import Header from "../components/Header"
import './styles/menuPage.css';

import { useEffect, useState } from "react";

import { fetchItems } from "../services/fetchItems";
import { ItemType } from "../types/interfaces";


function MenuPage()  {

    const url = 'localUrl';
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
        <div className="wrapper">
            <Header />
            <main className="main">
                <h1 className="main__title">Menu</h1>
                <span className="main__span"></span>
                <section className="main__menu-container">
                    { items.map((item) => {
                        return (
                            <article className="main__menu">
                                <img className="main__menu-image" src={item.image} alt="alt" />
                                <article className="main__menu-des">
                                    <h2 className="main__menu-title">{item.name}</h2>
                                    <button className="main__menu-btn">{item.price} kr</button>
                                </article>
                            </article>
                        )}
                    )}
                </section>
            </main>
            <Footer />
        </div>
    )
}  
export default MenuPage


/* 
    Författare: Najib
    en sida som visar en meny med alla items som finns i databasen
 */