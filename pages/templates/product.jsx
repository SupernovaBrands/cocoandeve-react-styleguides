import dynamic from 'next/dynamic';
import { Container } from 'react-bootstrap';
// import Header from '@/sections/Header';
import Product from '@/templates/Product';
import PDPBanner from "@/compounds/ProductBanner";
import PDPUpsell from "@/sections/pdp-upsell-2";
import RealResultCarousel from "@/sections/RealResultCarousel";
import Sustainability from '@/sections/Sustainability';
import PdpBannerTanDifferent from '@/sections/pdp-banner-tan-different';
import PdpBannerService from '@/sections/pdp-banner-service';
import YotpoReviews from '@/components/yotpo-review-widget';
import Footer from '@/sections/Footer';
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});
const ProductTemplate = () => {
	const SLIDE_VIDEOS = [
		{
			id: 1,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/80ace9f8f186492bbe4b1fa00dca349a.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 2,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/949ea964f27e4bcc982b596cca694036.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 3,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/1a172216adc3439d8b10c43574075247.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 4,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/57c3e426e86a4d499e50a0cfe8da171f.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 5,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/80ace9f8f186492bbe4b1fa00dca349a.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
		{
			id: 6,
			videoUrl: 'https://cdn.shopify.com/videos/c/o/v/949ea964f27e4bcc982b596cca694036.mp4',
			product: 'Sunny Honey Bali Bronzing Foam',
			author: 'Meredith Langosh',
			url: '/'
		},
	];
    return (
		<>
        	<Header />
            <Product />
			<PDPUpsell />
			<PDPBanner
                background="bg-yellow-light"
                src="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_828x.jpg?v=1585822408"
                srcset="https://cdn.shopify.com/s/files/1/0075/2163/2309/files/Rectangle_2x_5d1af986-b009-4369-b374-0d6a620bf81d_1440x.jpg?v=1585822408">
                <h2 className="h1 mb-2 mb-lg-4">Which Sunny Honey shade is right for me?</h2>
                <h4 className="fw-normal mb-2 mb-lg-4"><b>Medium</b><br /> Gives skin a subtle glow. Great for lighter skin tones!</h4>
                <h4 className="fw-normal mb-2 mb-lg-4"><b>Dark</b><br /> For a back from vacay bronze. Ideal for medium skin tones!</h4>
                <h4 className="fw-normal mb-0"><b>Ultra Dark</b><br /> A deep, rich tan. For deeper skin tones!</h4>
            </PDPBanner>
			<RealResultCarousel videos={SLIDE_VIDEOS} />
			<Sustainability />
			<div className="pt-4 pb-2 bg-light">
				<Container>
					<div className="row">
						<h2 className="h1 mb-2 col-12 text-center">Customer Reviews</h2>
						<YotpoReviews
							productId={4543113265187}
							productName='Sunny Honey Bali Bronzing Foam'
							productUrl='https://dev.cocoandeve.com/products/sunny-honey-bali-bronzing-self-tan-mousse'
							productImage='//cdn.shopify.com/s/files/1/0286/1327/9779/products/FOAM_DARK_YELLOW_1_large.jpg%3Fv=1609922006'
							productDesc='<div> <strong></strong>Anti-cellulite, anti-ageing self tan with zero nasties. Created using unique CellushapeTM formula to hydrate and firm the skin.<br> </div> <ul> <li>Blurs Pigmentation and Perfects Skin.</li> <li>Tropical Mango and Guava Scent. (No biscuit smells!)</li> <li>Lightweight, non-sticky formula.</li> <li>Fast drying and develops in just 2 hours</li> <li>Vegan. 100% Natural DHA. No Nasties</li> </ul>'
							productSkus='CE0000032020,CE0000032040,CE0000032060,CE0000072020,CE0000072040,CE0000072060'
							canCreate={true}
						/>
					</div>
				</Container>
			</div>
			<PdpBannerTanDifferent />
			<PdpBannerService />
			<Footer />
		</>
    );
}

export default ProductTemplate;
