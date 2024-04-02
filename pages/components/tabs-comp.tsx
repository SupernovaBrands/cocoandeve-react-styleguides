import React, { useState } from 'react';
import Tabs from '@/components/Tabs';
import TabNav from '@/components/TabNav';
import TabContent from '@/components/TabContent';

export default function TabsComponents() {
	const [activeTab, setActiveTab] = useState('best-sellers');
	const [activeTab2, setActiveTab2] = useState('tan');
	const [tabNames, setTabNames] = useState(['Hair', 'Tan & SPF', 'Skin', 'Body']);

	const changeTab = (e) => {
        setActiveTab2(e.target.dataset.target);
	};

	const changeDrop = (e) => {
        setActiveTab2(e.target.options[e.target.selectedIndex].value);
	};

	return (
		<div className="container mt-4">
			<h1 className='text-center mb-0 lg:mb-1'>Tabs Product</h1>
			<div className="flex flex-wrap items-center">
				<div className='w-full'>
					<ul className="list-style-none mx-auto flex flex-wrap border-b-0 text-center pb-4 pb-lg-2 justify-center">
						<li><TabNav className="py-[6px] w-[7.5em] px-g text-base lg:text-lg" title='New' active={activeTab === 'new'} onNavChange={() => setActiveTab('new')} /></li>
						<li><TabNav className="py-[6px] w-[7.5em] px-g text-base lg:text-lg" title='Bestsellers' active={activeTab === 'best-sellers'} onNavChange={() => setActiveTab('best-sellers')} /></li>
						<li><TabNav className="py-[6px] w-[7.5em] px-g text-base lg:text-lg" title='Value Sets' active={activeTab === 'value-sets'} onNavChange={() => setActiveTab('value-sets')} /></li>
					</ul>
					<div className='px-2'>
						<TabContent active={activeTab === 'new'}><p></p></TabContent>
						<TabContent active={activeTab === 'best-sellers'}><p></p></TabContent>
						<TabContent active={activeTab === 'value-sets'}><p></p></TabContent>
					</div>
				</div>
			</div>

			<div className="my-3 flex flex-wrap  items-center justify-center">
				<h1 className='text-center mb-2 lg:mb-4 block w-full'>Real Customers. Real Reviews</h1>
				<label htmlFor="real-result__select" className="h4 font-weight-normal mr-3 mb-0">Filter By:</label>
				<select id="real-result__select" className="custom-select rounded-lg bg-white w-2/5 lg:hidden" aria-labelledby="real-result__select" onChange={changeDrop}>
					<option value="all" selected={true}>All</option>
					{tabNames.length > 0 && tabNames.map((tab) => {
						let tabtitleID = tab.toLowerCase().replace(/ /g, '-').replace('autobronzants', 'tan').replace('corps', 'body')
							.replace('tan-&-spf', 'tan')
							.replace('cheveux', 'hair')
							.replace('tan-spf', 'tan');
						return <option value={tabtitleID}>{tab}</option>;
					})}
				</select>
				<ul id="real-result__main-tab" className="flex-wrap list-none pl-0 mb-0 text-center hidden lg:flex" role="tablist">
					<li className="nav-item" role="presentation">
						<a onClick={changeTab} className={`block no-underline hover:no-underline text-lg mb-0 border p-0 leading-[2.3] w-[5.625em] rounded-tl-[6px] rounded-br-[0] rounded-tr-[0] rounded-bl-[6px] border-body ${activeTab2 === 'all' ? ' bg-primary text-white hover:text-white' : 'bg-white text-body'} `} data-toggle="tab" href="#all" role="tab" data-target="all">All</a>
					</li>
					{tabNames.length > 0 && tabNames.map((tab) => {
						let tabtitleID = tab.toLowerCase().replace(/ /g, '-').replace('autobronzants', 'tan').replace('corps', 'body')
							.replace('tan-&-spf', 'tan')
							.replace('cheveux', 'hair')
							.replace('tan-spf', 'tan');
						
						return (
							<li className="nav-item" role="presentation">
								<a onClick={changeTab} className={`block no-underline hover:no-underline text-lg mb-0 border border-l-0 p-0 leading-[2.3] w-[5.625em] border-body ${tabtitleID === 'body' ? 'rounded-bl-[0] rounded-tl-[0] rounded-br-[6px] rounded-tr-[6px]' : ''} ${activeTab2 === tabtitleID ? ' bg-primary text-white hover:text-white' : 'bg-white text-body'} ${tab === 'Tan & SPF' && 'px-3 w-auto'}`} data-toggle="tab" href={`#${tabtitleID}`} data-target={`${tabtitleID}`} role="tab">{tab}</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
