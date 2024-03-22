import React, { useState } from 'react';
import TabNav from '@/components/TabNav';
import TabContent from '@/components/TabContent';

const Tabs = (props: any) => {
    const [activeTab, setActiveTab] = useState('best-sellers');

    return (
        <>
            <ul className="list-style-none mx-auto flex flex-wrap border-b-0 text-center pb-4 pb-lg-2 justify-center">
                <li><TabNav title='New' active={activeTab === 'new'} onNavChange={() => setActiveTab('new')} /></li>
                <li><TabNav title='Bestsellers' active={activeTab === 'best-sellers'} onNavChange={() => setActiveTab('best-sellers')} /></li>
                <li><TabNav title='Value Sets' active={activeTab === 'value-sets'} onNavChange={() => setActiveTab('value-sets')} /></li>
            </ul>
            <div className='container px-2'>
                <TabContent active={activeTab === 'new'}><p>Content 1</p></TabContent>
                <TabContent active={activeTab === 'best-sellers'}><p>Content 2</p></TabContent>
                <TabContent active={activeTab === 'value-sets'}><p>Content 3</p></TabContent>
            </div>
        </>
    )
}

export default Tabs;