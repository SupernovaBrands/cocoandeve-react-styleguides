import dynamic from 'next/dynamic';
import { useState } from 'react';
import Sweepstakes from '~/templates/Sweepstakes';
import Footer from '~/sections/Footer';

const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});

const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});

const SweepstakesTemplate: React.FC = () => {
    const [showCart, setShowCart] = useState<boolean>(false);

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    return (
        <>
            <Header toggleCart={toggleCart} />
            <Sweepstakes />
            <Footer />
            {/* {showCart && <Cart />} */}
        </>
    );
};

export default SweepstakesTemplate;
