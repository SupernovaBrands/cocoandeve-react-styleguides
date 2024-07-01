import React from 'react';

const TabContent = (props: any) => {
    const { active, children, className } = props;

    return (
        <div className={`[transition:opacity_0.15s_linear] ${active ? 'block' : 'hidden'} ${className ? className : ''}`}>{children}</div>
    )
}

export default TabContent;
