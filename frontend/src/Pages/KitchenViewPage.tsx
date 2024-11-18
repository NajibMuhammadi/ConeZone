import './styles/kitchenViewPage.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function kitchenViewPage() {
    return (
        <>
            <Header />
            <section className='kitchenViewPage__wrapper'>
                <section className='kitchenViewPage__container'>
                    <h2 className='kitchenViewPage__header'>Kitchen View</h2>
                    <section>
                        <section className='kitchenViewPage__incomingContainer'>
                            <h3 className='kitchenViewPage__header'>INCOMING</h3>

                        </section>
                        <section className='kitchenViewPage__OngoingContainer'></section>
                        <h3 className='kitchenViewPage__header'>ONGOING</h3>

                        <section className='kitchenViewPage__DoneContainer'></section>
                        <h3 className='kitchenViewPage__header'>DONE</h3>

                    </section>
                </section >
            </section >
            <Footer />
        </>
    )
}

export default kitchenViewPage
