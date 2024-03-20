import dynamic from 'next/dynamic';
import Footer from "@/sections/Footer";
// import Header from "@/sections/Header";
import OurStoryTemplate from "@/sections/OurStory";
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});
const OurStory = () => {
	return (
		<div className="mobile-wrapper">
			<Header />
			<OurStoryTemplate />
			<Footer />
		</div>
	);
};

export default OurStory;
