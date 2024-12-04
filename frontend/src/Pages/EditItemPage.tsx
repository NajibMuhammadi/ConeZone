import { useParams, useNavigate } from 'react-router-dom';
import { fetchItem } from '../services/fetchItem';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { ItemType, NewItem } from '../types/interfaces';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './styles/editItemPage.css';
import { updateItem } from '../services/updateItem';

function EditItemPage() {
    const navigate = useNavigate();
    const itemId = useParams();
    const sk = itemId.sk;
    const [item, setItem] = useState<ItemType | undefined>(undefined);
    const token = sessionStorage.getItem('token');
    const [edit, setEdit] = useState(false);
    const [newComponent, setNewComponent] = useState('')
    const [componentArray, setComponentArray] = useState<string[]>([])

    const [newItem, setNewItem] = useState<NewItem>({
        name: '',
        desc: '',
        price: 0,
        category: 'icecream',
        popular: false,
        image: '',
        components: []
    })

    useEffect(() => {
        if (token) {
            try {
                const decoded: { isAdmin: boolean } = jwtDecode(token);
                const isAdmin = decoded.isAdmin;
                console.log('isAdmin:', isAdmin);
                if (isAdmin) {
                    const loadItems = async () => {
                        try {
                            const fetchedItem = await fetchItem('itemsUrl', sk as string)
                            setItem(fetchedItem)
                            console.log(fetchedItem)
                        } catch (error) {
                            console.error(error)
                        }
                    }
                    loadItems()
                }
            } catch (err) {
                console.error('Error parsing token:', err);
            }
        }
    }, [sk, token])

    useEffect(() => {
        if (item) {
            setComponentArray(item.components)
            setNewItem({
                ...newItem,
                name: item.name,
                desc: item.desc,
                price: item.price,
                popular: item.popular,
                image: item.image,
                components: item.components
            })
        }
    }, [item])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewComponent(event.target.value)
    }

    const addComponent = (event: React.FormEvent) => {
        event.preventDefault();
        if (newComponent) {
            const updatedComponents = [...componentArray, newComponent];
            setComponentArray(updatedComponents);
            setNewItem((item) => ({
                ...item, components: updatedComponents
            }))
            setNewComponent('')
        }
    }

    const deleteComponent = (componentItem: string) => {
        console.log(componentItem)
        const updatedComponents = componentArray.filter(component => component !== componentItem);
        setComponentArray(updatedComponents)
        setNewItem((item) => ({
            ...item,
            components: updatedComponents
        }))
    }

    const changeItem = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('New items saved', newItem)
        await uploadItem(newItem)
        navigate('/editmenu');
    }

    const uploadItem = async (newItem: NewItem) => {
        if (token) {
            try {
                const decoded: { isAdmin: boolean } = jwtDecode(token);
                const isAdmin = decoded.isAdmin;
                console.log('isAdmin:', isAdmin);
                if (isAdmin) {
                    try {
                        updateItem('itemsUrl', sk as string, newItem)
                    } catch (error) {
                        console.error('Error updating item', error)
                    }
                }
            } catch (err) {
                console.error('Error parsing token:', err);
            }
        }
    }

    return (
        <>
            <Header />
            {item ? (
                !edit ? (
                    <section className="edit-item__wrapper">
                        <article className="edit-item">
                            <h2 className="edit-item__heading">Edit {item.name}</h2>
                            <hr className="edit-item__line" />
                            <button className="edit-item__edit" onClick={() => setEdit(true)}>
                                <img className='edit-item__edit-img' src="../../src/assets/edit.png" alt="Redigera" />
                            </button>
                            <section>
                                <img className="edit-item__img" src={item.image} />
                            </section>
                            <section className="edit-item__product">
                                <p className="edit-item__name"><span className="strong">Name</span>: {item.name}</p>
                                <p className="edit-item__desc"><span className="strong">Description</span>: {item.desc}</p>
                                <p className="edit-item__price"><span className="strong">Price</span>: {item.price} kr</p>
                                <p className="edit-item__popular"><span className="strong">Popular</span>: {item.popular ? 'Yes' : 'No'}</p>
                                <ul className="edit-item__components">
                                    <span className="strong">Ingridients:</span>
                                    {item.components.map((component, index) => (
                                        <li className="edit-item__component-item" key={index}>{component}</li>
                                    ))}
                                </ul>
                            </section>
                        </article>
                    </section>
                ) : (
                    <section className="edit-item__wrapper">
                        <article className="edit-item">
                            <h2 className="edit-item__heading">Edit {item.name}</h2>
                            <hr className="edit-item__line" />
                            <form className="edit-item__form">
                                <label className="edit-item__label"> Name:
                                    <input type="text"
                                        className="edit-item__input"
                                        value={item.name}
                                        onChange={(event) => setItem({ ...item, name: event.target.value })}
                                    />
                                </label>
                                <label className="edit-item__label"> Description:
                                    <textarea
                                        value={item.desc}
                                        className="edit-item__textarea"
                                        onChange={(event) => setItem({ ...item, desc: event.target.value })}
                                    />
                                </label>
                                <label className="edit-item__label"> Price:
                                    <input type="number"
                                        className="edit-item__input"
                                        value={item.price}
                                        onChange={(event) => setItem({ ...item, price: parseInt(event.target.value) })}
                                    />
                                </label>
                                <label className="edit-item__label"> Image Link:
                                    <input type="text"
                                        className="edit-item__input"
                                        value={item.image}
                                        onChange={(event) => setItem({ ...item, image: event.target.value })}
                                    />
                                </label>
                                <section className="form__popular">
                                    <p>Popular:</p>
                                    <label className="edit-item__label"> True
                                        <input type="radio"
                                            id="true"
                                            name="popular"
                                            value="true"
                                            checked={item.popular === true}
                                            onChange={() => setItem({ ...item, popular: true })}
                                        />
                                    </label>
                                    <label className="edit-item__label"> False
                                        <input type="radio"
                                            id="false"
                                            name="popular"
                                            value="false"
                                            checked={item.popular === false}
                                            onChange={() => setItem({ ...item, popular: false })}
                                        />
                                    </label>
                                </section>
                                <p className='edit-item__componentHeader'>Components</p>
                                <ul>
                                    {componentArray.map((component, index) => (
                                        <label className="edit-item__label">
                                            <li key={index}
                                                className="edit-item__component-item"
                                            >
                                                {component}
                                                <button
                                                    type="button"
                                                    className="edit-item__delete-btn"
                                                    onClick={() => {
                                                        console.log('clicked component:', component, 'index:', index)
                                                        deleteComponent(component)
                                                    }}
                                                >X</button>
                                            </li>
                                        </label>
                                    )
                                    )}
                                </ul>

                                <label className="edit-item__label">
                                    Add a new component:
                                    <input
                                        type="text"
                                        className="edit-item__input"
                                        value={newComponent}
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        onClick={addComponent}
                                        className="edit-item__component-btn"
                                    > Add new component</button>
                                </label>
                                <button className="edit-item__button" onClick={changeItem}>Save Changes</button>
                            </form>
                        </article>
                    </section>
                )
            ) : (
                <article className="edit-item__loading">
                    <h1>Loading...</h1>
                </article>
            )}
            <Footer />
        </>
    )
}

export default EditItemPage;

/**
 * Författare Ida
 * Har skapat en sida där admin kan editera items
 */

// Författare: Lisa
// Styling