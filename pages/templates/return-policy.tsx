import dynamic from 'next/dynamic';
import Header from '~/sections/Header';
import Page from '~/templates/Page';
import Footer from '~/sections/Footer';
import Service from '~/sections/Service';
// import Cart from "~/components/cart/cart";
import { useEffect, useState } from 'react';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});

const ReturnPolicy = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

    let content = {
        title: 'Refund Policy',
        content: `<p class="mb-[1rem]"><strong> Money Back Guarantee</strong>. We believe in our Products and want you to have the best possible experience with Coco &amp; Eve so we offer a 30 day 100% money back guarantee (excluding shipping) if you are not happy with our Products. Once you have returned the Products to us (and your own cost within 30 days of purchase of the Products) we will process the refund. Please note this does not affect any legal rights you may have. For any Products that are damaged prior to you receiving them, we will pay the cost of returning these by post. We encourage you to use a trackable service as any lost returns cannot be reimbursed.</p>
        <p class="mb-[1rem]"><strong> Change of mind</strong>. If you are in the UK or EU you have a legal right to change your mind. Provided that you let us know within 14 days of receiving the Product and Products are returned to us unopened with seals intact within 14 days of you letting us know you have changed your mind. If these conditions are fulfilled, you are entitled to a refund of what you paid for the Products, including the standard delivery costs you paid when you purchased the Products. We only refund standard delivery costs. We don't refund any extra you have paid for express delivery or delivery at a particular time.</p>
        <p class="mb-[1rem]"><strong> Incorrect or Faulty Products</strong>. If you have received incorrect, damaged or faulty Products, please provide details (including photos) within 30 days of receiving the Products. We will verify whether you are entitled to a replacement of the Products and provide instructions accordingly.</p>
        <p class="mb-[1rem]"><strong> Refunds</strong>. If you wish to obtain a refund please contact our Customer Experience Specialist. Please ensure you include your order confirmation number in the subject line so we can find your order easily and we will advise you on the process including the address to use for the return. If you are returning the Products under our Money Back Guarantee or Change of Mind as set out above you need to return the Products at your own cost. You have to return the Products within 14 days of you contacting us regarding the return. If you believe you have received incorrect or faulty Products please let us know and provide proof of the damage/fault.</p>
        <p class="mb-[1rem]"><strong> Missing Items</strong>. We understand receiving your Products on time and in good condition is important to you; it’s equally important to us! We do absolutely everything possible to ship and deliver your order on time and in good condition. Please contact our Customer Experience Specialist so we can organise replacements for missing Products. Please include your order confirmation number in the subject line so we can find your order easily and process your request promptly.</p>
        <p class="mb-[1rem]"><strong> Fraud and Abuse</strong>. In the event we suspect any fraudulent claims in respect of refunds we have the right to withhold any refund until such time as you can prove that the refund claim is genuine. If we suspect our money back guarantee is being abused - for example multiple separate claims have been made in respect of the money back guarantee then we have the right to withhold any refund.</p>
        <p class="mb-[1rem]"><b>Except as set out in the policy above, shipping costs are the responsibility of the customer and are non-refundable. We recommend that you package the products appropriately and use a trackable, insured service as we cannot take responsibility for items damaged or lost in the return transit.</b></p>`,
    }

	useEffect(() => {
        setIsLoading(false);
    }, []);
    
    return (
		<>
			<Page
                isLoading={isLoading}
                content={content}
            />
			<Service />
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
			{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default ReturnPolicy;
