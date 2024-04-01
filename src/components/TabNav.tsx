import React, { useState } from 'react';

const TabNav = (props: any) => {
    const { active, title, onNavChange, className } = props;

    return (
        <a href="javascript:void(0)" onClick={onNavChange} className={`${className ? className : ''} text-base lg:text-lg text-body block no-underline hover:no-underline ${active && 'font-bold'}`}>{title}</a>
    )
}

export default TabNav;
