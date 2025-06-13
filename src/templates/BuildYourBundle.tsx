import { useEffect, useRef, useState } from "react";
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';

const BuildYourBundle = (props: any) => {
    const [bundleSize, setBundleSize] = useState(2);
    const [activeTab, setActiveTab] = useState('hair');
    const [isStickyBar, setIsStickyBar] = useState(false);
    const [headerPos, setHeaderPos] = useState(0);
    const [region, setRegion] = useState('us');

    const cssInline = `
        header.main-header {
            box-shadow: none !important;
        }
        .top-header {
            top: ${headerPos}px;
        }
    `;

    console.log('client prop', props);

    useEffect(() => {
        setRegion(props.store);
    }, [region])
    
    return (
        <div>
            <style>{cssInline}</style>
            <figure className="flex flex-wrap relative">
                <picture>
					<source media="(min-width: 992px)" srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5fed3d6a-8abb-49d7-e18c-d5fef586d800/public" />
					<img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/30c9ade1-7c86-47bb-0203-80df6c521d00/828x" className="block w-full" />
				</picture>
                <figcaption className="container absolute top-0 left-0 right-0 text-center pt-[2rem]">
                    <span className="bg-black inline-block badge badge--sm py-[0.5em] leading-[1em] rounded text-white font-normal px-1">❤️ SAVE UP TO 20%</span>
                    <h1 className="text-center mt-[1rem] mb-[.5rem]">Build Your Own Bundle!</h1>
                    <p>Mix it. Match it. Make it yours. Customise your dream routine with Coco & Eve’s icons! <br className="hidden lg:block" />Pick your faves, stack the savings and curate it to perfection.</p>
                </figcaption>
            </figure>
            <div className={`top-header ${isStickyBar ? 'fixed left-0 right-0' : ''} bg-secondary-light py-g flex flex-col justify-center items-center choose-your-bundle`}>
                <p className="text-xl font-bold mb-[.5rem]">Choose your bundle size</p>
                <ul className="flex flex-wrap">
                    <li onClick={() => setBundleSize(2)} className={`text-base lg:text-lg rounded-full flex justify-center items-center bg-white mr-[1rem] ${bundleSize === 2 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`max-w-4 max-h-4 lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center px-2 py-1 cursor-pointer ${bundleSize === 2 ? 'bg-primary text-white rounded-full' : 'text-gray-600'}`}>2</span>
                        {bundleSize === 2 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save 10%</span>}
                    </li>
                    <li onClick={() => setBundleSize(4)} className={`text-base lg:text-lg rounded-full flex justify-center items-center bg-white mr-[1rem] ${bundleSize === 4 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`max-w-4 max-h-4 lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center px-2 py-1 cursor-pointer ${bundleSize === 4 ? 'bg-primary text-white rounded-full' : 'text-gray-600'}`}>4</span>
                        {bundleSize === 4 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save 15%</span>}
                    </li>
                    <li onClick={() => setBundleSize(6)} className={`text-base lg:text-lg rounded-full flex justify-center items-center bg-white mr-[1rem] ${bundleSize === 6 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`max-w-4 max-h-4 lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center px-2 py-1 cursor-pointer ${bundleSize === 6 ? 'bg-primary text-white rounded-full' : 'text-gray-600'}`}>6</span>
                        {bundleSize === 6 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save 18%</span>}
                    </li>
                    <li onClick={() => setBundleSize(8)} className={`text-base lg:text-lg rounded-full flex justify-center items-center bg-white ${bundleSize === 8 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`max-w-4 max-h-4 lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center px-2 py-1 cursor-pointer ${bundleSize === 8 ? 'bg-primary text-white rounded-full' : 'text-gray-600'}`}>8</span>
                        {bundleSize === 8 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save 20%</span>}
                    </li>
                </ul>
            </div>
            <div className="container py-3 lg:py-5">
                <p className="text-xl lg:text-2xl font-bold text-center mb-1 lg:mb-3">Choose your products</p>
                <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-wrap border-b-0 text-center pb-1 lg:pb-3 justify-center px-hg lg:px-0">
					<li><TabNav className={`${activeTab === 'hair' ? 'text-body' : ''}`} title='Hair' active={activeTab === 'hair'} onNavChange={() => setActiveTab('hair')} /></li>
					<li><TabNav className={`${activeTab === 'tan' ? 'text-body' : ''}`} title={`${region === 'ca' ? 'Tan' : 'Tan & SPF'}`} active={activeTab === 'tan'} onNavChange={() => setActiveTab('tan')} /></li>
				</ul>
                <TabContent active={activeTab === 'hair'}>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-[calc(75%-30px)] bg-primary">col1</div>
                        <div className="w-full lg:w-[calc(25%+30px)] bg-secondary">col2</div>
                    </div>
                </TabContent>
                <TabContent active={activeTab === 'tan'}>Tan Content</TabContent>
            </div>
        </div>
    );
};

export default BuildYourBundle;