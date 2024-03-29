import dynamic from 'next/dynamic';
import { useState } from 'react';
// import Header from '@/sections/Header';
import Article from '@/templates/Article';
import Footer from '@/sections/Footer';
import Twitter from '@/images/icons/twitter-square.svg';
import Facebook from '@/images/icons/facebook-square.svg';
import Pinterest from '@/images/icons/pinterest-square.svg';
import Documents from '@/images/icons/documents.svg';
// import Cart from "@/components/cart/cart";
const Cart = dynamic(() => import('@/components/cart/cart'), {
    ssr: false,
});
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});

const ArticleTemplate = () => {
	const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
		setShowCart(!showCart);
	}

    return (
		<>

			<Header toggleCart={toggleCart} />
			<Article
				title="The 5 Rules of Hair Masking"
				quickLinks={false}
				srcSet="https://via.placeholder.com/1540x800.jpg/EFADBA"
				src="https://via.placeholder.com/828x492.jpg/EFADBA"
			>
				<div className="text-center mb-3 mx-3 mb-lg-4 h4">Super popular in recent years, and a lifesaver for stressed tresses during lockdown(!), hair masking is everyone’s favourite #selfcaresunday ritual.</div>
				<h3 className="mb-1" id="link-1">1. Do it often, but not too often</h3>
				<p className="mb-3">Hair masking once or twice a week? Good. Masking every day? Not so good. When it comes to how often – and how much – you apply, more is not always more. This is why we recommend the following frequency when using our Like A Virgin Hair Masque: 2-3 times a week for dry hair, 1-2 times weekly for normal hair, and once a week for oily hair.</p>
				<p className="mb-3">Why can’t you use a masque more often? Well, not only can too much masking for your hair type weigh your locks down and lead to build up, it just isn’t necessary. Once your hair is nourished and hydrated enough, it won’t gain any additional benefit from another masque session. In other words? You’re basically washing product (and money) down the drain as your hair can’t absorb any more of the good stuff.</p>
				<h3 className="mb-1" id="link-2">2. Start with a clean base</h3>
				<p className="mb-3">While your hair’s natural oils are a wonderful thing, helping to keep your scalp healthy and hair strong, supple and shiny, you only want to apply a masque on freshly washed hair. The same principle applies here as with skincare – you need to thoroughly cleanse your skin or hair for the products you apply to absorb properly and work their magic.</p>
				<p className="mb-3">For the best results and to avoid any unwanted greasiness or weight, you should therefore always shampoo your hair before masking. You can skip the conditioning step, though, as most hair masques act as a deep conditioner and treatment in one. Ours does!</p>
				<picture className="d-flex mt-3 mb-3">
					<source srcSet="https://via.placeholder.com/1540x800.jpg/EFADBA" media="(min-width: 992px)" />
					<img className="w-100" src="https://via.placeholder.com/690x430.jpg/EFADBA" />
				</picture>
				<h3 className="mb-1" id="link-3">3. Steer clear of your roots</h3>
				<p className="mb-3">If you think hair masques aren’t for oily hair, think again. All hair types can benefit from the use of masques, from thick and frizzy, to fine and oily-prone. However, you do need to be careful with application – especially if your hair is on the greasier end of the spectrum.</p>
				<p className="mb-3">Hair masques are generally formulated for intense nourishment and repair, and are therefore most beneficial to your mid-lengths and, especially, your dry, brittle ends! As the hair at your roots is closer to its virgin state, it doesn’t require as intensive a treatment.</p>
				<p className="mb-3">Even if your hair is coarse and dry? It’s a good idea to avoid applying a masque to the roots if you want to maintain volume and movement. This becomes even more crucial if your locks are ultra-fine!</p>
				<div className="container blog-post-grid__newsletter px-0">
					<div className="w-100 row bg-pink-light mb-2 mx-0 rounded-lg">
						<picture className="col-lg-4 col-12 p-0">
							<source srcSet="https://via.placeholder.com/270x250.jpg/F9F9F9?text=variant-half-image" media="(min-width: 992px)" />
							<img src="https://via.placeholder.com/345x120.jpg/F9F9F9?text=variant-half-image" className="w-100" />
						</picture>
						<div className="col-lg-8 col-12 p-2 pe-lg-4">
							<h2>Join the club & get 15% OFF*!</h2>
							<p>Get 15% OFF* your first order, plus first access to new product launches, exclusive offers, expert tips and routines.</p>
							<form className="">
								<div className="input-group mb-2">
									<input type="text" className="form-control bg-white border-0" placeholder="Enter your email" aria-label="Enter your email" />
									<div className="d-flex input-group-append">
										<button className="btn btn-primary border-top-left-radius-0 border-bottom-left-radius-0" type="button">Subscribe</button>
									</div>
								</div>
							</form>
							<div className="blog-post-grid__newsletter--submitted d-none form-group mb-g text-left align-items-center">
								<button type="button" className="btn btn-primary btn-lg rounded-lg d-block d-lg-inline-block mb-0 btn--copy">
									WELCOME
									<Documents className="ml-25" />
								</button>
							</div>
							<p className="font-size-sm mb-0 text-gray-600">Receive exclusive offers via email/SMS, for more information see our <a href="" className="text-gray-600 text-underline">Privacy Policy</a>. *Excludes travel size items and accessories.</p>
						</div>
					</div>
				</div>

				<h3 className="mb-1" id="link-4">4. Apply your hair masque evenly</h3>
				<p className="mb-3">When using a hair masque, you want to make sure you coat every single strand to get uniform results. To do this, apply a generous amount of our Like A Virgin Hair Masque to the hair, then comb through your mid-lengths to ends with a wide-tooth comb. Or, for extra easy detangling, full coverage and zero breakage, try our Coco & Eve Tangle Tamer.</p>
				<h3 className="mb-1" id="link-5">5. Give it time to do its thing</h3>
				<p className="mb-3">A hair masque is not the same as shampoo or conditioner – it needs a bit more time to penetrate the strands and repair from the inside out. So, for silky soft results, apply your hair masque to towel dried hair and leave on for a minimum of 5 to 10 minutes before rinsing. Leave it longer if you have time on your hands.</p>
				<p className="mb-3">Got thirsty hair in dire need of some serious TLC? You can also apply our nourishing fig and coconut masque to dry hair and let it soak in for at least 20 mins. Or for butter-soft results, pop on a shower cap, silk scarf or our super-cute, static-free Microfibre Hair Towel Wrap and sleep in your hair masque overnight!</p>
				<a href="/" className="text-center d-block fw-bold">Shop Hair</a>
				<a href="/" className="text-center d-block mt-1 mb-2">
					<picture className="mt-2 mb-1">
						<source srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/EDM-banner_480x480_fcfb8daa-c532-4e16-bb93-d1233fbb3549.jpg" media="(min-width: 992px)" />
						<img src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/EDM-banner_480x480_fcfb8daa-c532-4e16-bb93-d1233fbb3549.jpg" className="embed-responsive-item fit--cover article__content__banner" loading="lazy" />
					</picture>
				</a>
				<time className="mb-1">23 April, 2020</time>
				<ul className="list-inline mb-4 mt-1 social-icon">
					<li className="list-inline-item">
						<a href="#" className="text-decoration-none text-primary social-icon">
							<Twitter className="svg fill-primary" />
						</a>
					</li>
					<li className="list-inline-item">
						<a href="#" className="text-decoration-none text-primary social-icon">
							<Facebook className="svg fill-primary" />
						</a>
					</li>
					<li className="list-inline-item">
						<a href="#" className="text-decoration-none text-primary social-icon">
							<Pinterest className="svg fill-primary" />
						</a>
					</li>
				</ul>
			</Article>
			<Cart showCart={showCart} toggleCart={toggleCart} />
			<Footer />
		</>
    );
}

export default ArticleTemplate;
