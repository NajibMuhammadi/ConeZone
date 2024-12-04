import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import ProductPage from "../pages/ProductPage";
import Register from "../pages/RegisterPage";
import OrderPage from "../pages/OrderPage";
import KitchenViewPage from "../pages/KitchenViewPage";
import UserPage from "../pages/UserPage";
import ChangeOrderPage from "../pages/ChangeOrderPage"
import EditMenuPage from "../pages/EditMenuPage";
import AllOrdersPage from "../pages/AllOrdersPage";
import EditItemPage from "../pages/EditItemPage";
import AddItemPage from "../pages/AddItemPage";
import SettingsPage from "../pages/SettingsPage";

function Routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/menu/:id" element={<ProductPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/kitchenview" element={<KitchenViewPage />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/order/:pk/:sk" element={<ChangeOrderPage />} />
                <Route path="/editmenu" element={<EditMenuPage />} />
                <Route path="/showorders" element={<AllOrdersPage />} />
                <Route path="/order/:sk" element={<ChangeOrderPage />} />
                <Route path="/item/:sk" element={<EditItemPage />} />
                <Route path="/add" element={<AddItemPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers;

/**
 * Författare Ida
 * Här skapas de olika routes upp som vi kommer använda för att navigera på sidan
 * 
 * Edited: Diliara
 * La till en route för ProductPage, OrderPage, UserPage, EditMenuPage och AllOrdersPage,
 * route för admin som ska kunna öppna alla ordrar, SettingsPage
 * 
 * Edited: Lisa
 * La till en route för ChangeOrderPage
 */