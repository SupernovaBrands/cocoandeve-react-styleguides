import dynamic from 'next/dynamic';
import { useState } from 'react';
import Header from '~/sections/Header';
import Stockist from '~/templates/Stockist';
import Footer from '~/sections/Footer';
import Instagram from '~/sections/Instagram';
import Service from '~/sections/Service';

const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});

const StockistTemplate: React.FC = () => {
    const [showCart, setShowCart] = useState<boolean>(false);

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    return (
        <>
            <Header toggleCart={toggleCart} />
            <Stockist />
            <Instagram className="bg-yellow-light" />
            <Service />
            <Footer />
            {/* {showCart && <Cart />} */}
        </>
    );
};

export default StockistTemplate;
