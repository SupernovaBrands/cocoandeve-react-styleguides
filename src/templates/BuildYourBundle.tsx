import { useEffect, useRef, useState } from "react";
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import YourBundleSidebar from "~/compounds/YourBundleSidebar";
import BundleCard from "~/compounds/BundleCard";

const MIN_ITEM = 2;
const MAX_ITEM = 5;

const BuildYourBundle = (props: any) => {
    const [bundleSize, setBundleSize] = useState(2);
    const [bundleDiscount, setBundleDiscount] = useState(15);
    const [activeTab, setActiveTab] = useState('hair');
    const [headerPos, setHeaderPos] = useState(0);
    const [region, setRegion] = useState(props.store);

    const [tanSelected, setTanSelected] = useState([]);
    const [hairSelected, setHairSelected] = useState([]);

    const { addToCart, strapiData } = props;

    const cssInline = `
        .top-header {
            top: ${headerPos}px;
        }
    `;

    useEffect(() => {
        setRegion(props.store);
    }, [region]);

    const settingDiscount = (num) => {
        if (num === 2) setBundleDiscount(10);
        else if (num === 3) setBundleDiscount(15);
        else if (num === 4) setBundleDiscount(18);
        else if (num >= 5) setBundleDiscount(20);
    };

    const renderItems = (items) => {
        if (items.length >= MIN_ITEM) {
            setBundleSize(items.length >= MAX_ITEM ? MAX_ITEM : items.length);
            settingDiscount(items.length);
        } else {
            setBundleSize(MIN_ITEM);
            settingDiscount(MIN_ITEM);
        }
    };

    useEffect(() => {
        setBundleSize(bundleSize >= MAX_ITEM ? MAX_ITEM : bundleSize);
        settingDiscount(bundleSize);
    }, [bundleSize]);

    useEffect(() => {
        // console.log('hairSelected', hairSelected);
        renderItems(hairSelected);
        // window.scrollTo({ top: 0, behavior: 'smooth'});
    }, [hairSelected]);

    useEffect(() => {
        // window.scrollTo({ top: 0, behavior: 'smooth'});
        // console.log('tanSelected', tanSelected);
        renderItems(tanSelected);
    }, [tanSelected]);


    useEffect(() => {
        if (activeTab === 'hair') renderItems(hairSelected);
        else if (activeTab === 'tan') renderItems(tanSelected);
    }, [activeTab]);

    useEffect(() => {
        if (document) setHeaderPos(document.querySelector('header')?.getBoundingClientRect().height || 0);
    }, [region]);

    // console.log('render?', props.hairData.find((it) => it.handle === 'scalp-renewal-set'));
    
    return (
        <div>
            <style>{cssInline}</style>
            <figure className="flex flex-wrap relative">
                <picture>
					<source media="(min-width: 992px)" srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5fed3d6a-8abb-49d7-e18c-d5fef586d800/public" />
					<img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/30c9ade1-7c86-47bb-0203-80df6c521d00/828x" className="block w-full" loading="lazy" />
				</picture>
                <figcaption className="container absolute top-0 left-0 right-0 text-center pt-[2rem]">
                    <span className="bg-black inline-block badge badge--sm pt-[6px] pb-[.25rem] leading-[18px] rounded text-white text-sm font-normal px-[.75rem]">
                        {strapiData?.tag_text}
                    </span>
                    <h1 className="text-center mt-[1rem] mb-[.5rem]">{strapiData?.title_text}</h1>
                    <p dangerouslySetInnerHTML={{
						__html: strapiData?.desc_text,
					}} />
                </figcaption>
            </figure>
            <div className={`sticky top-header bg-secondary-light py-g flex flex-col justify-center items-center choose-your-bundle lg:!top-[106px] z-[1]`}>
                <p className="text-xl font-bold mb-[.5rem]">{strapiData?.choose_size_text}</p>
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
                        {bundleSize === 5 && <span className="inline-block pl-[.5rem] pr-[1rem] font-bold">Save {bundleDiscount}%</span>}
                    </li>
                </ul>
            </div>
            <div className="container py-3 lg:py-5">
                <p className="text-xl lg:text-2xl font-bold text-center mb-1 lg:mb-3">{strapiData?.choose_product_text}</p>
                <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-wrap border-b-0 text-center pb-1 lg:pb-3 justify-center px-hg lg:px-0">
					<li><TabNav className={`${activeTab === 'hair' ? 'text-body' : ''}`} title='Hair' active={activeTab === 'hair'} onNavChange={() => setActiveTab('hair')} /></li>
					<li><TabNav className={`${activeTab === 'tan' ? 'text-body' : ''}`} title={`${region === 'ca' ? 'Tan' : 'Tan & SPF'}`} active={activeTab === 'tan'} onNavChange={() => setActiveTab('tan')} /></li>
				</ul>
                <TabContent active={activeTab === 'hair'}>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-[calc(75%-30px)]">
                            <div className="flex flex-wrap lg:-mx-[.5rem]">
                                {props.hairData.filter((item) => item.availableForSale && item.priceInCent > 0).map((item, index) => 
                                    <BundleCard
                                        key={`build-your-bundle--hair--${index}`}
                                        product={item}
                                        className="relative mb-1 lg:mb-[1rem] flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-[.5rem] lg:pl-[.5rem] text-center"
                                        store={props.store}
                                        itemSelected={hairSelected}
                                        generalSetting={null}
                                        setItemSelected={setHairSelected}
                                        bundleDiscount={bundleDiscount}
                                        bundleSize={bundleSize}
                                        maxItem={MAX_ITEM}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-[calc(25%+30px)]">
                            <YourBundleSidebar
                                store={props.store}
                                setItemSelected={setHairSelected}
                                itemSelected={hairSelected}
                                bundleSize={bundleSize}
                                bundleDiscount={bundleDiscount}
                                type={activeTab}
                                addToCart={addToCart}
                                strapiData={strapiData}
                                maxItem={MAX_ITEM}
                                minItem={MIN_ITEM}
                            />
                        </div>
                    </div>
                </TabContent>
                <TabContent active={activeTab === 'tan'}>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-[calc(75%-30px)]">
                            <div className="flex flex-wrap lg:-mx-[.5rem]">
                                {props.tanData.filter((item) => item.availableForSale && item.priceInCent > 0).map((item, index) => 
                                    <BundleCard
                                        key={`build-your-bundle--tan--${index}`}
                                        product={item}
                                        className="relative mb-1 lg:mb-[1rem] flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-[.5rem] lg:pl-[.5rem] text-center"
                                        generalSetting={null}
                                        collectionTemplate={true}
                                        store={props.store}
                                        itemSelected={tanSelected}
                                        setItemSelected={setTanSelected}
                                        bundleDiscount={bundleDiscount}
                                        bundleSize={bundleSize}
                                        maxItem={MAX_ITEM}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:w-[calc(25%+30px)]">
                            <YourBundleSidebar
                                store={props.store}
                                setItemSelected={setTanSelected}
                                itemSelected={tanSelected}
                                bundleSize={bundleSize}
                                bundleDiscount={bundleDiscount}
                                type={activeTab}
                                addToCart={addToCart}
                                strapiData={strapiData}
                                maxItem={MAX_ITEM}
                                minItem={MIN_ITEM}
                            />
                        </div>
                    </div>
                </TabContent>
            </div>
        </div>
    );
};

export default BuildYourBundle;