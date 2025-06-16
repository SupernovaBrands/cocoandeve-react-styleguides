import { useEffect, useRef, useState } from "react";
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import YourBundleSidebar from "~/compounds/YourBundleSidebar";
import BundleCard from "~/compounds/BundleCard";

const BuildYourBundle = (props: any) => {
    const [bundleSize, setBundleSize] = useState(2);
    const [bundleDiscount, setBundleDiscount] = useState(15);
    const [activeTab, setActiveTab] = useState('hair');
    const [isStickyBar, setIsStickyBar] = useState(false);
    const [headerPos, setHeaderPos] = useState(0);
    const [region, setRegion] = useState(props.store);

    const [tanSelected, setTanSelected] = useState([]);
    const [hairSelected, setHairSelected] = useState([]);

    const cssInline = `
        header.main-header {
            box-shadow: none !important;
        }
        .top-header {
            top: ${headerPos}px;
        }
    `;

    useEffect(() => {
        setRegion(props.store);
    }, [region]);

    useEffect(() => {
        if (bundleSize === 2) setBundleDiscount(10);
        else if (bundleSize === 3) setBundleDiscount(15);
        else if (bundleSize === 4) setBundleDiscount(18);
        else if (bundleSize >= 5) setBundleDiscount(20);
    }, [bundleSize]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }, [hairSelected]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }, [tanSelected]);
    
    return (
        <div>
            <style>{cssInline}</style>
            <figure className="flex flex-wrap relative">
                <picture>
					<source media="(min-width: 992px)" srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5fed3d6a-8abb-49d7-e18c-d5fef586d800/public" />
					<img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/30c9ade1-7c86-47bb-0203-80df6c521d00/828x" className="block w-full" loading="lazy" />
				</picture>
                <figcaption className="container absolute top-0 left-0 right-0 text-center pt-[2rem]">
                    <span className="bg-black inline-block badge badge--sm pt-[6px] pb-[.25rem] leading-[18px] rounded text-white text-sm font-normal px-[.75rem]">❤️ SAVE UP TO 20%</span>
                    <h1 className="text-center mt-[1rem] mb-[.5rem]">Build Your Own Bundle!</h1>
                    <p>Mix it. Match it. Make it yours. Customise your dream routine with Coco & Eve’s icons! <br className="hidden lg:block" />Pick your faves, stack the savings and curate it to perfection.</p>
                </figcaption>
            </figure>
            <div className={`top-header ${isStickyBar ? 'fixed left-0 right-0' : ''} bg-secondary-light py-g flex flex-col justify-center items-center choose-your-bundle`}>
                <p className="text-xl font-bold mb-[.5rem]">Choose your bundle size</p>
                <ul className="flex flex-wrap">
                    <li onClick={() => setBundleSize(2)} className={`text-base lg:text-lg rounded-full flex justify-center items-center bg-white mr-[1rem] ${bundleSize === 2 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`max-w-4 max-h-4 lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center px-2 py-1 cursor-pointer ${bundleSize === 2 ? 'bg-primary text-white rounded-full' : 'text-gray-600'}`}>2</span>
                        {bundleSize === 2 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save {bundleDiscount}%</span>}
                    </li>
                    <li onClick={() => setBundleSize(3)} className={`text-base lg:text-lg rounded-full flex justify-center items-center bg-white mr-[1rem] ${bundleSize === 3 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`max-w-4 max-h-4 lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center px-2 py-1 cursor-pointer ${bundleSize === 3 ? 'bg-primary text-white rounded-full' : 'text-gray-600'}`}>3</span>
                        {bundleSize === 3 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save {bundleDiscount}%</span>}
                    </li>
                    <li onClick={() => setBundleSize(4)} className={`text-base lg:text-lg rounded-full flex justify-center items-center bg-white mr-[1rem] ${bundleSize === 4 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`max-w-4 max-h-4 lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center px-2 py-1 cursor-pointer ${bundleSize === 4 ? 'bg-primary text-white rounded-full' : 'text-gray-600'}`}>4</span>
                        {bundleSize === 4 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save {bundleDiscount}%</span>}
                    </li>
                    <li onClick={() => setBundleSize(5)} className={`text-base lg:text-lg rounded-full flex justify-center items-center bg-white ${bundleSize === 5 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`max-w-4 max-h-4 lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center px-2 py-1 cursor-pointer ${bundleSize === 5 ? 'bg-primary text-white rounded-full' : 'text-gray-600'}`}>5</span>
                        {bundleSize === 5 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save {bundleDiscount}</span>}
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
                        <div className="w-full lg:w-[calc(75%-30px)]">
                            <div className="flex flex-wrap lg:-mx-g">
                                {props.hairData.map((item, index) => 
                                    <BundleCard
                                        key={`build-your-bundle--hair--${index}`}
                                        product={item}
                                        className="relative mb-1 lg:mb-[1rem] flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-[.5rem] lg:pl-[.5rem] text-center"
                                        button={true}
                                        setWaitlistData={() => {}}
                                        addToCart={null}
                                        trackEvent={null}
                                        eventNameOnClick='collection_product_card'
                                        preOrders={null}
                                        isLaunchWL={null}
                                        launchBox={null}
                                        setLaunchWLModal={null}
                                        setLaunchWLModal2={null}
                                        setLaunchWLModal3={null}
                                        generalSetting={null}
                                        collectionTemplate={true}
                                        store={props.store}
                                        itemSelected={hairSelected}
                                        setItemSelected={setHairSelected}
                                        bundleDiscount={bundleDiscount}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-[calc(25%+30px)]">
                            <YourBundleSidebar store={props.store} itemSelected={hairSelected} bundleSize={bundleSize} bundleDiscount={bundleDiscount} />
                        </div>
                    </div>
                </TabContent>
                <TabContent active={activeTab === 'tan'}>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-[calc(75%-30px)]">
                            <div className="flex flex-wrap lg:-mx-g">
                                {props.tanData.map((item, index) => 
                                    <BundleCard
                                        key={`build-your-bundle--tan--${index}`}
                                        product={item}
                                        className="relative mb-1 lg:mb-[1rem] flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-[.5rem] lg:pl-[.5rem] text-center"
                                        button={true}
                                        setWaitlistData={() => {}}
                                        addToCart={null}
                                        trackEvent={null}
                                        eventNameOnClick='collection_product_card'
                                        preOrders={null}
                                        isLaunchWL={null}
                                        launchBox={null}
                                        setLaunchWLModal={null}
                                        setLaunchWLModal2={null}
                                        setLaunchWLModal3={null}
                                        generalSetting={null}
                                        collectionTemplate={true}
                                        store={props.store}
                                        itemSelected={tanSelected}
                                        setItemSelected={setTanSelected}
                                        bundleDiscount={bundleDiscount}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-[calc(25%+30px)]">
                            <YourBundleSidebar store={props.store} itemSelected={tanSelected} bundleSize={bundleSize} bundleDiscount={bundleDiscount} />
                        </div>
                    </div>
                </TabContent>
            </div>
        </div>
    );
};

export default BuildYourBundle;