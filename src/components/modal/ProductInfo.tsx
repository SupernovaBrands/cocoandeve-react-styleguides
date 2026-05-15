import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components";
import Close from '~/images/icons/close.svg';
import { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { useIsVisible } from "~/hooks/useIsVisible";
import CarouselScrollbar from "../carousel/CarouselScrollbar";
import Play from '~/images/icons/play.svg';
import { PrevButton, NextButton } from '~/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import AccordionPDP from "../AccordionPDP";
import Modal from "~/components/Modal";
import ShippingTable from "~/components/modal/ShippingTable";
import { removeObjectWithId } from "~/modules/utils";
import { useWindowSize } from "~/hooks/useWindowSize";
import ProudToBe from "~/compounds/ProudToBe";
import ProductWaitlist from "~/compounds/product-waitlist-oos";
import QuantityBox from "~/components/cart/quantity-box";

type imageProps = {
    id: number,
    url: string,
    alternativeText?: string,
    width?: number,
    height?: number
}

const ProductInfo = (props: any) => {
    const activeImageIndex = 1;
    const {
        preOrderSetting,
        formatMoney,
        bgColor,
        textColor,
        preOrderCtaLabel,
        quickBuy,
        kitBuilder,
        getActiveWL,
        getId,
        fbqEvent,
        tiktokSubscribe,
        subscribeBluecoreWaitlist,
        submitsToSmsBumpAPi,
        bluecoreProductWaitlist,
        trackBluecoreLaunchWaitlistEvent,
        waitlistPdpStore,
        launchProductWaitlist,
        Faq,
        addToCart,
        directAddToCart,
        generalSetting,
        FragranceNotes,
        ProductSettings,
        checkHardcodedHowToUse,
        checkHardcodedFaq,
        BenefitIngredient,
        HowToUse,
        checkHardcodedTagline,
        checkHardcodedVariant,
        data,
        maxItem,
        store,
        handleClose,
        checkHardcodedImages,
        strapiAutomateHardcode,
        checkHardcodedTitles,
        tabSelected,
        setTabSelected,
        activeTab,
        buildProductCardModel,
        ctaBgColor,
        useMediaQuery,
    } = props;
    // const isDesktop = useMediaQuery('(min-width: 769px)');
    const [isDesktop, setIsDesktop] = useState(true);
    const [width, height] = useWindowSize();
    const waitlistForm = useRef(null);

    useEffect(() => {
        if (globalThis && globalThis.window.innerWidth > 992) {
            setIsDesktop(true);
        } else {
            setIsDesktop(false);
        }
    }, [width]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [productStrapi, setProductStrapi] = useState(null);
    const [productShopify, setProductShopify] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(activeImageIndex);

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: false, align: 'start' });
    const [selectedVariant, setSelectedVariant] = useState(null);

    const { isVisible, targetRef } = useIsVisible(
        {
            root: null,
            rootMargin: "200px",
            threshold: 0.1,
        },
        false,
    );

    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        align: 'start',
        dragFree: true,
        loop: true,
        axis: 'x',
    });

    const pdpImagePrev = () => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        if (!emblaMainApi.canScrollPrev()) return;
        emblaThumbsApi.scrollPrev();
        emblaMainApi.scrollPrev();
    };

    const pdpImageNext = () => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        if (!emblaMainApi.canScrollNext()) return;
        emblaThumbsApi.scrollNext();
        emblaMainApi.scrollNext();
    };

    const videoRef = useRef<HTMLVideoElement>(null);

    const [addingItem, setAddingItem] = useState(false);

    const addToCartHandle = async () => {
        if (typeof addToCart === 'function') {
            setAddingItem(true);
            await addToCart({
                id: selectedVariant.bundleId ? `gid://shopify/ProductVariant/${selectedVariant.bundleId.value}` : selectedVariant.id,
                quantity,
                handle: selectedVariant?.product?.handle,
                title: selectedVariant.title,
            });
            setAddingItem(false);
            handleClose();
        }
        return false;
    }

    const onAddItem = async () => {
        // build your bundle
        // const itemSelected = activeTab === 0 ? tabSelected : tabSelected;
        // const setItemSelected = activeTab === 0 ? setTabSelected : setTabSelected;
        if (selected.includes(selectedVariant.id)) {
            const currentSelected = tabSelected ? [...tabSelected] : [];
            const newSelected = removeObjectWithId(currentSelected, selectedVariant.id);
            setTabSelected(newSelected);
            return false;
        }

        if (tabSelected && tabSelected.length >= maxItem) return false;
        const productModel = await buildProductCardModel(store, productShopify, null, null);

        setTabSelected((prev) => {
            // if (tabSelected && tabSelected.length >= maxItem) return false;
            // const productModel = buildProductCardModel(store, productShopify, null, null);

            // setTabSelected((prev) => {
            const prevData = [...prev];
            prevData.push({
                src: productModel.src,
                srcSet: productModel.srcSet,
                title: selectedVariant.title,
                id: selectedVariant.id,
                price: productModel.priceInCent,
                comparePrice: productModel.comparePriceInCent
            });
            return prevData;
        });
        setTimeout(() => {
            handleClose();
        }, 1500);
        return false;
    };

    useEffect(() => {
        setSelectedIndex(activeImageIndex);
        onThumbClick(activeImageIndex);
    }, [activeImageIndex]);

    const getProductData = async (handle) => {
        try {
            const response = await fetch(`/api/getProductInfo?handle=${handle}&region=${store}`);
            const { product } = await response.json();
            setProductShopify(product);

            const response2 = await fetch(`/api/getProductStrapi?handle=${handle}&region=${store}`);
            const productStrapi = await response2.json();

            if (productStrapi && productStrapi.length > 0) setProductStrapi(productStrapi[0]);

        } catch (error) {
            console.error('Error fetching product info:', error);
        }
    };

    useEffect(() => {
        if (data.open && data.handle) {
            getProductData(data.handle);
        }
    }, [data.open, data.handle]);

    // console.log('product shopify', productShopify);
    // console.log('product strapi', productStrapi);
    let slides = productStrapi?.images ? productStrapi?.images.map((image: imageProps) => {
        return { id: image.id, src: image.url || '' }
    }) : [];

    // hardcode image based on region functions:
    slides = checkHardcodedImages(slides, store, productStrapi?.handle);
    const customImages = productStrapi?.Sections.find((s) => s.__component === 'product.custom-image') || null;
    slides = strapiAutomateHardcode(slides, store, productStrapi?.handle, customImages);
    const videoStack = productStrapi?.Sections.find((s) => s.__component === 'product.pdp-stack-video') || null;

    const slidesCount = slides.length + (videoStack?.video_thumbnail?.url ? 1 : 0);

    const productVideoData = videoStack?.productVideoPdp?.productVideoPdp?.[store];
    const videoUrl = productVideoData?.video_url || videoStack?.video_url;
    const videoThumbnail = productVideoData?.video_thumbnail?.url || videoStack?.video_thumbnail?.url;

    const onThumbClick = (index: number) => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        emblaMainApi.scrollTo(index);
    };

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

    const onScroll = useCallback((emblaMainApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaMainApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on('select', onSelect);
        emblaMainApi.on('reInit', onSelect);
        emblaMainApi.on('select', onScroll);
        emblaMainApi.on('reInit', onScroll);
        emblaMainApi.on('scroll', onScroll);

    }, [emblaMainApi, onSelect, onScroll]);

    const startVideoOnMouseMove = useCallback(async () => {
        try {
            await videoRef.current.play();
        } catch (e) {
            // do nothing
        }
    }, []);

    const stopVideoOnMove = useCallback(() => {
        try {
            videoRef.current.pause();
        } catch (e) {
            // do nothing
        }
    }, []);

    useEffect(() => {
        if (isVisible) {
            startVideoOnMouseMove();
        } else {
            stopVideoOnMove();
        }
    }, [isVisible, startVideoOnMouseMove, stopVideoOnMove]);

    let productTitle = productStrapi?.title;
    // hardcode image based on region functions:
    productTitle = checkHardcodedTitles(productTitle, store, productStrapi?.handle);

    let productVariantInfo = productStrapi?.Sections.find((section: any) => section.__component === 'product.product-variant');
    productVariantInfo = checkHardcodedVariant(productVariantInfo, store, productStrapi?.handle);

    let additionalTitle = [];
    if (store === 'us' && productVariantInfo && productVariantInfo.size_variant1_description_us) {
        additionalTitle = productVariantInfo.size_variant1_description_us.split('///').map((v, index) => {
            return index === 0 ? v.split(' ').pop() : null;
        })
    }
    if (store !== 'us' && productVariantInfo && productVariantInfo.size_variant1_description) {
        additionalTitle = productVariantInfo.size_variant1_description.split('///').map((v, index) => {
            return index === 0 ? v.split(' ').pop() : null;
        })
    }

    let descriptionField = productStrapi?.Sections.find((section: any) => section.__component === 'product.descriptions-fields');
    descriptionField = checkHardcodedTagline(descriptionField, store, productStrapi?.handle);
    const { proud_tobe: proudToBe, benefits, full_ingredients_list: fullIngredients, ingredients, tagline, fragrance_notes } = descriptionField || {};

    let howToUse = productStrapi?.Sections.find((section: any) => section.__component === 'product.how-to-use') || {};
    // Hardcode How to Use
    howToUse = checkHardcodedHowToUse(howToUse, store, productStrapi?.handle);
    let faq = productStrapi?.Sections.find((section: any) => section.__component === 'product-tab.faq') || {};
    if (['us'].includes(store) && productStrapi?.handle === 'tan-activating-body-oil-spf') {
        faq = JSON.parse(JSON.stringify(faq).replace(/SPF30/g, 'SPF20'));
    }
    faq = checkHardcodedFaq(faq, store, productStrapi?.handle);

    const shippingTable = ProductSettings?.find((section: any) => section.__component === 'product.product-shipping-table') || {};
    const shippingTableStore = shippingTable?.shippingTableInfo?.shippingTableInfo[store] || {};
    const shippingTableStore2 = shippingTable[`shipping_table_${store.toUpperCase()}`] || {};

    const shippingTable2 = shippingTable?.shippingTableInfo?.shippingTableInfo?.[store];

    const fragranceNotesObject = {
        id: 'fragrance-notes',
        title: 'Fragrance Notes',
        text: '',
        component: <FragranceNotes notes={fragrance_notes} />
    };

    let dataAccordion = [
        {
            id: 'benefits-ingredients',
            title: 'Benefits & Ingredients',
            text: '',
            component: <BenefitIngredient benefits={benefits} ingredients={ingredients} fullIngredients={fullIngredients} />
        },
        {
            id: 'how-to-use',
            title: 'How to Use',
            text: '',
            component: <HowToUse howToUse={howToUse} tags={productShopify?.tags || []} handle={productStrapi?.handle} />
        },
        {
            id: 'faq',
            title: 'FAQ',
            text: '',
            component: <Faq faq={faq} shippingTableStore={shippingTableStore} shippingTableStore2={shippingTableStore2} />
        },
        {
            id: 'proud-to-be',
            title: 'Proud to be',
            text: '',
            component: <div className="order-2 mt-2 lg:mt-0">{<ProudToBe proudToBe={proudToBe || 'natural-dha|sulfate-free|vegan|silicone-free|cruelty-free|toxin-free|gluten-free|ethically|paraben-free|peta|fragrance-free'} />}</div>
        }
    ];

    // if (fragrance_notes && fragrance_notes.trim() !== '') {
    //     dataAccordion.splice(1, 0, fragranceNotesObject);
    // }

    if (!benefits && !ingredients && !fullIngredients && (howToUse && !Object.keys(howToUse).length) && (faq && !Object.keys(faq).length)) {
        dataAccordion = [];
    }

    const [openIndex, setOpenIndex] = useState('');

    const toggleCard = async (id: any, callback: any = null) => {
        let openIndexId = id;
        if (id === openIndex) {
            openIndexId = 0;
        }
        await setOpenIndex(openIndexId);

        if (typeof callback === 'function') {
            callback();
        }
        if (!isDesktop && !quickBuy) {
            setTimeout(() => {
                const wrapper = document.querySelector('.modal__mini-pdp')?.closest('.fixed')
                const el = (document.querySelector(`.modal__mini-pdp #accordion-${id}`) as HTMLDivElement)
                if (el) wrapper.scrollTop = el.offsetTop;
            }, 365)
        }
    };

    // const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];

    // const [selected0, setSelected0] = useState([]);
    // const [selected1, setSelected1] = useState([]);
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        if (tabSelected && tabSelected.length > 0) {
            const ids = [];
            tabSelected.map((item) => ids.push(item.id));
            setSelected(ids);
        } else {
            setSelected([]);
        }
    }, [tabSelected]);

    useEffect(() => {
        let defaultVariant = null;
        const autoTicks = generalSetting?.auto_tick_variant?.split(',').map((v) => parseInt(v, 10)) || [];
        if (autoTicks && autoTicks.length > 0) {
            defaultVariant = productShopify?.variants?.nodes.find((obj) => (autoTicks.includes(parseInt(obj.id.replace('gid://shopify/ProductVariant/', ''))))) || null;
        }
        const variantNodes = productShopify?.variants?.nodes;

        // select only first variant
        defaultVariant = variantNodes?.length > 0 ? variantNodes[0] : null;
        setSelectedVariant(defaultVariant || null);
        // const productModel = buildProductCardModel(store, productShopify, null, null);
        // if (productShopify) setProductModel(productModel);
    }, [productShopify]);

    // console.log('tab 0 selected', selected);
    // console.log('selectedVariant', selectedVariant);

    // const disabled = selected0.includes(selectedVariant?.id) || selected0.length >= maxItem || selected1.includes(selectedVariant?.id) || selected1.length >= maxItem;
    // const disabled = selected0.length >= maxItem || selected1.length >= maxItem;
    // console.log('productShopify',productShopify);

    const swatchLabel = useRef(null);
    const spanEl = useRef(null);
    const [swatchAvailable, setSwatchAvailable] = useState(true);

    const changeSwatch = (e: any) => {
        const el = quickBuy ? 'li' : 'span'
        const spanEls = e.target.closest('.product-variant-swatch').querySelectorAll(el);
        // console.log('spanEls', spanEls);
        spanEls.forEach((span: any) => {
            span.classList.remove('border-primary');
            span.classList.add('border-white');
        });
        // console.log('e.target', e.target);
        const target = quickBuy ? e.target.closest('li') : e.target
        target.classList.remove('border-white');
        target.classList.add('border-primary');
        const targetText = target.getAttribute('data-val');
        if (swatchLabel && swatchLabel.current) swatchLabel.current.textContent = targetText;
        const available = target.getAttribute('data-avail');
        const id = target.getAttribute('data-id');
        const selectedSwatch = productShopify?.variants?.nodes?.find((node: any) => node.id === id);
        // console.log('selectedSwatch', selectedSwatch);
        if (selectedSwatch) {
            setSelectedVariant(selectedSwatch);
        }
        if (available === 'true') {
            setSwatchAvailable(true);
        } else {
            setSwatchAvailable(false);
        }
    };

    // console.log('data', data.swatch);

    const shippingEl = useRef(null);
    const [isTableFull, setIsTableFull] = useState(true);
    const [isTableOpen, setTableOpen] = useState(false);

    useEffect(() => {
        if (isTableOpen) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
    }, [isTableOpen]);

    const handleOpenTable = () => {
        setTableOpen(false);
    };

    useEffect(() => {
        // console.log('generalSetting', generalSetting);
        // console.log('shipping el', shippingEl.current?.querySelectorAll('a[data-toggle="modal"]'));
        if (productStrapi && productShopify && generalSetting && shippingEl && generalSetting.shippingLine && generalSetting.shippingLine.shippingLine && generalSetting.shippingLine.shippingLine[store]) {
            const tableLinks = shippingEl.current?.querySelectorAll('a[data-toggle="modal"]');
            // console.log('tableLinks', tableLinks);
            if (tableLinks) {
                tableLinks.forEach((el) => {
                    el.addEventListener('click', () => {
                        console.log('tableLinks open');
                        setTableOpen(true);
                        setIsTableFull(el.classList.contains('shipping--modal-1'));
                    });
                });
            }
        }
    }, [generalSetting, productShopify, productStrapi]);

    const activeWL = getActiveWL(launchProductWaitlist, productStrapi?.handle);
    const launchHandlesArr = activeWL && activeWL.launch_wl_handles ? activeWL.launch_wl_handles.split(',') : [];

    const [showLaunchWaitlist, setShowLaunchWaitlist] = useState(false);
    useEffect(() => {
        setShowLaunchWaitlist(productStrapi && launchHandlesArr.length > 0 && launchHandlesArr.includes(productStrapi.handle));
    }, []);


    const onSubmitWaitlist = ({ email, phoneCode, phoneNumber, smsBump, fallback }) => {
        if (email) {
            try {
                tiktokSubscribe(email);
                fbqEvent('track', 'Lead');
            } catch (e) { console.log(e) }

            // email:string, productId:any, variantID:any, regSource:any, phone:any, welcome:any, igHandle:any
            subscribeBluecoreWaitlist(email, productStrapi?.handle, selectedVariant?.id, `oos-item-${productStrapi.handle}`, phoneNumber, true, '');
            bluecoreProductWaitlist({ email, productId: selectedVariant ? getId(selectedVariant?.id) : '', productTitle: productStrapi.title });
        }

        if (phoneNumber && phoneCode) {
            submitsToSmsBumpAPi(phoneNumber, smsBump, phoneCode, store);
        }

        if (typeof (fallback) === 'function') {
            fallback();
        }
    }

    const [quantity, setQuantity] = useState(1);
    const onChangeQuantity = (e: any) => {
        setQuantity(e);
    }

    const pdpCtaLabel = () => {
        let defaultLabel = 'Add to Cart';
        defaultLabel = (typeof preOrderCtaLabel === 'function') ? preOrderCtaLabel(preOrderSetting, selectedVariant, defaultLabel) : defaultLabel;
        return defaultLabel;
    };

    const getBundleAppDiscounted = () => {
        return parseFloat(selectedVariant.price.amount) * 100;
    }

    let os = 'unknown';
    const [platform, setPlatform] = useState(os);
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;

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

    let imgWidth = quickBuy ? 'basis-[330px] w-[330px]' : 'basis-[240px] w-[240px]';

    return (
        <div ref={shippingEl} className={`modal-content modal-content--product-info bg-white px-0 rounded-[.5rem] lg:p-4 ${(!productShopify || !productStrapi) ? 'py-4 modal-content__loading' : 'pb-g pt-[50px] lg:pt-5'}`}>
            {productShopify && productStrapi &&
                <button type="button" onClick={handleClose} className="flex items-center justify-center w-[26px] h-[26px] close--icon z-[1] close absolute top-[1rem] lg:top-[1.5rem] right-[1rem] lg:right-[1.5rem]">
                    <Close className={`svg--current-color cursor-pointer font-size-sm w-[12px] h-[12px]`} />
                </button>
            }
            <div className="modal-content--inner flex flex-wrap justify-center lg:grid lg:grid-cols-[48.48%_47.48%] lg:gap-4">
                {(!productShopify || !productStrapi) && (
                    <span className="spinner-border spinner-border-sm text-body !w-3 !h-3 lg:!w-4 lg:!h-4 lg:col-span-2 lg:justify-self-center" role="status" />
                )}
                {productStrapi && productShopify && (
                    <>
                        <div className="w-full row flex flex-wrap items-start lg:justify-start lg:block">
                            <div className="product-image-carousel__container w-full px-0">
                                <div className="carousel aspect-ratio overflow-hidden">
                                    <Carousel.Wrapper emblaApi={emblaMainApi} className="">
                                        <Carousel.Inner emblaRef={emblaMainRef} innerClass="px-g lg:px-0 carousel--inner" className="w-full">
                                            {slides.map((slide, index) => {
                                                const srcSet = slide.src.replace('_text_', `Slide ${index + 1}`);
                                                let src = slide.src.replace('1140x1140', '614x614').replace('/public', '/592x').replace('_text_', `Slide ${index + 1}`);

                                                if (quickBuy) {
                                                    src = slide.src.replace('.jpg', '_660x688_crop_center.jpg').replace('/public', '/660x').replace('_text_', `Slide ${index + 1}`);
                                                }
                                                return (
                                                    <div className={`flex-grow-0 flex-shrink-0 ${imgWidth} pr-25 lg:pr-0 lg:basis-full lg:w-full`} key={index}>
                                                        <picture className="flex items-center justify-center">
                                                            <source srcSet={`${srcSet}`} media="(min-width: 992px)" />
                                                            <img height="367" width="367"
                                                                //@ts-ignore
                                                                fetchpriority={index === 0 ? 'high' : 'low'} className="block w-full rounded-md lg:rounded-[.5rem]" src={`${src}`} alt={`slide ${index + 1}`} />
                                                        </picture>
                                                    </div>
                                                )
                                            })}
                                            {videoUrl && (
                                                <div ref={targetRef as any} className={`flex-grow-0 flex-shrink-0 ${imgWidth} pr-25 lg:pr-0 lg:basis-full lg:w-full flex items-center`} key={slides.length}>
                                                    <video width="320" height="240" className="w-full h-auto max-w-full" muted={true} playsInline={true} loop={true} autoPlay ref={videoRef} >
                                                        <source src={videoUrl} type="video/mp4" />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                </div>
                                            )}
                                        </Carousel.Inner>
                                        {/* {bottomBadge && (<span className="bg-black absolute text-white p-1 w-full text-center left-0 right-0 bottom-0">{bottomBadge}</span>)} */}
                                    </Carousel.Wrapper>

                                    {slides.length > 1 && (
                                        <div className="px-g">
                                            <CarouselScrollbar
                                                emblaApi={emblaMainApi}
                                                scrollSnaps={emblaMainApi?.scrollSnapList()}
                                                className="py-1 after:bg-gray-500 after:rounded-[2px] lg:hidden"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="lg:w-full lg:px-0 hidden lg:block product-thumbnail-carousel__container">
                                <div className={`carousel w-full hidden lg:flex items-center mt-3`}>
                                    <Carousel.Wrapper className={`w-full flex flex-col items-start`} emblaApi={emblaThumbsApi}>
                                        <Carousel.Inner emblaRef={emblaThumbsRef} className={`flex`} innerClass={'max-w-[340px] mx-auto'}>
                                            {slides.map((slide, index) => (
                                                <div className={`w-auto h-auto flex flex-grow-0 flex-shrink-0 basis-[70px] rounded mr-2`} key={index}>
                                                    <button type="button" className={`${selectedIndex === index ? 'border border-primary' : ''} rounded`} onClick={() => onThumbClick(index)}>
                                                        {isDesktop && (
                                                            <picture>
                                                                <source srcSet={`${slide.src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${index + 1}`)}`} media="(min-width: 769px)" />
                                                                <img className="w-[70px] rounded b" src={`${slide.src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${index + 1}`)}`} width={70} height={70} />
                                                            </picture>
                                                        )}
                                                    </button>
                                                </div>
                                            ))}
                                            {videoThumbnail && (
                                                <div className={`w-auto h-auto flex flex-grow-0 flex-shrink-0 basis-[70px] mr-2 rounded relative`} key={slides.length}>
                                                    <button type="button" className={`${selectedIndex === slides.length ? 'border border-primary' : ''} rounded`} onClick={() => onThumbClick(slides.length)}>
                                                        {isDesktop && (
                                                            <>
                                                                <picture>
                                                                    <source srcSet={`${videoThumbnail || slides[0].src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${slides.length + 1}`)}`} media="(min-width: 769px)" />
                                                                    <img className="w-[70px] rounded b" src={`${videoThumbnail || slides[0].src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${slides.length + 1}`)}`} width={70} height={70} />
                                                                </picture>
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <Play className="svg fill-gray-100 h-[2em] fill-sm" />
                                                                </div>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </Carousel.Inner>
                                        <Carousel.Navigation>
                                            {slides.length > 4 && (
                                                <>
                                                    <PrevButton
                                                        onClick={pdpImagePrev}
                                                        className={`carousel__gallery-thumb w-5 h-5 rounded-none text-body left-0 top-[50%] -translate-y-[50%] right-auto ${selectedIndex === 0 ? 'hidden' : ''}`}
                                                    >
                                                        <ChevronPrev className="w-g h-g svg--current-color" />
                                                    </PrevButton>
                                                    <NextButton
                                                        onClick={pdpImageNext}
                                                        className={`carousel__gallery-thumb w-5 h-5 rounded-none text-body left-auto right-0 top-[50%] -translate-y-[50%] ${selectedIndex === slidesCount - 1 ? 'hidden' : ''}`}
                                                    >
                                                        <ChevronNext className="w-g h-g svg--current-color" />
                                                    </NextButton>
                                                </>
                                            )}
                                        </Carousel.Navigation>
                                    </Carousel.Wrapper>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-g lg:px-0">
                            <h4 className="font-bold text-lg lg:text-2xl mb-[1rem] lg:mb-1 mt-25 lg:mt-0">
                                <p className={`${additionalTitle.length > 0 ? 'pr-25 inline' : ''}`}>{productTitle}</p>
                                {/* {additionalTitle.length > 0 && !['BUNDLE'].includes(productStrapi.product_type) && /(\d+(?:\.\d+)?)(ml|g|oz|kg|lb)/.test(additionalTitle[0]) && (
                                    <p className="product__title--additional before:content-[''] !text-body !font-bold !text-lg lg:!text-2xl">{additionalTitle[0]}</p>
                                )} */}
                            </h4>
                            {tagline && <p className={`mb-[1rem] lg:mb-2 product__tagline text-sm lg:text-base`}>{tagline}</p>}
                            {data.swatch && (
                                <>
                                    <label className={`${quickBuy ? 'inline-block mb-[.5rem] font-bold lg:text-lg' : 'block mb-[.625em]'}`}>
                                        {data.swatch.style && <strong>Style: </strong>}
                                        {data.swatch.shade && <strong>{quickBuy ? 'Skin Tone' : 'Shade'}: </strong>}
                                        {data.swatch.tangleTamer && <strong>Type: </strong>}
                                        {data.swatch.scent && <strong>Scent: </strong>}
                                        {data.swatch.variant && <strong>Variant: </strong>}
                                        {!quickBuy && (
                                            <span ref={swatchLabel} data-swatch-label>{data.swatch.data.find((sData) => sData.id === selectedVariant.id)?.label || data.swatch.data[0].label}</span>
                                        )}

                                    </label>
                                    <ul className="mb-[1rem] list-unstyled product-variant-swatch flex justify-start">
                                        {data.swatch.data.length > 0 && data.swatch.data.map((item: any, i: any) => {
                                            const activeSwatch = selectedVariant.id === item.id;
                                            return (
                                                <li data-id={item.id} data-val={item.label} data-avail={item.availableForSale} onClick={changeSwatch} key={`swatch-card-${item.id}`} className={`${quickBuy ? 'flex items-center py-[7px] px-g' : ''} w-auto mr-1 product-variant-swatch__item ${item.available ? 'available' : 'oos'} ${activeSwatch && !quickBuy ? 'active' : ''} ${quickBuy ? 'border' : ''} ${activeSwatch && quickBuy ? 'border-primary' : `${quickBuy ? 'border-white bg-[#F5F5F5]' : ''}`} cursor-pointer`} data-available={item.available ? 'available' : ''}>
                                                    <span ref={spanEl} data-id={item.id} data-val={item.label} data-avail={item.availableForSale} className={`block variant-swatch mx-auto border-2 ${activeSwatch ? 'border-primary' : 'border-white'} ${item.value.replace('&-', '').replace(':-limited-edition!', '')} ${item.available ? '' : 'oos'}`}></span>
                                                    {quickBuy && <span data-value={item.label.toLowerCase()} data-is-additional={selectedVariant?.isAdditional} className={`text-nowrap ml-1 lg:ml-1 text-sm lg:text-base ${platform === 'os-mac' || platform === 'os-ios' ? 'relative top-[1px]' : ''} ${platform === 'os-android' ? 'relative top-[1.5px]' : ''}`}>{item.label.replace('Antioxidant Glow', '')}</span>}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </>
                            )}

                            {quickBuy && (
                                <div className="flex gap-g">
                                    <QuantityBox
                                        name="quantity-box"
                                        editable={true}
                                        isLastStock={selectedVariant?.quantityAvailable < 2}
                                        productStock={selectedVariant?.quantityAvailable}
                                        quantity={quantity}
                                        onChangeQuantity={onChangeQuantity}
                                        allowZero={false}
                                    />

                                    <Button type="button" onClick={directAddToCart ? () => addToCartHandle() : () => onAddItem()} disabled={!selectedVariant.availableForSale} buttonClass={`${bgColor === 'bg-dark' ? 'border-dark bg-dark hover:bg-dark' : 'border-primary bg-primary hover:bg-primary-dark'} ${textColor ? textColor : 'text-white'} w-full text-sm lg:text-base border flex ${addingItem ? 'justify-center' : 'justify-between'} px-g items-center product-form-submit__cta`}>
                                        {/* { !addingItem && (selectedVariant.availableForSale ? 'Add To Cart' : 'Out of Stock') } */}
                                        {!addingItem && (
                                            <>
                                                <span className="product-form-submit__cta-text">{pdpCtaLabel()}</span>
                                                <span className="">
                                                    {!productShopify.isProductBundleApp?.value && selectedVariant.compareAtPrice && <span className="product-form-submit__cta-compare line-through mr-25 font-normal">{formatMoney(store, parseFloat(selectedVariant.compareAtPrice.amount) * 100)}</span>}
                                                    {!productShopify.isProductBundleApp?.value && <span className="product-form-submit__cta-price">{formatMoney(store, parseFloat(selectedVariant.price.amount) * 100)}</span>}
                                                    {productShopify.isProductBundleApp?.value && <>
                                                        {selectedVariant.compareAtPrice && (<span className="product-form-submit__cta-compare line-through mr-25 font-normal">{formatMoney(store, (parseFloat(selectedVariant.compareAtPrice.amount) * 100))}</span>)}
                                                        <span className="product-form-submit__cta-price">{formatMoney(store, getBundleAppDiscounted())}</span>
                                                    </>}
                                                </span>
                                            </>
                                        )}
                                        {addingItem && <span className="spinner-border spinner-border-sm text-white ml-1 !w-[15px] !h-[15px]" role="status" />}
                                    </Button>
                                </div>
                            )}

                            {!quickBuy && selectedVariant?.availableForSale && (
                                <Button disabled={!selectedVariant?.availableForSale} onClick={directAddToCart ? () => addToCartHandle() : () => onAddItem()} buttonClass={`flex items-center justify-center h-[50px] inline-block w-auto min-w-[164px] product-card-btn border border-[transparent] lg:border-0 btn-sm md:text-base ${ctaBgColor === 'bg-dark' ? 'border-dark bg-dark hover:bg-dark' : 'btn-primary'} text-white rounded-none mb-1 lg:mb-2 sm:px-0 px-0 sm:flex-col sm:text-sm lg:justify-between lg:px-[2.8125rem] font-normal lg:min-w-[175px] ${selected.includes(selectedVariant?.id) ? 'opacity-[.6]' : ''}`}>
                                    {addingItem && <span className={`text-white spinner-border spinner-border-sm ml-1 !w-[15px] !h-[15px]`} role="status" />}
                                    {!addingItem && (
                                        <>
                                            {!selectedVariant?.availableForSale ? 'Out of Stock' : ''}
                                            {selected.includes(selectedVariant?.id) ? 'Added' : ''}
                                            {selectedVariant?.availableForSale && !selected.includes(selectedVariant?.id) ? <>
                                                {/* <span className="lg:hidden">Add</span> */}
                                                <span>{kitBuilder ? 'Add to Bundle' : 'Add to Cart'}</span>
                                            </> : ''}
                                        </>
                                    )}
                                </Button>
                            )}
                            {!kitBuilder && (
                                <div className="product__accordion mb-1 lg:mt-3 lg:mb-3 order-2 lg:order-2">
                                    {dataAccordion.length > 0 && <AccordionPDP isInPopup={true} isDesktop={isDesktop} data={dataAccordion} onClick={toggleCard} openIndex={openIndex} />}
                                </div>
                            )}

                            {kitBuilder && (
                                <div className="product__benefit my-[1rem] lg:my-2">
                                    <BenefitIngredient benefits={benefits} ingredients={ingredients} fullIngredients={fullIngredients} />
                                </div>
                            )}
                            {!showLaunchWaitlist && !selectedVariant.availableForSale && waitlistPdpStore && waitlistPdpStore.enable_auto_wl_pdp &&
                                <ProductWaitlist bgColor={ctaBgColor} forwardRef={waitlistForm} {...waitlistPdpStore} handle={productStrapi?.handle} productId={selectedVariant?.id?.replace('gid://shopify/ProductVariant/', '')} selectedVariant={selectedVariant} onSubmitWaitlist={onSubmitWaitlist} productTitle={productShopify.title} />}
                        </div>
                    </>
                )}
            </div>
            {shippingTableStore2 && generalSetting && generalSetting.shippingLine && shippingEl && (
                <Modal contentClass="rounded-none w-full max-w-[500px] mx-auto" backdropClasses="overflow-y-auto" className="modal modal-dialog-centered" isOpen={isTableOpen} handleClose={() => handleOpenTable()}>
                    {/* <ShippingTable shippingTable={shippingTable2} store={store} content={generalSetting.shippingLine} handleClose={handleOpenTable} /> */}
                    <ShippingTable shippingTableStore={shippingTableStore} isTableFull={isTableFull} shippingTable={shippingTable2} store={store} content={generalSetting.shippingLine} handleClose={handleOpenTable} />
                </Modal>
            )}
        </div>

    );
};

export default ProductInfo;