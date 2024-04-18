import dynamic from 'next/dynamic';
import Footer from "~/sections/Footer";
import OurStoryTemplate from '~/templates/OurStory';
import { annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, shopMenu, aboutMenu, helpMenu } from '~/modules/placeholders';
// import Header from "~/sections/Header";
// import OurStoryTemplate from "~/sections/OurStory";
const Header = dynamic(() => import('~/sections/Header'), {
    ssr: false,
});
const OurStory = () => {
	return (
		<>
			<Header 
				annBar={annBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				dummy={true} />
			<OurStoryTemplate />
			<Footer
				aboutMenu={aboutMenu}
				shopMenu={shopMenu}
				helpMenu={helpMenu} />
		</>
	);
};

export default OurStory;
