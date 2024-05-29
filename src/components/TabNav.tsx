import React, { useState } from 'react';

const TabNav = (props: any) => {
    const { active, title, onNavChange, className } = props;

    return (
        <button type="button" onClick={onNavChange} className={`${className ? className : 'text-base lg:text-lg'} block no-underline hover:no-underline text-body ${active ? 'font-bold hover:text-body' : 'hover:text-primary'}`}>{title}</button>
    )
}

export default TabNav;
