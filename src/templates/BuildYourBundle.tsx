import { useEffect, useRef, useState } from "react";
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import YourBundleSidebar from "~/compounds/YourBundleSidebar";
import BundleCard from "~/compounds/BundleCard";
import Modal from "~/components/Modal";
import ProductInfo from "~/components/modal/ProductInfo";

const MIN_ITEM = 2;
const MAX_ITEM = 5;

const BuildYourBundle = (props: any) => {
    const [bundleSize, setBundleSize] = useState(MIN_ITEM);
    const [bundleDiscount, setBundleDiscount] = useState(15);
    const [activeTab, setActiveTab] = useState(0);
    const [headerPos, setHeaderPos] = useState(0);

    const [tab0Selected, setTab0Selected] = useState([]);
    const [tab1Selected, setTab1Selected] = useState([]);

    const useMediaQuery = (query) => {
        const [matches, setMatches] = useState(false);
    
        useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        media.addListener(listener);
        return () => media.removeListener(listener);
        }, [matches, query]);
    
        return matches;
    };

    const [productData, setProductData] = useState({
        open: false,
        handle: null,
        selectedVariant: null,
        tab: null,
        swatch: null
    });

    const { buildProductCardModel, FragranceNotes, ProductSettings, checkHardcodedFaq, checkHardcodedHowToUse, BenefitIngredient, HowToUse, Faq, checkHardcodedTagline, addToCart, strapiData, store, checkHardcodedImages, strapiAutomateHardcode, checkHardcodedTitles, checkHardcodedVariant } = props;

    const cssInline = `
        .top-header {
            top: ${headerPos}px;
        }
    `;

    const settingDiscount = (num) => {
        if (num === 2) setBundleDiscount(10);
        else if (num === 3) setBundleDiscount(15);
        else if (num === 4) setBundleDiscount(18);
        else if (num >= 5) setBundleDiscount(20);
    };

    const isDesktop = useMediaQuery('(min-width: 769px)');

    const renderItems = (items) => {
        if (items.length >= MIN_ITEM) {
            setBundleSize(items.length >= MAX_ITEM ? MAX_ITEM : items.length);
            settingDiscount(items.length);
        } else {
            setBundleSize(MIN_ITEM);
            settingDiscount(MIN_ITEM);
        }
        setTimeout(() => {
            const sidebar = document.querySelector('.container--page');
            if (sidebar && isDesktop) sidebar.scrollIntoView({behavior: 'smooth'});
        }, 150);
    };

    useEffect(() => {
        setBundleSize(bundleSize >= MAX_ITEM ? MAX_ITEM : bundleSize);
        settingDiscount(bundleSize);
    }, [bundleSize]);

    useEffect(() => {
        renderItems(tab0Selected);
    }, [tab0Selected]);

    useEffect(() => {
        renderItems(tab1Selected);
    }, [tab1Selected]);


    useEffect(() => {
        if (activeTab === 0) renderItems(tab0Selected);
        else if (activeTab === 1) renderItems(tab1Selected);
    }, [activeTab]);

    useEffect(() => {
        if (document) {
            setTimeout(() => {
                setHeaderPos(document.querySelector('header')?.getBoundingClientRect().height || 0);
            }, 2000)
        }
    }, [store]);

    // console.log('render?', props.hairData.find((it) => it.handle === 'scalp-renewal-set'));

    useEffect(() => {
        if (productData.open) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
    }, [productData.open])

    const LoadingEl = () => <span className="spinner-border spinner-border-sm text-body !w-2 !h-2 lg:!w-3 lg:!h-3 my-3 lg:my-5" role="status" />;
    const generalSetting = ProductSettings.find((setting:any) => setting.__component === 'product.general');
    
    return (
        <div>
            <style>{cssInline}</style>
            <figure className="flex flex-wrap relative">
                <picture>
					<source media="(min-width: 992px)" srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5fed3d6a-8abb-49d7-e18c-d5fef586d800/public" />
					<img src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/30c9ade1-7c86-47bb-0203-80df6c521d00/828x" className="block w-full" loading="lazy" />
				</picture>
                <figcaption className="container absolute top-0 left-0 right-0 text-center pt-[2rem]">
                    <div className="flex items-center bg-black inline-flex badge badge--sm pt-[6px] pb-[.25rem] leading-[18px] rounded text-white text-sm font-normal px-[.75rem]">
                        <span className="relative top-[1px]">{strapiData?.tag_text}</span>
                    </div>
                    <h1 className="text-center mt-[1rem] mb-[.5rem]">{strapiData?.title_text}</h1>
                    <p dangerouslySetInnerHTML={{
						__html: strapiData?.desc_text,
					}} />
                </figcaption>
            </figure>
            <div className={`sticky top-header bg-secondary-light py-g flex flex-col justify-center items-center choose-your-bundle lg:!top-[106px] z-[1] lg:z-[2]`}>
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
            <div className="container--page container pt-3 pb-0 lg:py-5">
                <p className="text-xl lg:text-2xl font-bold text-center mb-1 lg:mb-3">{strapiData?.choose_product_text}</p>
                <ul className="product__carousel-nav list-style-none mx-auto lg:mx-0 flex flex-wrap border-b-0 text-center pb-1 lg:pb-3 justify-center px-hg lg:px-0">
					<li><TabNav className={`${activeTab === 0 ? 'text-body' : ''} !min-h-4 lg:!min-h-[45px] !max-h-4 lg:!max-h-[45px] lg:!text-lg !font-normal`} title={strapiData.collection_1_label || 'Hair'} active={activeTab === 0} onNavChange={() => setActiveTab(0)} /></li>
					<li><TabNav className={`${activeTab === 1 ? 'text-body' : ''} !min-h-4 lg:!min-h-[45px] !max-h-4 lg:!max-h-[45px] lg:!text-lg !font-normal`} title={strapiData.collection_2_label || 'Tan & SPF'} active={activeTab === 1} onNavChange={() => setActiveTab(1)} /></li>
				</ul>
                <TabContent active={activeTab === 0}>
                    <div className="flex flex-wrap justify-center">
                        {props.hairData?.length > 0 && (
                            <>
                                <div className="w-full lg:w-[calc(75%-30px)]">
                                    <div className="flex flex-wrap lg:-mx-[.5rem]">
                                        {props.hairData.filter((item) => item.availableForSale && item.priceInCent > 0).map((item, index) => 
                                            <BundleCard
                                                key={`build-your-bundle--hair--${index}`}
                                                product={item}
                                                className="relative mb-1 lg:mb-[1rem] flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-[.5rem] lg:pl-[.5rem] text-center"
                                                store={props.store}
                                                itemSelected={tab0Selected}
                                                generalSetting={generalSetting}
                                                setItemSelected={setTab0Selected}
                                                bundleDiscount={bundleDiscount}
                                                bundleSize={bundleSize}
                                                maxItem={MAX_ITEM}
                                                setProductData={setProductData}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="w-full lg:w-[calc(25%+30px)]">
                                    <YourBundleSidebar
                                        store={props.store}
                                        setItemSelected={setTab0Selected}
                                        itemSelected={tab0Selected}
                                        bundleSize={bundleSize}
                                        bundleDiscount={bundleDiscount}
                                        type={activeTab}
                                        addToCart={addToCart}
                                        strapiData={strapiData}
                                        maxItem={MAX_ITEM}
                                        minItem={MIN_ITEM}
                                    />
                                </div>
                            </>
                        )}
                        {props.hairData?.length <= 0 && <LoadingEl />}
                    </div>
                </TabContent>
                <TabContent active={activeTab === 1}>
                    <div className="flex flex-wrap justify-center">
                        {props.tanData?.length > 0 && (
                            <>
                                <div className="w-full lg:w-[calc(75%-30px)]">
                                    <div className="flex flex-wrap lg:-mx-[.5rem]">
                                        {props.tanData.filter((item) => item.availableForSale && item.priceInCent > 0).map((item, index) => 
                                            <BundleCard
                                                key={`build-your-bundle--tan--${index}`}
                                                product={item}
                                                className="relative mb-1 lg:mb-[1rem] flex flex-col w-1/2 md:w-1/3 pr-hg pl-hg lg:pr-[.5rem] lg:pl-[.5rem] text-center"
                                                generalSetting={generalSetting}
                                                collectionTemplate={true}
                                                store={props.store}
                                                itemSelected={tab1Selected}
                                                setItemSelected={setTab1Selected}
                                                bundleDiscount={bundleDiscount}
                                                bundleSize={bundleSize}
                                                maxItem={MAX_ITEM}
                                                setProductData={setProductData}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="w-full lg:w-[calc(25%+30px)]">
                                    <YourBundleSidebar
                                        store={props.store}
                                        setItemSelected={setTab1Selected}
                                        itemSelected={tab1Selected}
                                        bundleSize={bundleSize}
                                        bundleDiscount={bundleDiscount}
                                        type={activeTab}
                                        addToCart={addToCart}
                                        strapiData={strapiData}
                                        maxItem={MAX_ITEM}
                                        minItem={MIN_ITEM}
                                    />
                                </div>
                            </>
                        )}
                        {props.tanData?.length <=0 && <LoadingEl />}
                    </div>
                </TabContent>
            </div>
            <Modal contentClass={'flex-1 rounded-[.5rem]'} className="modal-lg lg:max-w-[1070px] modal-dialog-centered" isOpen={productData.open} handleClose={() => setProductData({...productData, ...{ open: false }})}>
                <ProductInfo
                    generalSetting={generalSetting}
                    strapiAutomateHardcode={strapiAutomateHardcode}
                    checkHardcodedImages={checkHardcodedImages}
                    checkHardcodedTitles={checkHardcodedTitles}
                    checkHardcodedVariant={checkHardcodedVariant}
                    checkHardcodedTagline={checkHardcodedTagline}
                    checkHardcodedFaq={checkHardcodedFaq}
                    checkHardcodedHowToUse={checkHardcodedHowToUse}
                    ProductSettings={ProductSettings}
                    BenefitIngredient={BenefitIngredient}
                    HowToUse={HowToUse}
                    Faq={Faq}
                    FragranceNotes={FragranceNotes}
                    store={store}
                    data={productData}
                    setTab1Selected={setTab1Selected}
                    tab1Selected={tab1Selected}
                    setTab0Selected={setTab0Selected}
                    tab0Selected={tab0Selected}
                    activeTab={activeTab}
                    maxItem={MAX_ITEM}
                    buildProductCardModel={buildProductCardModel}
                    useMediaQuery={useMediaQuery}
                    handleClose={() => setProductData({...productData, ...{ open: false }})} />
            </Modal>
        </div>
    );
};

export default BuildYourBundle;