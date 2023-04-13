import Header from '@/sections/Header';
import Stockist from '@/templates/Stockist';
import Footer from '@/sections/Footer';
import Instagram from '@/sections/Instagram';
import Service from '@/sections/Service';

const stockistTemplate = () => {
    return (
		<>
        	<Header />
			<Stockist />
			<Instagram />
			<Service />
			<Footer />
		</>
    );
}

export default stockistTemplate;