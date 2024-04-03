import React from 'react';
import Bullet from '@/components/Bullets';

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
            className: 'size-12 bg-primary-light rounded-full mr-25 cursor-pointer',
            onClick: onClick,
        },
        {
            className: 'size-12 bg-primary-light rounded-full mr-25 cursor-pointer',
            onClick: onClick,
        },
    ];

    const whiteData = [
        {
            className: 'size-12 bg-white rounded-full mr-25',
            onClick: onClick,
        },
        {
            className: 'size-12 bg-white rounded-full mr-25 opacity-50',
            onClick: onClick,
        },
        {
            className: 'size-12 bg-white rounded-full opacity-50',
            onClick: onClick,
        },
    ];

    return (
        <div className="container">
            <h1>CAROUSEL BULLETS</h1>
            <div className="position-relative mb-3">
                <Bullet data={primaryData}></Bullet>
            </div>

            <h1>CAROUSEL BULLETS WHITE</h1>
            <div className="position-relative mb-3 bg-primary w-100 py-2">
                <Bullet data={whiteData}></Bullet>
            </div>
        </div>
    );
};

export default Bullets;
