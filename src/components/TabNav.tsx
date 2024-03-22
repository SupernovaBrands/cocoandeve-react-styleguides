import React, { useState } from 'react';

const TabNav = (props: any) => {
    const { active, title, onNavChange } = props;

    return (
        <li><a href="javascript:void(0)" onClick={onNavChange} className={`w-[7.5em] text-base lg:text-lg text-body block no-underline hover:no-underline ${active && 'font-bold'}`}>{title}</a></li>
    )
}

export default TabNav;