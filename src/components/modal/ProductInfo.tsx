import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../components";
import Close from '~/images/icons/close.svg';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Carousel from '~/components/carousel/EmblaCarouselMulti';
import { useIsVisible } from "~/hooks/useIsVisible";
import CarouselScrollbar from "../carousel/CarouselScrollbar";
import Play from '~/images/icons/play.svg';
import { PrevButton, NextButton } from '~/components/carousel/EmblaCarouselArrowButtons';
import ChevronNext from '~/images/icons/chevron-next.svg';
import ChevronPrev from '~/images/icons/chevron-prev.svg';
import AccordionPDP from "../AccordionPDP";

type imageProps = {
    id: number,
    url: string,
    alternativeText?: string,
    width?: number,
    height?: number
}

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

const ProductInfo = (props: any) => {
    const activeImageIndex = 1;
    const { FragranceNotes, ProductSettings, checkHardcodedHowToUse, checkHardcodedFaq, BenefitIngredient, HowToUse, Faq, checkHardcodedTagline, checkHardcodedVariant, data, store, handleClose, checkHardcodedImages, strapiAutomateHardcode, checkHardcodedTitles } = props;
    const isDesktop = useMediaQuery('(min-width: 769px)');
    const [scrollProgress, setScrollProgress] = useState(0);
    const [productStrapi, setProductStrapi] = useState(null);
    const [productShopify, setProductShopify] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(activeImageIndex);

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: false, align: 'start'});
    
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
		emblaThumbsApi.scrollPrev();
		emblaMainApi.scrollPrev();
	};

	const pdpImageNext = () => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		emblaThumbsApi.scrollNext();
		emblaMainApi.scrollNext();
	};

    const videoRef = useRef<HTMLVideoElement>(null);

    const onAddItem = () => {
        console.log('adding item from modal');
    };

    useEffect(() => {
        setSelectedIndex(activeImageIndex);
        onThumbClick(activeImageIndex);
    }, [activeImageIndex]);

    const getProductData = async (handle) => {
        try {
            const response = await fetch(`/api/getProductInfo?handle=${handle}&region=${store}`, { cache: 'force-cache' });
            const { product } = await response.json();
            setProductShopify(product);

            const response2 = await fetch(`/api/getProductStrapi?handle=${handle}&region=${store}`, { cache: 'force-cache' });
            const productStrapi = await response2.json();

            if (productStrapi && productStrapi.length > 0) setProductStrapi(productStrapi[0]);
            
        } catch (error) {
            console.error('Error fetching product info:', error);
        }
    };

    useEffect(() => {
        getProductData(data.handle);
    }, [data.handle]);

    console.log('product shopify', productShopify);
    console.log('product strapi', productStrapi);
    let slides = productStrapi?.images ? productStrapi?.images.map((image: imageProps) => {
        return { id: image.id, src: image.url || '' }
    }) : [];

    // hardcode image based on region functions:
    slides = checkHardcodedImages(slides, store, productStrapi?.handle);
    const customImages = productStrapi?.Sections.find((s) => s.__component === 'product.custom-image') || null;
    slides = strapiAutomateHardcode(slides, store, productStrapi?.handle, customImages);
    const videoStack = productStrapi?.Sections.find((s) => s.__component === 'product.pdp-stack-video') || null;

    const slidesCount = slides.length + (videoStack?.video_thumbnail?.url ? 1 : 0);

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

    let productVariantInfo = productStrapi?.Sections.find((section:any) => section.__component === 'product.product-variant');
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

    let descriptionField = productStrapi?.Sections.find((section:any) => section.__component === 'product.descriptions-fields');
    descriptionField = checkHardcodedTagline(descriptionField, store, productStrapi?.handle);
    const {proud_tobe: proudToBe, benefits, full_ingredients_list: fullIngredients, ingredients, tagline, fragrance_notes} = descriptionField || {};

    let howToUse = productStrapi?.Sections.find((section:any) => section.__component === 'product.how-to-use') || {};
    // Hardcode How to Use
    howToUse = checkHardcodedHowToUse(howToUse, store, productStrapi?.handle);
    let faq = productStrapi?.Sections.find((section:any) => section.__component === 'product-tab.faq') || {};
    if (['us'].includes(store) && productStrapi?.handle === 'tan-activating-body-oil-spf') {
		faq = JSON.parse(JSON.stringify(faq).replace(/SPF30/g, 'SPF20'));
	}
    faq = checkHardcodedFaq(faq, store, productStrapi?.handle);

    const shippingTable = ProductSettings?.find((section:any) => section.__component === 'product.product-shipping-table') || {};
    const shippingTableStore = shippingTable?.shippingTableInfo?.shippingTableInfo[store] || {};
    const shippingTableStore2 = shippingTable[`shipping_table_${store.toUpperCase()}`] || {};

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
            component: <BenefitIngredient benefits={benefits} ingredients={ingredients} fullIngredients={fullIngredients}/>
        },
        {
            id: 'how-to-use',
            title: 'How to Use',
            text: '',
            component: <HowToUse howToUse={howToUse} tags={productShopify?.tags || []} handle={productStrapi?.handle}/>
        },
        {
            id: 'faq',
            title: 'FAQ',
            text: '',
            component: <Faq faq={faq} shippingTableStore={shippingTableStore} shippingTableStore2={shippingTableStore2}/>
        }
    ];

    if (fragrance_notes && fragrance_notes.trim() !== '') {
        dataAccordion.splice(1, 0, fragranceNotesObject);
    }

    if (!benefits && !ingredients && !fullIngredients && (howToUse && !Object.keys(howToUse).length) && (faq && !Object.keys(faq).length)) {
        dataAccordion = [];
    }

    const [openIndex, setOpenIndex] = useState(0);

    const toggleCard = async (id: number, callback:any = null) => {
        let openIndexId = id;
        if (id === openIndex) {
			openIndexId = 0;
		}
        await setOpenIndex(openIndexId);
        if (typeof callback === 'function') {
            callback();
        }
	};
    
    return (
        <div className={`modal-content bg-white px-0 rounded-[.5rem] lg:p-4 ${(!productShopify || !productStrapi) ? 'py-4' : 'pb-g pt-5'}`}>
            {productShopify && productStrapi && <Close onClick={handleClose} className={`svg--current-color cursor-pointer close absolute font-size-sm w-[12px] h-[12px] top-[1rem] right-[1rem]`} />}
            <div className="flex flex-wrap justify-center">
                {(!productShopify || !productStrapi) && (
                    <span className="spinner-border spinner-border-sm text-body !w-3 !h-3 lg:!w-4 lg:!h-4" role="status" />
                )}
                {productStrapi && productShopify && (
                    <>
                        <div className="w-full lg:w-1/2 lg:pr-2 row flex flex-wrap items-start md:-mx-g lg:justify-start">
                            <div className="product-image-carousel__container w-full px-0">
                                <div className="carousel aspect-ratio overflow-hidden">
                                    <Carousel.Wrapper emblaApi={emblaMainApi} className="">
                                        <Carousel.Inner emblaRef={emblaMainRef} innerClass="px-g lg:px-0" className="w-full">
                                            {slides.map((slide, index) => (
                                                <div className="flex-grow-0 flex-shrink-0 basis-[230px] w-[230px] pr-25 lg:pr-0 lg:basis-full lg:w-full" key={index}>
                                                    <picture className="flex items-center justify-center">
                                                        <source srcSet={`${slide.src.replace('_text_', `Slide ${index + 1}`)}`} media="(min-width: 992px)" />
                                                        <img height="367" width="367" fetchPriority={index > -1 ? 'high' : 'low'} className="block w-full rounded-md lg:rounded-none" src={`${slide.src.replace('1140x1140', '614x614').replace('/public', '/592x').replace('_text_', `Slide ${index + 1}`)}`} alt={`slide ${index + 1}`} />
                                                    </picture>
                                                </div>
                                            ))}
                                            {videoStack?.video_url && (
                                                <div ref={targetRef as any} className="flex-grow-0 flex-shrink-0 basis-[230px] w-[230px] pr-25 lg:pr-0 lg:basis-full lg:w-full flex items-center" key={slides.length}>
                                                    <video width="320" height="240"  className="w-full h-auto max-w-full" muted={true} playsInline={true} loop={true} autoPlay ref={videoRef} >
                                                        <source src={videoStack?.video_url} type="video/mp4" />
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
                            <div className="lg:w-full lg:px-0 hidden lg:block">
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
                                            {videoStack?.video_thumbnail?.url && (
                                                <div className={`w-auto h-auto flex flex-grow-0 flex-shrink-0 basis-[70px] mr-2 rounded relative`} key={slides.length}>
                                                    <button type="button" className={`${selectedIndex === slides.length ? 'border border-primary' : ''} rounded`} onClick={() => onThumbClick(slides.length)}>
                                                        {isDesktop && (
                                                            <>
                                                                <picture>
                                                                    <source srcSet={`${videoStack?.video_thumbnail?.url || slides[0].src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${slides.length + 1}`)}`} media="(min-width: 769px)" />
                                                                    <img className="w-[70px] rounded b" src={`${videoStack?.video_thumbnail?.url || slides[0].src.replace('1140x1140', '150x150').replace('/public', '/150x').replace('_text_', `${slides.length + 1}`)}`} width={70} height={70} />
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
                                                        className="carousel__gallery-thumb w-5 h-5 rounded-full shadow-lg text-body bg-white left-0 top-[50%] -translate-y-[50%] right-auto"
                                                    >
                                                        <ChevronPrev className="w-g h-g svg--current-color" />
                                                    </PrevButton>
                                                    <NextButton
                                                        onClick={pdpImageNext}
                                                        className="carousel__gallery-thumb w-5 h-5 rounded-full shadow-lg text-body bg-white left-auto right-0 top-[50%] -translate-y-[50%]"
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
                        <div className="w-full px-g lg:pr-0 lg:w-1/2 lg:pl-2">
                            <h4 className="font-bold text-lg lg:text-2xl mb-[1rem] lg:mb-1 mt-25 lg:mt-0">
                                <p className={`${additionalTitle.length > 0 ? 'pr-25 inline' : ''}`}>{productTitle}</p>
                                {additionalTitle.length > 0 && !['BUNDLE'].includes(productStrapi.product_type) && /(\d+(?:\.\d+)?)(ml|g|oz|kg|lb)/.test(additionalTitle[0]) && (
                                    <p className="product__title--additional before:content-[''] !text-body !font-bold !text-lg lg:!text-2xl">{additionalTitle[0]}</p>
                                )}
                            </h4>
                            { tagline && <p className={`mb-[1rem] product__tagline text-sm lg:text-base`}>{tagline}</p> }
                            <Button onClick={onAddItem} buttonClass={`h-[50px] lg:min-w-[300px] block lg:inline-block w-full lg:w-auto product-card-btn border border-[transparent] lg:border-0 btn-sm md:text-base btn-primary rounded-full mb-[.75rem] sm:px-0 px-0 sm:flex-col sm:text-sm lg:justify-between lg:px-[2.8125rem] font-normal`}>
                                Add to Cart
                            </Button>
                            <div className="product__accordion mb-1 lg:mt-3 lg:mb-3 order-2 lg:order-2">
                                { dataAccordion.length > 0 && <AccordionPDP data={dataAccordion} onClick={toggleCard} openIndex={openIndex} /> }
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductInfo;