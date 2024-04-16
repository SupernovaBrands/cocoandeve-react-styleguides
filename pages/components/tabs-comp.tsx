import React, { useState } from 'react';
import Tabs from '~/components/Tabs';
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';

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
						<TabContent active={activeTab === 'new'}>
							<h2>Content 1</h2>
						</TabContent>
						<TabContent active={activeTab === 'best-sellers'}>
							<h2 className='mb-1'>Why do we use it?</h2>
							<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
						</TabContent>
						<TabContent active={activeTab === 'value-sets'}>
							<h2>Content 3</h2>
						</TabContent>
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
			<div className='px-2'>
				<TabContent active={activeTab2 === 'all'}>All Content</TabContent>
				<TabContent active={activeTab2 === 'tan'}>Tan Content</TabContent>
				<TabContent active={activeTab2 === 'hair'}>
					<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
				</TabContent>
				<TabContent active={activeTab2 === 'skin'}>Skin Content</TabContent>
				<TabContent active={activeTab2 === 'body'}>Body Content</TabContent>
			</div>
		</div>
	);
}
