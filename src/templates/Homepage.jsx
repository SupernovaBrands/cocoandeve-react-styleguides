import Header from '@/sections/Header';
import Footer from '@/sections/Footer';
import HeroBanner from '@/sections/HeroBanner';
import ProductCarousel from '@/sections/ProductCarousel';
import Playground from '@/sections/Playground';
import Service from "@/sections/Service";
import Editors from '@/sections/Editors';
import RealResultCarousel from '@/sections/RealResultCarousel';
import Instagram from '@/sections/Instagram';

const Homepage = () => {
    return (
		<>
        	<Header />
            <HeroBanner />
            <ProductCarousel />
            <Playground />
			<Service />
            <Editors />
            <RealResultCarousel />
            <Instagram />
            <Footer />
		</>
    );
}

export default Homepage;