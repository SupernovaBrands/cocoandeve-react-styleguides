// import { useState } from 'react';
// import Header from '@/sections/Header';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});
const HeaderSection = () => {
    return (
        <>
            <Header />
            <img className="w-100" src="//via.placeholder.com/1920x1080/EFADBA" alt="Img Alt"></img>
        </>
    );
}

export default HeaderSection;
