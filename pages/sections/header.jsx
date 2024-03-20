// import { useState } from 'react';
// import Header from '@/sections/Header';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('@/sections/Header'), {
    ssr: false,
});
const HeaderSection = () => {
    return (
        <Header />
    );
}

export default HeaderSection;
