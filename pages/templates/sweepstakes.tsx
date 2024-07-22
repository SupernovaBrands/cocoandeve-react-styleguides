import dynamic from 'next/dynamic';
// import Header from '~/sections/Header';
import Sweepstakes from '~/templates/Sweepstakes';
import Footer from '~/sections/Footer';
// import Cart from "~/components/cart/cart";
import { useEffect, useState } from 'react';
import { annBar, timerBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';

const Cart = dynamic(() => import('~/components/cart/cart'), {
    ssr: false,
});
const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});
const sweepstakesTemplate = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [showCart, setShowCart] = useState(false);

	const content = {
		"desc": "",
		"submit": "Sign me up!",
		"heading": "360° Damage Repair for Healthy Hair",
		"smsbump": "7580145",
		"bg_color": "bg-suncare-blue",
		"desc_col": "text-body",
		"note_col": "text-body",
		"phone_en": true,
		"phone_ph": "Phone number",
		"position": "right",
		"foot_note": "Open worldwide 18+ years (excluding Canada and any other country where prohibited by law). Closes on 28 May 2024 at 09:00. Winner will be contacted by email on 4 June 2024. The giveaway is in no way sponsored, endorsed or administered by, or associated with, Instagram. See <a href=\"/pages/promotion-terms-and-conditions\" class=\"text-primary text-xs underline\">Entry page</a> for full T&Cs.",
		"social_en": false,
		"social_ph": "Type Instagram handle here",
		"tos_label": "By signing up, you agree to the competition T&Cs and our <a class='text-xs' href=\"/pages/privacy-policy\"><b>Privacy Policy</b></a> and to receive exclusive offers via email or recurring automated marketing messages. Message frequency varies. Opt out any time.",
		"subheading": "Cutting-edge hair repairing technology to transform your hair in just one wash! Join the waitlist to get your hands on our NEW Repairing & Restoring Shampoo & Conditioner + a surprise gift for 3 winners too!<br><br>\n<b>Launching on 28 May 2024</b>",
		"thank_desc": "Your entry has been registered! Head to Coco & Eve and do some shopping while you wait!",
		"heading_col": "text-body",
		"thank_title": "Thank you!",
		"subheading_col": "text-body",
		"sweepstakes_lg": {
			"alt": "SR shampoo conditioner pop up_Desktop (1).jpg",
			"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/d21cdc04-c11e-4f2a-9e83-c38a8d2bf100/public"
		},
		"sweepstakes_img": {
			"alt": "SR shampoo conditioner_PAGE_CA_MOB.jpg",
			"url": "https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/62217e1d-cd17-4a46-bce1-beea6906fe00/public"
		},
		"sweepstakes_popup_thank_shopnow": "Shop Coco & Eve",
		"sweepstakes_popup_thank_shopnow_url": "https://www.cocoandeve.com/collections"
	}

    const toggleCart = () => {
		setShowCart(!showCart);
	}

	useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
		<>
			<Header toggleCart={toggleCart}
				annBar={annBar}
				timerBar={timerBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true} />
			<Sweepstakes
				isLoading={isLoading}
				content={content}
			/>
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
			{/* <Cart showCart={showCart} toggleCart={toggleCart} /> */}
		</>
    );
}

export default sweepstakesTemplate;
