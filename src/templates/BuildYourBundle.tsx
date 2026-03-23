import { useEffect, useRef, useState } from "react";
import TabNav from '~/components/TabNav';
import TabContent from '~/components/TabContent';
import YourBundleSidebar from "~/compounds/YourBundleSidebar";


import ProductCard from "~/compounds/ProductCard";
import { checkLaunchWLBox } from "~/modules/utils";
import dynamic from "next/dynamic";
// import Modal from "~/components/Modal";
const Modal = dynamic(() => import('~/components/Modal'), { ssr: false });
const ModalWaitlist = dynamic(() => import('~/components/modal/Waitlist'), { ssr: false });
const ProductInfo = dynamic(() => import('~/components/modal/ProductInfo'), { ssr: false });
// import ProductInfo from "~/components/modal/ProductInfo";
import styles from "../styles/templates/kit-builder.module.scss"
import LaunchWaitlistModals from "~/sections/LaunchWaitlistModals";

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

const MIN_ITEM = 2;
const MAX_ITEM = 5;

const BuildYourBundle = (props: any) => {
    const { submitsToSmsBumpAPi, trackBluecoreLaunchWaitlistEvent, loggedInEmail, trackBluecoreEvent, waitlistPdpSetting, launchWL, preOrders, trackEvent, waitlistPdpStore, getActiveWL, parentProduct, updateCartAttributes, tab1Data, tab2Data, tab3Data, buildProductCardModel, FragranceNotes, ProductSettings, checkHardcodedFaq, checkHardcodedHowToUse, BenefitIngredient, HowToUse, Faq, checkHardcodedTagline, addToCart, strapiData, store, checkHardcodedImages, strapiAutomateHardcode, checkHardcodedTitles, checkHardcodedVariant } = props;

    const [bundleSize, setBundleSize] = useState(MIN_ITEM);
    const [bundleDiscount, setBundleDiscount] = useState(15);
    const [activeTab, setActiveTab] = useState(0);
    const [headerPos, setHeaderPos] = useState(0);

    const [tab1Products, setTab1Products] = useState(tab1Data || []);
    const [tab2Products, setTab2Products] = useState(tab2Data || []);
    const [tab3Products, setTab3Products] = useState(tab3Data || []);

    const [tab0Selected, setTab0Selected] = useState([]);
    const [tab1Selected, setTab1Selected] = useState([]);

    const [tabSelected, setTabSelected] = useState([]);

    const [productData, setProductData] = useState({
        open: false,
        handle: null,
        selectedVariant: null,
        tab: null,
        swatch: null
    });

    const settingDiscount = (num) => {
        if (num === 2) setBundleDiscount(10);
        else if (num === 3) setBundleDiscount(15);
        else if (num >= 4) setBundleDiscount(20);
    };

    const isDesktop = useMediaQuery('(min-width: 769px)');

    const renderItems = (items) => {
        const newSize = Math.min(Math.max(items.length + 1, MIN_ITEM), MAX_ITEM);
        setBundleSize(newSize);
        settingDiscount(items.length >= MIN_ITEM ? items.length : MIN_ITEM);
        setTimeout(() => {
            const sidebar = document.querySelector('.container--page');
            if (sidebar && isDesktop) sidebar.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    };

    useEffect(() => {
        setBundleSize(bundleSize >= MAX_ITEM ? MAX_ITEM : bundleSize);
    }, [bundleSize]);

    useEffect(() => {
        renderItems(tabSelected);
    }, [tabSelected]);

    useEffect(() => {
        const header = document?.querySelector('header');
        if (header) {
            setHeaderPos(header.getBoundingClientRect().height || 0);
        }
    }, [store]);

    useEffect(() => {
        // console.log('modal detail open', productData.open);
        if (productData.open) document.body.classList.add('!overflow-hidden');
        else document.body.classList.remove('!overflow-hidden');
    }, [productData.open])

    const LoadingEl = () => <div className="col-span-2 lg:col-span-3 mt-2 lg:mt-0 text-center">
        <span className="spinner-border spinner-border-sm text-body !w-2 !h-2 lg:!w-3 lg:!h-3" role="status" />
    </div>;
    const generalSetting = ProductSettings.find((setting: any) => setting.__component === 'product.general');

    const [platform, setPlatform] = useState('');

    const [waitlistData, setWaitlistData] = useState({
        open: false,
        title: '',
        image: '',
        handle: undefined,
        date: '',
        productId: null,
    });
    const [launchWLModal, setLaunchWLModal] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
        emailShow: true,
        phoneShow: true,
    });
    const [launchWLModal2, setLaunchWLModal2] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
        emailShow: true,
        phoneShow: true,
    });
    const [launchWLModal3, setLaunchWLModal3] = useState({
        open: false,
        variantId: null,
        handle: null,
        tags: [],
        productId: null,
        emailShow: true,
        phoneShow: true,
    });

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
        if (tab1Data.length > 0) setTab1Products(tab1Data);
    }, [tab1Data]);

    useEffect(() => {
        if (tab2Data.length > 0) setTab2Products(tab2Data);
    }, [tab2Data]);

    useEffect(() => {
        if (tab3Data.length > 0) setTab3Products(tab3Data);
    }, [tab3Data]);

    const [launchWLSuccess, setLaunchWLSuccess] = useState(false);
    const [launchSubmitted, setLaunchSubmitted] = useState(false);

    return strapiData ? (
        <div className={`${styles.container}`} style={{ '--header-height': `${headerPos}px` } as React.CSSProperties}>
            <figure className="flex flex-wrap relative">
                <picture className="w-full block">
                    <source media="(min-width: 992px)" srcSet="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/131025_Build-Your-Own-Web-Bundle_dt.gif?v=1760430925" />
                    <img alt={`Banner of ${strapiData?.title_text}`} src="https://cdn.shopify.com/s/files/1/0286/1327/9779/files/131025_Build-Your-Own-Web-Bundle_MB.gif?v=1760430926" className="block w-full" loading="eager" 
                        // @ts-ignore
                        fetchpriority="high" width={750} height={422} />
                </picture>
                <figcaption className="container absolute top-0 pt-3 lg:pt-0 lg:top-[50%] lg:-translate-y-[50%] left-0 right-0 text-center ">
                    <div className="flex items-center bg-black inline-flex badge badge--sm pt-[6px] pb-[.25rem] leading-[18px] rounded text-white text-sm font-normal px-[.75rem]">
                        <span className="relative top-[1px]">{strapiData?.tag_text}</span>
                    </div>
                    <h1 className="text-center mt-[1rem] mb-[.5rem]">{strapiData?.title_text}</h1>
                    <p dangerouslySetInnerHTML={{
                        __html: strapiData?.desc_text,
                    }} />
                </figcaption>
            </figure>
            {/* <div className={`sticky bg-secondary-light py-[.5rem] lg:py-3 flex flex-col justify-center items-center choose-your-bundle lg:!top-[106px] z-[1] lg:z-[2]`} style={{ top: `${headerPos}px` }}>
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
            </div> */}
            <div className="container--page pb-3 lg:pb-5">
                <div className="flex lg:flex-col pb-[1rem] lg:pb-0 items-center px-g lg:px-0 pt-3 lg:pt-5">
                    <p className="text-base lg:text-2xl font-bold lg:text-center mb-0 lg:mb-3 pr-[1rem] lg:pr-0">{strapiData?.choose_product_text}</p>
                    <ul className="kit-builder--nav list-style-none mx-0 flex gap-[.5rem] lg:gap-1 flex-wrap border-b-0 text-center justify-center">
                        {strapiData.collection_1_label && <li><TabNav className={`${activeTab === 0 ? 'text-body' : ''}`} title={strapiData.collection_1_label || 'Hair'} active={activeTab === 0} onNavChange={() => setActiveTab(0)} /></li>}
                        {strapiData.collection_2_label && <li><TabNav className={`${activeTab === 1 ? 'text-body' : ''}`} title={strapiData.collection_2_label || 'Tan'} active={activeTab === 1} onNavChange={() => setActiveTab(1)} /></li>}
                        {strapiData.collection_3_label && <li><TabNav className={`${activeTab === 2 ? 'text-body' : ''}`} title={strapiData.collection_3_label || 'SPF'} active={activeTab === 2} onNavChange={() => setActiveTab(2)} /></li>}
                    </ul>
                </div>
                <div className={`container px-g pb-0 lg:pt-3 lg:flex lg:gap-x-[1.875rem]`}>
                    <div className="lg:w-[71.966%]">
                        <TabContent active={activeTab === 0} className="grid grid-cols-2 lg:grid-cols-3 gap-x-[.5rem] gap-y-4 lg:gap-x-[1rem] lg:gap-y-[2.75rem]">
                            {tab1Products.sort((a, b) => b.availableForSale - a.availableForSale).filter((item) => item && item.priceInCent > 0).map((item, index) => {
                                const { isLaunchWL, launchBox } = checkLaunchWLBox(launchWL, item.handle);
                                return (
                                    <ProductCard
                                        clickShowPopup={true}
                                        kitBuilder={true}
                                        key={`build-your-bundle--hair--${index}`}
                                        index={index}
                                        product={item}
                                        className="relative flex flex-col w-full basis-full text-center"
                                        store={props.store}
                                        itemSelected={tabSelected || []}
                                        generalSetting={generalSetting}
                                        setItemSelected={setTabSelected}
                                        bundleDiscount={bundleDiscount}
                                        bundleSize={bundleSize}
                                        maxItem={MAX_ITEM}
                                        setProductData={setProductData}
                                        collectionTemplate={true}
                                        trackEvent={trackEvent}
                                        eventNameOnClick='kit_builder_product_card'
                                        preOrders={preOrders}
                                        isLaunchWL={isLaunchWL}
                                        launchBox={launchBox}
                                        setLaunchWLModal={setLaunchWLModal}
                                        setLaunchWLModal2={setLaunchWLModal2}
                                        setLaunchWLModal3={setLaunchWLModal3}
                                        setWaitlistData={setWaitlistData}
                                    />
                                )
                            })}
                            {tab1Products?.length <= 0 && <LoadingEl />}
                        </TabContent>
                        <TabContent active={activeTab === 1} className="grid grid-cols-2 lg:grid-cols-3 gap-x-[.5rem] gap-y-4 lg:gap-x-[1rem] lg:gap-y-[2.75rem]">
                            {tab2Products.sort((a, b) => b.availableForSale - a.availableForSale).filter((item) => item && item.priceInCent > 0).map((item, index) =>
                            {
                                const { isLaunchWL, launchBox } = checkLaunchWLBox(launchWL, item.handle);
                                return (
                                    <ProductCard
                                        clickShowPopup={true}
                                        kitBuilder={true}
                                        key={`build-your-bundle--tan--${index}`}
                                        index={index}
                                        product={item}
                                        className="relative flex flex-col w-full basis-full text-center"
                                        generalSetting={generalSetting}
                                        collectionTemplate={true}
                                        store={props.store}
                                        itemSelected={tabSelected || []}
                                        setItemSelected={setTabSelected}
                                        bundleDiscount={bundleDiscount}
                                        bundleSize={bundleSize}
                                        maxItem={MAX_ITEM}
                                        setProductData={setProductData}
                                        trackEvent={trackEvent}
                                        eventNameOnClick='kit_builder_product_card'
                                        preOrders={preOrders}
                                        isLaunchWL={isLaunchWL}
                                        launchBox={launchBox}
                                        setLaunchWLModal={setLaunchWLModal}
                                        setLaunchWLModal2={setLaunchWLModal2}
                                        setLaunchWLModal3={setLaunchWLModal3}
                                        setWaitlistData={setWaitlistData}
                                    />
                                )
                            }
                            )}
                            {tab2Products?.length <= 0 && <LoadingEl />}
                        </TabContent>
                        <TabContent active={activeTab === 2} className="grid grid-cols-2 lg:grid-cols-3 gap-x-[.5rem] gap-y-4 lg:gap-x-[1rem] lg:gap-y-[2.75rem]">
                            {tab3Products.sort((a, b) => b.availableForSale - a.availableForSale).filter((item) => item && item.priceInCent > 0).map((item, index) =>
                            {
                                const { isLaunchWL, launchBox } = checkLaunchWLBox(launchWL, item.handle);
                                return (
                                    <ProductCard
                                        clickShowPopup={true}
                                        kitBuilder={true}
                                        key={`build-your-bundle--tan--${index}`}
                                        index={index}
                                        product={item}
                                        className="relative flex flex-col w-full basis-full text-center"
                                        generalSetting={generalSetting}
                                        collectionTemplate={true}
                                        store={props.store}
                                        itemSelected={tabSelected || []}
                                        setItemSelected={setTabSelected}
                                        bundleDiscount={bundleDiscount}
                                        bundleSize={bundleSize}
                                        maxItem={MAX_ITEM}
                                        setProductData={setProductData}
                                        trackEvent={trackEvent}
                                        eventNameOnClick='kit_builder_product_card'
                                        preOrders={preOrders}
                                        isLaunchWL={isLaunchWL}
                                        launchBox={launchBox}
                                        setLaunchWLModal={setLaunchWLModal}
                                        setLaunchWLModal2={setLaunchWLModal2}
                                        setLaunchWLModal3={setLaunchWLModal3}
                                        setWaitlistData={setWaitlistData}
                                    />
                                )
                            }
                            )}
                            {tab3Products?.length <= 0 && <LoadingEl />}
                        </TabContent>
                    </div>

                    <div className="lg:w-[25.47%]">
                        <YourBundleSidebar
                            parentProduct={parentProduct}
                            updateCartAttributes={updateCartAttributes}
                            store={props.store}
                            setItemSelected={setTabSelected}
                            itemSelected={tabSelected}
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
            </div>
            <Modal contentClass={'flex-1 rounded-[.5rem]'} className="modal-lg lg:max-w-[1070px] modal-dialog-centered lg:items-center" isOpen={productData.open} handleClose={() => setProductData({ ...productData, ...{ open: false } })}>
                <ProductInfo
                    kitBuilder={true}
                    waitlistPdpStore={waitlistPdpStore}
                    getActiveWL={getActiveWL}
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
                    tabSelected={tabSelected}
                    setTabSelected={setTabSelected}
                    activeTab={activeTab}
                    maxItem={MAX_ITEM}
                    buildProductCardModel={buildProductCardModel}

                    handleClose={() => setProductData({ ...productData, ...{ open: false } })} />
            </Modal>
            <Modal className="modal-lg lg:max-w-[43.125rem] modal-dialog-centered" isOpen={waitlistData.open} handleClose={() => setWaitlistData({ ...waitlistData, ...{ open: false } })}>
				<ModalWaitlist waitlistPdp={waitlistPdpSetting} store={store} data={waitlistData} trackBluecoreEvent={trackBluecoreEvent} handleClose={() => setWaitlistData({ ...waitlistData, open: false })} />
			</Modal>

            {launchWL && (
                <LaunchWaitlistModals
                    launchWL={launchWL}
                    store={store}
                    setLaunchWLModal={setLaunchWLModal}
                    setLaunchWLModal2={setLaunchWLModal2}
                    setLaunchWLModal3={setLaunchWLModal3}
                    launchWLModal={launchWLModal}
                    launchWLModal2={launchWLModal2}
                    launchWLModal3={launchWLModal3}
                    loggedInEmail={loggedInEmail}
                    setLaunchWLSuccess={setLaunchWLSuccess}
                    launchSubmitted={launchSubmitted}
                    setLaunchSubmitted={setLaunchSubmitted}
                    trackBluecoreLaunchWaitlistEvent={trackBluecoreLaunchWaitlistEvent}
                    submitsToSmsBumpAPi={submitsToSmsBumpAPi}
                />
            )}
        </div>
    ) : <div className="flex items-center justify-center">
        <LoadingEl />
    </div>;
};

export default BuildYourBundle;