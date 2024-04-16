// import UpsellBlog from "~/compounds/upsell-blog";
// import UpsellPdp from "~/compounds/upsell-pdp";
import ProductRoutineCarousel from '~/sections/ProductRoutineCarousel';

const Upsell = () => {
	return (
		<div className="mobile-wrapper">
			<div className="container mt-4">
				<h1 className="mb-1">Upsell</h1>
				<h2 className="mt-4">PDP</h2>
			</div>
			<ProductRoutineCarousel />
		</div>
		// <div className="container mt-4">
		// 	<h1>Upsell</h1>
		//     <h2 className="mt-4 mb-1">Blog</h2>
        //     <div className="flex flex-wrap">
        //         <div className="w-full lg:w-1/3">
        //             <UpsellBlog title="That’s a wrap bundle" comparePrice="£XX.XX" price="£XX.XX" save="(Save 20%)" />
        //         </div>
		//     </div>
		// 	<h2 className="mt-4 mb-1">PDP</h2>
		// 	<div className="flex flex-wrap">
		// 		<div className="w-full lg:w-5/12">
		// 			<UpsellPdp className="mb-3" title="That’s A Wrap Bundle" content="Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer." comparePrice="£139.90" price="£129.90" />
		// 			<UpsellPdp className="mb-3" title="That’s A Wrap Bundle" content="Like A Virgin Coconut Hair Masque, Two-tiered Tangle Tamer." comparePrice="£139.90" price="£129.90" />
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default Upsell;