import {useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { ItemType } from '../types/interfaces';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/addItemPage.css'
import { postItem } from '../services/postItem';
import { useNavigate } from 'react-router-dom';


function AddItemPage() {
    const token = sessionStorage.getItem('token');
    const [newComponent, setNewComponent] = useState('')
    const [componentArray, setComponentArray] = useState<string[]>([])
    const navigate = useNavigate();
    const [item, setItem] = useState<ItemType>({
        pk: 'icecream',
        category: 'icecream',
        image: '',
        name: '',
        desc: '',
        popular: false,
        price: 0,
        components: []
    })
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewComponent(event.target.value)
    }
    const addComponent = (event : React.FormEvent  ) => {
        event.preventDefault();
        if(newComponent) {
            setComponentArray(items => [...items, newComponent])
            setItem((item) => ({
                ...item, components: [...item.components, newComponent]
            }))
            setNewComponent('')
        }
    } 

        const saveItem = async(event : React.FormEvent) => {
            event.preventDefault();
            console.log('save Item pressed:', item)
            if(token) {
                try {
                    const decoded: {isAdmin: boolean} = jwtDecode(token);
                    const isAdmin = decoded.isAdmin;
                    console.log('isAdmin:', isAdmin);  

                    if(isAdmin) {
                        try {
                            await postItem('itemsUrl', item)
                        } catch(error) {
                            console.error('Error adding item', error)
                        }
                    }
                    navigate('/editmenu')
                } catch (error) {
                    console.error('Error parsing token', error)
                }
            }
        }

    return (
        <>
            <Header />
                    <section className="add-item__wrapper">
                        <h2 className="add-item__heading">Add New Item</h2>
                        <hr className="add-item__line" />
                        <article className="add-item">
                            <form className="add-item__form">
                                <label className="add-item__label"> Name:
                                    <input type="text"
                                        className="add-item__input"
                                        onChange={(event) => setItem({ ...item, name: event.target.value })}
                                    />                               
                                </label>
                                <label className="add-item__label"> Description:
                                    <textarea
                                        className="add-item__textarea"
                                        onChange={(event) => setItem({ ...item, desc: event.target.value })}
                                    />
                                </label>
                                <label className="add-item__label"> Price:
                                    <input type="number"
                                        className="add-item__input"
                                        onChange={(event) => setItem({ ...item, price: parseInt(event.target.value)})}
                                    />                               
                                </label>
                                <label className="add-item__label"> Image Link:
                                    <input type="text"
                                        className="add-item__input"
                                        onChange={(event) => setItem({ ...item, image: event.target.value })}
                                    />
                                </label> 
                                <label className="add-item__label">Components
                                <ul>
                                    {componentArray.map((component, index) => (
                                        <li key={index}
                                            className="add-item__component-item"
                                        >
                                            {component}
                                        </li>
                                    ))}
                                </ul> 
                                </label>
                                <label className="add-item__label">
                                    Add a new component:
                                    <input
                                        type="text"
                                        className="add-item__input"
                                        value={newComponent}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={addComponent}
                                        className="add-item__component-btn"
                                    > Add new component</button>
                                </label>    
                                <section className="form__popular">
                                    <p>Popular:</p>
                                    <label className="add-item__label"> True:
                                        <input type="radio"
                                        id="true"
                                        name="popular"
                                        value="true"
                                        onChange={() => setItem({ ...item, popular: true })}
                                        />                               
                                    </label>    
                                    <label className="add-item__label"> False:
                                        <input type="radio"
                                        id="false"
                                        name="popular"
                                        value="false"
                                        checked
                                        onChange={() => setItem({ ...item, popular: false })}
                                        />                               
                                    </label>     
                                </section>    
                                <button className="add-item__button" onClick={saveItem}>Add Item</button>    
                            </form>
                        </article>
                    </section>
            <Footer />
        </>
    )
}

export default AddItemPage;

/**
 * Författare Ida
 * Har skapat en sida där admin kan lägga till nya produkter att sälja
 * Kontrollerar om användaren är admin innan nya föremål kan läggas till i databasen
 */