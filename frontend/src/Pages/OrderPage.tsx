import Footer from '../components/Footer';
import Header from '../components/Header';
import Info from '../components/Info';
import OrderStatus from '../components/OrderStatus';
import Overview from '../components/Overview';
import Payment from '../components/Payment';
import './styles/orderPage.css';

function OrderPage() {
    return (
        <div className='wrapper'>
            <Header />
            <Info />
            <Payment/>
            <Overview />
            <OrderStatus/>
            <Footer />
        </div>
    )
}

export default OrderPage

/**
 * Författare: Diliara
 * OrderPage med olika komponenter
 */