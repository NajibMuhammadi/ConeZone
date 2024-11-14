import './styles/overview.css';

function Overview() {
    return (
        <>
            <section className="overview__wrapper">
                <article className="overview">
                    <h2 className="overview__heading">Overview</h2>
                    <hr className="overview__line" />
                    <section className="overview__customer-info">
                        <section className="overview__customer-container-top">
                            <h2 className="overview__customer">
                                Customer
                            </h2>
                            <img src="../../src/assets/edit.png" alt="" className="overview__edit" />
                        </section>
                        <section className="overview__customer-container-bottom">
                            <p className="overview__name"><strong>Name:</strong> Ice cream lover</p>
                            <p className="overview__phone"><strong>Phone number:</strong> 123456789</p>
                            <p className="overview__email"><strong>Email:</strong> icecreamlover@gmail.com</p>
                        </section>
                    </section>
                    <hr className="overview__line" />
                    <section className="overview__product">
                        <img src="../../src/assets/ice cream.jpg" alt="" className="overview__img" />
                        <section className="overview__info-wrapper">
                            <section className="overview__info">
                                <h3 className="overview__name">Product:</h3>
                                <p className="overview__quantity">Quantity:</p>
                                <p className="overview__price">Price:</p>
                            </section>
                            <section className="overview__info-details">
                                <h4 className="overview__name">Strawberrylicious</h4>
                                <div className="overview__item-quantity">
                                    <button className="overview__item-decrease">-</button>
                                    <span className="overview__item-quantity-value">2</span>
                                    <button className="overview__item-increase">+</button>
                                </div>
                                <p className="overview__price-details">50 sek</p>
                            </section>
                        </section>
                    </section>
                    <hr className="overview__line" />
                    <section className="overview__payment">
                        <p className="overview__method">Chosen Payment Method:</p>
                        {/* <p className="overview__method-details">Swish</p> */}
                        <img src="../../src/assets/swish.png" alt="" className="overview__method-img" />
                    </section>
                    <hr className="overview__line" />
                    <section className="overview__total">
                        <p className="overview__total-price">Total: <strong>100 sek</strong></p>
                        <button className="overview__submit">Send Order</button>
                    </section>
                </article>
            </section>
        </>
    )
}

export default Overview

/*
/* Författare: Diliara
/* Overview component som visar kundinformation, 
produktinformation, vald betalningsmetod och totalpris, läsas in på OrderPage
*/