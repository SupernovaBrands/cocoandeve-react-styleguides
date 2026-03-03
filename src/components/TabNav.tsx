import React, { useState } from 'react';

const TabNav = (props: any) => {
    const { active, title, onNavChange, className, ctaBgColor, ctaTextColor } = props;

    const activeBgClass = ctaBgColor ? 'nav--dark' : '';

    return (
        <button type="button" onClick={onNavChange} className={`${className ? className : 'text-base lg:text-lg'} block no-underline hover:no-underline text-body ${active ? `nav--active ${activeBgClass} font-bold hover:text-body` : 'hover:text-primary'}`}>{title}</button>
    )
}

export default TabNav;
