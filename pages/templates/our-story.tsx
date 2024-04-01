import dynamic from 'next/dynamic';
import Footer from "@/sections/Footer";
import OurStoryTemplate from '@/templates/OurStory';
// import Header from "@/sections/Header";
// import OurStoryTemplate from "@/sections/OurStory";
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});
const OurStory = () => {
	return (
		<>
			<Header />
			<OurStoryTemplate />
			<Footer />
		</>
	);
};

export default OurStory;
