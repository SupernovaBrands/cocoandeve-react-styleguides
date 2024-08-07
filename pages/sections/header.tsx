// import { useState } from 'react';
// import Header from '~/sections/Header';
import dynamic from 'next/dynamic';
import { timerBar, annBar, megaMenu, mainMenu, menuBannerCode, menuBannerQuiz, searchBox } from '~/modules/placeholders';
const Header = dynamic(() => import('~/sections/Header'), {
	ssr: false,
});
const HeaderSection = () => {
	return (
		<>
			<Header
				annBar={annBar}
				timerBar={timerBar}
				mainMenu={mainMenu}
				megaMenu={megaMenu}
				menuBannerQuiz={menuBannerQuiz}
				menuBannerCode={menuBannerCode}
				searchBox={searchBox}
				dummy={true}
			/>
			<img className="w-100" src="//via.placeholder.com/1920x1080/EFADBA" alt="Img Alt"></img>
		</>
	);
}

export default HeaderSection;
