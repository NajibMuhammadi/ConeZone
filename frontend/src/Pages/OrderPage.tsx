import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Info from "../components/Info";
import Payment from "../components/Payment";
import Overview from "../components/Overview";
import OrderStatus from "../components/OrderStatus";
import "./styles/orderPage.css";
import { useLocation } from "react-router-dom";
function OrderPage() {
    //const sliderRef = useRef(null);
    const sliderRef = useRef<Slider | null>(null)
    const [orderSk, setOrderSk] = useState<string | null>(null)

    const location = useLocation();
    const slideIndex = location.state?.slideIndex || 0;
    const sk = location.state.sk ?? '';

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        adaptiveHeight: true,
        autoplay: false,
        fade: false,
        pauseOnHover: true,
        appendDots: (dots: React.ReactNode) => (
            <div>
                <ul className="custom-dots">{dots}</ul>
            </div>
        ),
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //             infinite: true,
        //             dots: true
        //         }
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //             initialSlide: 1
        //         }
        //     },
        //     {
        //         breakpoint: 480,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     }
        // ]
    };

    const handleNext = (sk?: string) => {
        if (sliderRef.current) {
            (sliderRef.current as Slider).slickNext();
        }

        if(sk) {
            setOrderSk(sk)
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            (sliderRef.current as Slider).slickGoTo(slideIndex),
            setOrderSk(sk)
        }
    }, [slideIndex])

    return (
        <div className="wrapper">
            <Header />
            <div className="slider-container">
                <Slider ref={sliderRef} {...settings}>
                    <Info onNext={handleNext} />
                    <Payment onNext={handleNext} />
                    <Overview onNext={handleNext} />
                    <OrderStatus sk={orderSk ?? ''}/>
                </Slider>
            </div>
            <Footer />
        </div>
    );
}

export default OrderPage;

/**
 * Författare: Diliara
 * OrderPage med olika komponenter
 * La till en slider för att kunna byta mellan olika komponenter
 * 
 * Buggfix: Ida
 * La till orderSK och om den har ett värde skickas den med annars skickas en tom sträng
 */