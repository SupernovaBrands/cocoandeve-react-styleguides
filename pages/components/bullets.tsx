import React from 'react';
import Bullet from '~/components/Bullets';

interface BulletsProps {}

const Bullets: React.FC<BulletsProps> = () => {
    const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        console.log('clicked', e);
    };

    const primaryData = [
        {
            className: null,
            onClick: onClick,
        },
        {
            className: 'size-12 bg-primary opacity-50 rounded-full cursor-pointer mx-[3px] mb-1',
            onClick: onClick,
        },
        {
            className: 'size-12 bg-primary opacity-50 rounded-full cursor-pointer mx-[3px] mb-1',
            onClick: onClick,
        },
    ];

    const whiteData = [
        {
            className: 'size-12 bg-white rounded-full mx-[3px] mb-1',
            onClick: onClick,
        },
        {
            className: 'size-12 bg-white rounded-full opacity-50 mx-[3px] mb-1',
            onClick: onClick,
        },
        {
            className: 'size-12 bg-white rounded-full opacity-50 mx-[3px] mb-1',
            onClick: onClick,
        },
    ];

    return (
        <div className="container">
            <h1>CAROUSEL BULLETS</h1>
            <div className="relative mb-3">
                <Bullet data={primaryData}></Bullet>
            </div>

            <h1>CAROUSEL BULLETS WHITE</h1>
            <div className="relative mb-3 w-full py-2">
                <Bullet data={whiteData}></Bullet>
            </div>
        </div>
    );
};

export default Bullets;
