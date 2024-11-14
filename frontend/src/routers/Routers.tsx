import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import MenuPage from "../pages/MenuPage";
import CartPage from "../pages/CartPage";
import ProductPage from "../pages/ProductPage";


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
 * La till en route för ProductPage
 */