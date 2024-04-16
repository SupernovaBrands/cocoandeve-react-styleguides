'use client';
import React, { useState } from 'react';
import Tabs from '~/components/Tabs';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';

export default function TabsComponents() {
    const [activeTab, setActiveTab] = useState('best-sellers');
    const [activeTab2, setActiveTab2] = useState('tan');

	return (
		<div className="container mt-4">
            <h1 className='text-center'>Tabs Product</h1>
			<div className="row">
                <div>
                    <ul className="list-style-none mx-auto flex flex-wrap border-b-0 text-center pb-4 pb-lg-2 justify-center">
                        <li><TabNav className="w-[7.5em]" title='New' active={activeTab === 'new'} onNavChange={() => setActiveTab('new')} /></li>
                        <li><TabNav className="w-[7.5em]" title='Bestsellers' active={activeTab === 'best-sellers'} onNavChange={() => setActiveTab('best-sellers')} /></li>
                        <li><TabNav className="w-[7.5em]" title='Value Sets' active={activeTab === 'value-sets'} onNavChange={() => setActiveTab('value-sets')} /></li>
                    </ul>
                    <div className='px-2'>
                        <TabContent active={activeTab === 'new'}><p>Content 1</p></TabContent>
                        <TabContent active={activeTab === 'best-sellers'}><p>Content 2</p></TabContent>
                        <TabContent active={activeTab === 'value-sets'}><p>Content 3</p></TabContent>
                    </div>
                </div>
			</div>

            <h1 className='text-center'>Tabs Result</h1>
            <div className="row">
                <div>
                    <ul className="list-style-none mx-auto flex flex-wrap border-b-0 text-center pb-4 pb-lg-2 justify-center">
                        <li><TabNav className="w-[7.5em]" title='Tan' active={activeTab2 === 'tan'} onNavChange={() => setActiveTab2('tan')} /></li>
                        <li><TabNav className="w-[7.5em]" title='Hair' active={activeTab2 === 'hair'} onNavChange={() => setActiveTab2('hair')} /></li>
                        <li><TabNav className="w-[7.5em]" title='Body' active={activeTab2 === 'body'} onNavChange={() => setActiveTab2('body')} /></li>
                        <li><TabNav className="w-[7.5em]" title='All' active={activeTab2 === 'all'} onNavChange={() => setActiveTab2('all')} /></li>
                    </ul>
                    <div className='px-2'>
                        <TabContent active={activeTab2 === 'tan'}><p>Tan</p></TabContent>
                        <TabContent active={activeTab2 === 'hair'}><p>Hair</p></TabContent>
                        <TabContent active={activeTab2 === 'body'}><p>Body</p></TabContent>
                        <TabContent active={activeTab2 === 'All'}><p>All</p></TabContent>
                    </div>
                </div>
			</div>
		</div>
	);
}
