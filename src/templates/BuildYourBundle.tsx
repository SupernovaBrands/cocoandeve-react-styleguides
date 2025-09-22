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

    const [tab1Products, setTab1Products] = useState([]);
    const [tab2Products, setTab2Products] = useState([]);

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

    const { parentProduct, updateCartAttributes, tanData, hairData, buildProductCardModel, FragranceNotes, ProductSettings, checkHardcodedFaq, checkHardcodedHowToUse, BenefitIngredient, HowToUse, Faq, checkHardcodedTagline, addToCart, strapiData, store, checkHardcodedImages, strapiAutomateHardcode, checkHardcodedTitles, checkHardcodedVariant } = props;

    const cssInline = `
        .top-header {
            top: ${headerPos}px;
        }
        .footer {
            padding-top: 10px;
        }
        @media (min-width: 992px) {
            .footer {
                padding-top: 40px;
            }
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

    useEffect(() => {
        // console.log('modal detail open', productData.open);
        if (productData.open) document.body.classList.add('!overflow-hidden');
        else document.body.classList.remove('!overflow-hidden');
    }, [productData.open])

    const LoadingEl = () => <span className="spinner-border spinner-border-sm text-body !w-2 !h-2 lg:!w-3 lg:!h-3 my-3 lg:my-5" role="status" />;
    const generalSetting = ProductSettings.find((setting:any) => setting.__component === 'product.general');

    const [platform, setPlatform] = useState('');

    useEffect(() => {
		const userAgent = navigator.userAgent || navigator.vendor;
		let os = 'unknown';

		if (/windows/i.test(userAgent)) {
			os = 'os-win';
		} else if (/macintosh|mac os x/i.test(userAgent)) {
			os = 'os-mac';
		} else if (/iphone|ipad|ipod/i.test(userAgent)) {
			os = 'os-ios';
		} else if (/android/i.test(userAgent)) {
			os = 'os-android';
		}

		setPlatform(os);
	}, []);

    useEffect(() => {
        if (hairData.length > 0) setTab1Products(hairData);
    }, [hairData]);
    useEffect(() => {
        if (tanData.length > 0) setTab2Products(tanData);
    }, [tanData]);


    // console.log('-----tab2Products-----', tanData);
    // tab2Products.map((a) => console.log('a', a.title))
    const inlineStyle = `
    
    `
    
    
    return strapiData ? (
        <div>
            <style>{cssInline}</style>
            <figure className="flex flex-wrap relative">
                <picture>
					<source media="(min-width: 992px)" srcSet="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/5fed3d6a-8abb-49d7-e18c-d5fef586d800/public" />
					<img alt={`Banner of ${strapiData?.title_text}`} src="https://imagedelivery.net/ghVX8djKS3R8-n0oGeWHEA/30c9ade1-7c86-47bb-0203-80df6c521d00/828x" className="block w-full" loading="lazy" />
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
            <div className={`sticky top-header bg-secondary-light py-[.5rem] lg:py-3 flex flex-col justify-center items-center choose-your-bundle lg:!top-[106px] z-[1] lg:z-[2]`}>
                <p className="text-base lg:text-2xl font-bold mb-[.25rem] lg:mb-[1rem]">{strapiData?.choose_size_text}</p>
                <ul className="flex flex-wrap">
                    <li onClick={() => setBundleSize(2)} className={`text-sm lg:text-lg rounded-full flex justify-center items-center bg-white mr-[.5rem] lg:mr-[1rem] ${bundleSize === 2 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`${bundleSize === 2 ? 'px-1 w-[26px] lg:w-[50px]' : 'px-2 max-w-4'} max-h-[26px] lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center py-1 cursor-pointer ${bundleSize === 2 ? 'bg-primary text-white rounded-full' : 'text-gray-600'} ${platform === 'os-mac' || platform === 'os-ios' ? 'relative' : ''}`}>2</span>
                        {bundleSize === 2 && <span className={`inline-block pl-[.5rem] pr-[1rem] lg:font-bold ${platform === 'os-mac' || platform === 'os-ios' ? 'relative top-[1px]' : ''}`}>Save {bundleDiscount}%</span>}
                    </li>
                    <li onClick={() => setBundleSize(3)} className={`text-sm lg:text-lg rounded-full flex justify-center items-center bg-white mr-[.5rem] lg:mr-[1rem] ${bundleSize === 3 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`${bundleSize === 3 ? 'px-1 w-[26px] lg:w-[50px]' : 'px-2 max-w-4'} max-h-[26px] lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center py-1 cursor-pointer ${bundleSize === 3 ? 'bg-primary text-white rounded-full' : 'text-gray-600'} ${platform === 'os-mac' || platform === 'os-ios' ? 'relative' : ''}`}>3</span>
                        {bundleSize === 3 && <span className={`inline-block pl-[.5rem] pr-[1rem] lg:font-bold ${platform === 'os-mac' || platform === 'os-ios' ? 'relative top-[1px]' : ''}`}>Save {bundleDiscount}%</span>}
                    </li>
                    <li onClick={() => setBundleSize(4)} className={`text-sm lg:text-lg rounded-full flex justify-center items-center bg-white mr-[.5rem] lg:mr-[1rem] ${bundleSize === 4 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`${bundleSize === 4 ? 'px-1 w-[26px] lg:w-[50px]' : 'px-2 max-w-4'} max-h-[26px] lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center py-1 cursor-pointer ${bundleSize === 4 ? 'bg-primary text-white rounded-full' : 'text-gray-600'} ${platform === 'os-mac' || platform === 'os-ios' ? 'relative' : ''}`}>4</span>
                        {bundleSize === 4 && <span className={`inline-block pl-[.5rem] pr-[1rem] lg:font-bold ${platform === 'os-mac' || platform === 'os-ios' ? 'relative top-[1px]' : ''}`}>Save {bundleDiscount}%</span>}
                    </li>
                    <li onClick={() => setBundleSize(5)} className={`text-sm lg:text-lg rounded-full flex justify-center items-center bg-white ${bundleSize === 5 ? 'shadow-[inset_0_0_0_1px_#D62E55]' : 'hover:shadow-[inset_0_0_0_1px_#D62E55]'}`}>
                        <span className={`${bundleSize === 5 ? 'px-1 w-[26px] lg:w-[50px]' : 'px-2 max-w-4'} max-h-[26px] lg:max-w-[3.25rem] lg:max-h-[2.8125rem] flex justify-center items-center py-1 cursor-pointer ${bundleSize === 5 ? 'bg-primary text-white rounded-full' : 'text-gray-600'} ${platform === 'os-mac' || platform === 'os-ios' ? 'relative' : ''}`}>5</span>
                        {bundleSize === 5 && <span className={`inline-block pl-[.5rem] pr-[1rem] lg:font-bold ${platform === 'os-mac' || platform === 'os-ios' ? 'relative top-[1px]' : ''}`}>Save {bundleDiscount}%</span>}
                    </li>
                </ul>
            </div>
            <div className="container--page container pt-3 px-[11px] lg:px-g pb-0 lg:py-5">
                <div className="flex lg:flex-col pb-[1rem] lg:pb-0 items-center px-[.25rem] lg:px-0 justify-between">
                    <p className="text-base lg:text-2xl font-bold lg:text-center mb-0 lg:mb-3">{strapiData?.choose_product_text}</p>
                    <ul className="product__carousel-nav list-style-none mx-0 flex flex-wrap border-b-0 text-center pb-0 lg:pb-3 justify-center px-hg lg:px-0">
                        <li><TabNav className={`${activeTab === 0 ? 'text-body' : ''} !min-h-[28px] lg:!min-h-[45px] !max-h-[28px] lg:!max-h-[45px] lg:!text-lg !font-normal`} title={strapiData.collection_1_label || 'Hair'} active={activeTab === 0} onNavChange={() => setActiveTab(0)} /></li>
                        <li><TabNav className={`${activeTab === 1 ? 'text-body' : ''} !min-h-[28px] lg:!min-h-[45px] !max-h-[28px] lg:!max-h-[45px] lg:!text-lg !font-normal`} title={strapiData.collection_2_label || 'Tan & SPF'} active={activeTab === 1} onNavChange={() => setActiveTab(1)} /></li>
                    </ul>
                </div>
                <TabContent active={activeTab === 0}>
                    <div className="flex flex-wrap justify-center">
                        {tab1Products?.length > 0 && (
                            <>
                                <div className="w-full lg:w-[calc(75%-30px)]">
                                    <div className="flex flex-wrap lg:-mx-[.25rem]">
                                        {tab1Products.filter((item) => item && item.priceInCent > 0).map((item, index) => 
                                            <BundleCard
                                                key={`build-your-bundle--hair--${index}`}
                                                product={item}
                                                className="relative mb-4 lg:mb-[44px] flex flex-col w-1/2 md:w-[278px] md:basis-[278px] px-[.25rem] text-center"
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
                                <section className="w-full lg:w-[calc(25%+30px)]">
                                    <YourBundleSidebar
                                        parentProduct={parentProduct}
                                        updateCartAttributes={updateCartAttributes}
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
                                </section>
                            </>
                        )}
                        {tab1Products?.length <= 0 && <LoadingEl />}
                    </div>
                </TabContent>
                <TabContent active={activeTab === 1}>
                    <div className="flex flex-wrap justify-center">
                        {tab2Products?.length > 0 && (
                            <>
                                <div className="w-full lg:w-[calc(75%-30px)]">
                                    <div className="flex flex-wrap lg:-mx-[.25rem]">
                                        {tab2Products.filter((item) => item && item.priceInCent > 0).map((item, index) => 
                                            <BundleCard
                                                key={`build-your-bundle--tan--${index}`}
                                                product={item}
                                                className="relative mb-4 lg:mb-[44px] flex flex-col w-1/2 md:w-[278px] md:basis-[278px] px-[.25rem] text-center"
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
                                        parentProduct={parentProduct}
                                        updateCartAttributes={updateCartAttributes}
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
                        {tab2Products?.length <=0 && <LoadingEl />}
                    </div>
                </TabContent>
            </div>
            <Modal contentClass={'flex-1 rounded-[.5rem]'} className="modal-lg lg:max-w-[1070px] modal-dialog-centered lg:items-center" isOpen={productData.open} handleClose={() => setProductData({...productData, ...{ open: false }})}>
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
    ) : <div className="flex items-center justify-center">
        <LoadingEl />
    </div>;
};

export default BuildYourBundle;