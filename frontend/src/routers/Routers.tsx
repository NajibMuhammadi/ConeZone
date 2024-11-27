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
import EditMenuPage from "../pages/EditMenuPage";
import AllOrdersPage from "../pages/AllOrdersPage";

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
                <Route path="/editmenu" element={<EditMenuPage />} />
                <Route path="/showorders" element={<AllOrdersPage />} />
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
 * La till en route för ProductPage, OrderPage, UserPage, EditMenuPage och AllOrdersPage
 */