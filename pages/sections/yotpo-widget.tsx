import YotpoReviews from '@/components/yotpo-review-widget';

const ProductTemplate = () => {
    return (
        <div className="pt-4 pb-2 bg-gray-100">
        <div className="container">
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
        </div>
    </div>
);
}

export default ProductTemplate;
